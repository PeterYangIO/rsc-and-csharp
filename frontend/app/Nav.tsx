"use client";

import { BellIcon, HomeIcon, MailIcon, PersonIcon } from "@primer/octicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        text: "Home",
        icon: <HomeIcon />,
        href: "/"
    },
    {
        text: "Notifications",
        icon: <BellIcon />,
        href: "/notifications"
    },
    {
        text: "Messages",
        icon: <MailIcon />,
        href: "/messages"
    },
    {
        text: "Profile",
        icon: <PersonIcon />,
        href: "/profile"
    }
];

export default function Nav() {
    const pathname = usePathname();

    return (
        <nav className="Layout-sidebar SideNav border">
            {links.map((link, index) => (
                <Link
                    className="SideNav-item menu-item"
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                >
                    {link.icon}
                    {link.text}
                </Link>
            ))}
        </nav>
    );
}
