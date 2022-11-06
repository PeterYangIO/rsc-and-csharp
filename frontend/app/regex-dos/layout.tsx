import RegExDosOptions from "../../components/regex-dos/RegExDosOptions";

export default function RegExDos({ children }: { children: React.ReactNode }) {
    return (
        <>
            <h1>RegEx DoS</h1>
            <RegExDosOptions />
            <div className="mt-3">{children}</div>
        </>
    );
}
