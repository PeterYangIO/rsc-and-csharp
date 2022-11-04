import Post from "../components/home/Post";

export default function Page() {
    return (
        <div>
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
