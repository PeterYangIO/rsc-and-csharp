import { cookies } from "next/headers";

export default function HeaderAvatar() {
    const nextCookies = cookies();
    // TODO Parse JWT from http cookie for user info

    return <img className="avatar" height="20" alt="@peteryangio" src="https://github.com/peteryangio.png" />;
}
