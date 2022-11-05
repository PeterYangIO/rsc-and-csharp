"use client";

import { useState } from "react";

export default function ClickMe() {
    const [count, setCount] = useState(0);

    return (
        <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
            Click me: {count}
        </button>
    );
}
