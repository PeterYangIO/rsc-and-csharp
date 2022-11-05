import { cookies } from "next/headers";
import APIClient from "../../api-client/APIClient";
import Post from "./Post";

export default async function Posts() {
    const nextCookies = cookies();
    const posts = await APIClient.getInstance(nextCookies.get("auth-token")?.value).posts.postsList();

    if (posts.data.length === 0) {
        return <div>No posts</div>;
    }
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
