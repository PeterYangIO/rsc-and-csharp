import httpProxy from "http-proxy";
import Cookies from "cookies";
import url from "url";
import { NextApiRequest, NextApiResponse } from "next";

const proxy = httpProxy.createProxyServer();
export const config = {
    api: {
        bodyParser: false
    }
};

/**
 * Adapted from: https://maxschmitt.me/posts/next-js-http-only-cookie-auth-tokens
 *
 * Proxy requests from the client through Next.js so that requests do not need to be
 * sent to a different domain / sub-domain. This helps avoid CORS issues.
 *
 * Additionally, the proxy will intercept the login / logout request so that the token
 * is never exposed to the client, and instead is stored as an http-only cookie.
 *
 * For requests from Next server -> C# backend see: `api-client/APIClient.ts`
 */
export default (request: NextApiRequest, response: NextApiResponse) => {
    return new Promise<void>((resolve, reject) => {
        const cookies = new Cookies(request, response);
        const authToken = cookies.get("auth-token");
        const pathname = url.parse(request.url ?? "").pathname;

        // {frontend}/api/${route} -> {backend}/${route}
        request.url = request.url?.replace(/^\/api/, "");
        request.headers.cookie = "";
        if (authToken) {
            // This works for client side requests. For server side requests
            // see `customFetch` in `api-client/APIClient.ts`
            request.headers["Authorization"] = `Bearer ${authToken}`;
        }

        const isLogin = pathname === "/api/login";
        // Intercept requests to /api/login so we can take the auth token
        // in the body and save it as an http-only cookie.
        if (isLogin) {
            proxy.once("proxyRes", (proxyRes, req, res) => {
                let apiResponseBody = "";
                proxyRes.on("data", chunk => {
                    apiResponseBody += chunk;
                });
                proxyRes.on("end", () => {
                    try {
                        const { token } = JSON.parse(apiResponseBody);
                        const cookies = new Cookies(req, res);
                        cookies.set("auth-token", token, {
                            httpOnly: true,
                            // Uncomment this if SSL is set up
                            // secure: process.env.NODE_ENV === "production",
                            sameSite: "lax"
                        });
                        response.status(200).json({ loggedIn: true });
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        } else if (pathname === "/api/logout") {
            cookies.set("auth-token", "", {
                httpOnly: true,
                // Uncomment this if SSL is set up
                // secure: process.env.NODE_ENV === "production",
                sameSite: "lax"
            });
            response.status(200).json({ loggedIn: false });
            resolve();
        }

        proxy.once("error", reject);
        proxy.web(request, response, {
            target: process.env.BACKEND_URL,
            autoRewrite: false,
            selfHandleResponse: isLogin
        });
    });
};
