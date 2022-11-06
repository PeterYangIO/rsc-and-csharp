import { cache } from "react";
import { Post } from "../../api-client/_api";
import CodeBlock from "./CodeBlock";
import PostActions from "./PostActions";

type User = {
    login: string;
    avatar_url: string;
    name: string;
};

const getUser = cache(async (username: string): Promise<User> => {
    const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `token ${process.env.PUBLIC_TOKEN}`
        }
    });

    return await response.json();
});

export default async function PostComponent(props: Post) {
    const { username, description, code, language } = props;
    const { login, avatar_url, name } = await getUser(username);

    return (
        <div className="Box color-shadow-medium p-3 mb-5">
            <div className="d-flex">
                <div className="mr-2">
                    <img className="circle" src={`${avatar_url}?size=48`} height="48" width="48" />
                </div>
                <div className="d-flex flex-column width-full">
                    <div>
                        <span className="text-semibold">{name}</span>{" "}
                        <span className="color-fg-muted">@{login ?? username}</span>
                    </div>
                    <div>{description}</div>
                    <CodeBlock code={code} language={language} />
                </div>
            </div>
            <PostActions
                reactions={{
                    "👍": randomCount(10, 0.7),
                    "👎": randomCount(10, 0.7),
                    "😄": randomCount(10, 0.7),
                    "😕": randomCount(10, 0.7),
                    "❤️": randomCount(10, 0.7),
                    "🎉": randomCount(10, 0.7),
                    "🚀": randomCount(10, 0.7),
                    "👀": randomCount(10, 0.7)
                }}
                comments={randomCount(100)}
                shares={randomCount(10, 0.5)}
            />
        </div>
    );
}

function randomCount(max: number, chanceOfZero: number = 0) {
    if (Math.random() < chanceOfZero) {
        return 0;
    }
    return Math.round(Math.random() * max);
}
