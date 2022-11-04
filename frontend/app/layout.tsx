import { CodeReviewIcon } from "@primer/octicons-react";
import HeaderAvatar from "../components/home/HeaderAvatar";
import Nav from "./Nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <link href="https://unpkg.com/@primer/css@20.5.1/dist/primer.css" rel="stylesheet" />
            </head>
            <body className="color-bg-inset">
                <header className="Header">
                    <div className="Header-item Header-item--full">
                        <a href="#" className="Header-link f4 d-flex flex-items-center">
                            <CodeReviewIcon className="mr-2" size={24} />
                            <span>BirdyCode</span>
                        </a>
                    </div>
                    <div className="Header-item">
                        <a href="#" className="Header-link">
                            Slide deck
                        </a>
                    </div>
                    <div className="Header-item">
                        <a href="https://github.com/peteryangio/rsc-and-csharp" className="Header-link">
                            Repository
                        </a>
                    </div>
                    <div className="Header-item mr-0">
                        <HeaderAvatar />
                    </div>
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
