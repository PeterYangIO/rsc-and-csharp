import { cookies } from "next/headers";
import Link from "next/link";

export default function HeaderAvatar() {
    const nextCookies = cookies();
    const token = nextCookies.get("auth-token")?.value;
    if (!token) {
        return (
            <Link href="/login" className="Header-link">
                Log in
            </Link>
        );
    }

    const user: {
        name: string;
    } = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

    return (
        <img className="avatar" height="20" alt={`@${user.name}`} src={`https://github.com/${user.name}.png?size=20`} />
    );
}
