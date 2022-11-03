type PostProps = {
    username: string;
    text: string;
    code: string;
};

export default async function Post(props: PostProps) {
    const { username, text, code } = props;

    return (
        <div className="Box color-shadow-medium p-3">
            <div>
                <div>picture</div>
                <div>content</div>
            </div>
        </div>
    );
}
