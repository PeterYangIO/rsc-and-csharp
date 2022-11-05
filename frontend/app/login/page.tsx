"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import APIClient from "../../api-client/APIClient";

export default function Login() {
    const [username, setUsername] = useState("");
    const router = useRouter();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const response = await APIClient.getInstance().login.loginCreate({
            username,
            password: username
        });

        if (response.ok) {
            router.push("/");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form className="color-bg-default border p-3 mt-2" onSubmit={onSubmit}>
                <div className="form-group">
                    <div className="form-group-header">
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-group-body">
                        <input
                            className="form-control"
                            value={username}
                            id="username"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-group-header">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-group-body">
                            <input className="form-control" type="password" value={username} id="password" disabled />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
