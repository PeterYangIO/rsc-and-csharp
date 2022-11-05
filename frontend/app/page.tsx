import NewPost from "../components/home/NewPost";
import Posts from "../components/home/Posts";

export default function Page() {
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
                <NewPost />
            </div>
            <Posts />
        </div>
    );
}
