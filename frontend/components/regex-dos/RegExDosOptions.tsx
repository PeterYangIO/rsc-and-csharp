"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function RegExDosOptions() {
    const router = useRouter();
    const [value, setValue] = useState("");

    useEffect(() => {
        router.push(`/regex-dos/${value}`);
    }, [value]);

    return (
        <div className="form-group">
            <div className="form-group-header">
                <label htmlFor="regex-value">Example Select</label>
            </div>
            <div className="form-group-body">
                <select className="form-select" id="regex-value" value={value} onChange={e => setValue(e.target.value)}>
                    <option disabled value=""></option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.display}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
