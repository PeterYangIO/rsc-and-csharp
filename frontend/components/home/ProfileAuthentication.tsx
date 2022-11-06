import { cookies } from "next/headers";
import Link from "next/link";
import { getAuthenticatedUser } from "../../util";
import SignOut from "./SignOut";

export default function ProfileAuthentication() {
    const user = getAuthenticatedUser();
    if (!user) {
        return (
            <Link href="/sign-in" className="Header-link">
                Sign in
            </Link>
        );
    }

    return (
        <>
            <SignOut />
            <div className="Header-item mr-0">
                <img
                    className="avatar"
                    height="20"
                    width="20"
                    alt={`@${user.name}`}
                    src={`https://github.com/${user.name}.png?size=20`}
                />
            </div>
        </>
    );
}
