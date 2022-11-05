import { Api } from "../../Api";
import Post from "./Post";

export default async function Posts() {
    const api = new Api({
        baseUrl: "http://localhost:5019"
    });
    const posts = await api.posts.postsList();

    return (
        <>
            {posts.data.map(post => {
                return (
                    <Post
                        username={post.username!}
                        description={post.description!}
                        code={{
                            content: post.code!,
                            language: post.language!
                        }}
                    />
                );
            })}
        </>
    );
}
