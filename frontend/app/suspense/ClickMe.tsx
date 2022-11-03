"use client";

import { useState } from "react";

export default function ClickMe() {
    const [count, setCount] = useState(0);

    return (
        <button className="btn" onClick={() => setCount(count + 1)}>
            Click me: {count}
        </button>
    );
}
