"use client";

export default function SignOut() {
    const onSignOut = async () => {
        await fetch("/api/logout", { method: "POST" });
        window.location.reload();
    };

    return (
        <div className="Header-item">
            <button className="btn-link Header-link" onClick={onSignOut}>
                Sign out
            </button>
        </div>
    );
}
