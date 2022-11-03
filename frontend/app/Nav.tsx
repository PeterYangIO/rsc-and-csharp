"use client";

import { BellIcon, HomeIcon, HourglassIcon, MailIcon, PersonIcon, ShieldXIcon } from "@primer/octicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        text: "Home",
        icon: <HomeIcon />,
        href: "/"
    },
    {
        text: "Suspense",
        icon: <HourglassIcon />,
        href: "/suspense"
    },
    {
        text: "RegEx DoS",
        icon: <ShieldXIcon />,
        href: "/regex-dos"
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

function isActiveLink(pathname: string, href: string) {
    if (href === "/" && pathname === "/") {
        return true;
    }

    return href !== "/" && pathname.startsWith(href);
}

export default function Nav() {
    const pathname = usePathname();

    return (
        <nav className="SideNav border">
            {links.map(link => (
                <Link
                    key={link.href}
                    className="SideNav-item color-bg-default"
                    href={link.href}
                    aria-current={isActiveLink(pathname, link.href) ? "page" : undefined}
                >
                    <span className="mr-2">{link.icon}</span>
                    {link.text}
                </Link>
            ))}
        </nav>
    );
}
