import { Api } from "./_api";

export default class APIClient {
    private static instance: Api<null>;

    public static getInstance(): Api<null> {
        if (!APIClient.instance) {
            APIClient.instance = new Api({
                baseUrl: "http://localhost:3000/api"
            });
        }
        return APIClient.instance;
    }
}
