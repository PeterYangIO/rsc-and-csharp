import Nav from "./Nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <link href="https://unpkg.com/@primer/css@20.5.1/dist/primer.css" rel="stylesheet" />
            </head>
            <body className="color-bg-inset">
                <header className="Header">
                    <div className="Header-item">
                        <a href="#" className="Header-link f4 d-flex flex-items-center">
                            <span>Title</span>
                        </a>
                    </div>
                    <div className="Header-item">
                        <input type="search" className="form-control Header-Input" />
                    </div>
                    <div className="Header-item Header-item--full">Menu</div>
                    <div className="Header-item mr-0">
                        <img
                            className="avatar"
                            height="20"
                            alt="@octocat"
                            src="https://github.com/peteryangio.png"
                            width="20"
                        />
                    </div>
                </header>
                <div className="Layout container-xl mt-5">
                    <div className="Layout-sidebar">
                        <Nav />
                    </div>
                    <main className="Layout-main">{children}</main>
                </div>
            </body>
        </html>
    );
}
