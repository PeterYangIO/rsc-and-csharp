const options = [
    {
        display: "Regular email",
        value: "email@example.com"
    },
    {
        display: "Long email",
        value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example.com"
    },
    {
        display: "No domain",
        value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
        display: "Crash me",
        value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
];

export default function RegExDos({ children }: { children: React.ReactNode }) {
    return (
        <>
            <h1>RegEx DoS</h1>
            <details className="dropdown details-reset details-overlay d-inline-block">
                <summary className="btn" aria-haspopup="true">
                    Pick your poison
                    <div className="dropdown-caret" />
                </summary>

                <ul className="dropdown-menu dropdown-menu-se">
                    {options.map(option => (
                        <li key={option.value}>
                            <a href={`/regex-dos/${option.value}`} className="dropdown-item">
                                {option.display}
                            </a>
                        </li>
                    ))}
                </ul>
            </details>
            <div className="mt-3">{children}</div>
        </>
    );
}
