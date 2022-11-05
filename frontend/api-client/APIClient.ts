import { Api, ApiConfig } from "./_api";
import type { ReadonlyRequestCookies } from "next/dist/server/app-render";

function isServer() {
    return typeof window === "undefined";
}

export default class APIClient {
    private static cookies: () => ReadonlyRequestCookies;
    private static getServerCookie(name: string) {
        if (!isServer()) {
            return "";
        }

        if (!APIClient.cookies) {
            // Conditionally load when accessing for first time in a server context
            // Cannot import at top of file because it will break client-side
            APIClient.cookies = require("next/headers").cookies();
        }
        const nextCookies = APIClient.cookies();
        return nextCookies.get(name)?.value;
    }

    public static get instance() {
        const apiConfig: ApiConfig<null> = {
            baseUrl: "http://localhost:3000/api"
        };

        if (isServer()) {
            const authToken = APIClient.getServerCookie("authToken");
            apiConfig.customFetch = (input, init) => {
                const modifiedInit = { ...init };
                modifiedInit.headers = {
                    ...init?.headers,
                    Authorization: `Bearer ${authToken}`
                };
                return fetch(input, modifiedInit);
            };
        }

        return new Api(apiConfig);
    }
}
