import APIClient from "../../api-client/APIClient";
import Post from "./Post";

export default async function Posts() {
    // const posts = await APIClient.getInstance().posts.postsList();

    return (<div>hi</div>);
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
