function denialOfService(slug: string) {
    const start = performance.now();
    const re = new RegExp(
        /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/
    );

    re.test(slug);
    const end = performance.now();

    return end - start;
}

function formatNumber(number: number) {
    if (number < 1000) {
        return `${number.toFixed(2)} milliseconds`;
    } else {
        return `${(number / 1000).toFixed(2)} seconds`;
    }
}

export default function RegExDosExecute({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const executionTime = denialOfService(slug);

    return (
        <div className="mt-3">
            <p>
                Running RegEx check on <code>{slug}</code>
            </p>
            <p>Execution time: {formatNumber(executionTime)}</p>
        </div>
    );
}
