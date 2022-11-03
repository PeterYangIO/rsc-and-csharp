export default async function TimelineText({ promise }: { promise: Promise<number> }) {
    const number = await promise;

    return (
        <div>Item {number}</div>
    );
}
