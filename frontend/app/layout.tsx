import { CodeReviewIcon } from "@primer/octicons-react";
import Link from "next/link";
import ProfileAuthentication from "../components/home/ProfileAuthentication";
import Nav from "./Nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-US">
            <title>BirdyCode</title>
            <head>
                <link href="https://unpkg.com/@primer/css@20.5.1/dist/primer.css" rel="stylesheet" />
            </head>
            <body className="color-bg-inset">
                <header className="Header">
                    <div className="Header-item Header-item--full">
                        <Link href="/" className="Header-link f4 d-flex flex-items-center">
                            <CodeReviewIcon className="mr-2" size={24} />
                            <span>BirdyCode</span>
                        </Link>
                    </div>
                    <div className="Header-item">
                        <a
                            href="https://1drv.ms/p/s!Ag8VcoNV4D7YgUGUjAUOAEkvCjI6?e=vdXmp5"
                            target="_blank"
                            className="Header-link">
                            Slide deck
                        </a>
                    </div>
                    <div className="Header-item">
                        <a
                            href="https://github.com/peteryangio/rsc-and-csharp"
                            target="_blank"
                            className="Header-link">
                            Repository
                        </a>
                    </div>
                    <ProfileAuthentication />
                </header>
                <div className="Layout container-lg mt-5">
                    <div className="Layout-sidebar">
                        <Nav />
                    </div>
                    <main className="Layout-main">{children}</main>
                </div>
            </body>
        </html>
    );
}
