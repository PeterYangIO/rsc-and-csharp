import { cookies } from "next/headers";

export function formatNumber(number: number) {
    if (number < 1000) {
        return `${number.toFixed(2)} milliseconds`;
    } else {
        return `${(number / 1000).toFixed(2)} seconds`;
    }
}

export function getAuthenticatedUser() {
    const nextCookies = cookies();
    const token = nextCookies.get("auth-token")?.value;
    if (!token) {
        return null;
    }

    const user: {
        name: string;
    } = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

    return user;
}
