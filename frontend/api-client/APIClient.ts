import { Api, ApiConfig } from "./_api";

export default class APIClient {
    public static getInstance(token?: string) {
        let customFetch: typeof fetch | null = null;
        if (token) {
            customFetch = (input, init) => {
                const i = { ...init };
                i.headers = {
                    ...init?.headers,
                    Authorization: `Bearer ${token}`
                };
                return fetch(input, i);
            };
        }

        const apiConfig: ApiConfig<null> = {
            baseUrl: "http://localhost:3000/api"
        };
        if (customFetch) {
            apiConfig.customFetch = customFetch;
        }
        return new Api(apiConfig);
    }
}
