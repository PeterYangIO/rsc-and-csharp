import NewPost from "../components/home/NewPost";
import Post from "../components/home/Post";

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
            <Post
                username="peteryangio"
                text="This is the content"
                code={{
                    content: 'function helloWorld() {\n\tconsole.log("Hello world")\n}\nhelloWorld();',
                    language: "javascript"
                }}
            />
            <Post
                username="peteryangio"
                text="This is the content"
                code={{
                    content: '<script>alert("Hello world")</script>',
                    language: "html"
                }}
            />
            <Post
                username="peteryangio"
                text="This is the content"
                code={{
                    content: 'print("Hello world")',
                    language: "python"
                }}
            />
        </div>
    );
}
