import { cookies } from "next/headers";
import Link from "next/link";

export default function HeaderAvatar() {
    const nextCookies = cookies();
    if (!nextCookies.get("jwt")) {
        return (
            <Link href="/login" className="Header-link">
                Log in
            </Link>
        );
    }

    // TODO Parse JWT from http cookie for user info
    return <img className="avatar" height="20" alt="@peteryangio" src="https://github.com/peteryangio.png" />;
}
