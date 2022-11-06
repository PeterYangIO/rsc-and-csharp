import Link from "next/link";
import APIClient from "../../api-client/APIClient";
import { HttpResponse, Post } from "../../api-client/_api";
import PostComponent from "./Post";

export default async function Posts() {
    let posts: HttpResponse<Post[], any>;
    try {
        posts = await APIClient.instance.posts.postsList();
    } catch {
        return (
            <div>
                <Link href="/sign-in">Sign in</Link> to see posts
            </div>
        );
    }

    if (posts.data.length === 0) {
        return <div>No posts</div>;
    }
    return (
        <>
            {posts.data.map(post => {
                return (
                    <PostComponent
                        key={post.id}
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
