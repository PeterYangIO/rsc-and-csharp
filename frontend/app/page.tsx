import NewPost from "../components/home/NewPost";
import Posts from "../components/home/Posts";
import { getAuthenticatedUser } from "../util";

export default function Page() {
    const user = getAuthenticatedUser();

    return (
        <div>
            <div className="d-flex justify-between flex-items-center mb-3">
                <h1
                    style={{
                        marginRight: "auto"
                    }}
                >
                    Home
                </h1>
                {user && <NewPost />}
            </div>
            <Posts />
        </div>
    );
}
