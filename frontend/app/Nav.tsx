"use client";

import { BellIcon, HomeIcon, MailIcon, PersonIcon, ShieldXIcon } from "@primer/octicons-react";
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
    },
    {
        text: "RegEx DoS",
        icon: <ShieldXIcon />,
        href: "/regex-dos"
    }
];

function isActiveLink(pathname: string, href: string) {
    if (href === "/" && pathname === "/") {
        return true;
    }

    return href !== "/" && pathname.startsWith(href);
}

export default function Nav() {
    const pathname = usePathname();

    return (
        <nav className="Layout-sidebar SideNav border">
            {links.map(link => (
                <Link
                    key={link.href}
                    className="SideNav-item menu-item"
                    href={link.href}
                    aria-current={isActiveLink(pathname, link.href) ? "page" : undefined}
                >
                    {link.icon}
                    {link.text}
                </Link>
            ))}
        </nav>
    );
}
