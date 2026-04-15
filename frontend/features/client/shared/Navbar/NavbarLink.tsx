'use client'
import { HTMLAttributeAnchorTarget } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";

type Props = {
    to: string;
    text: string;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
}
export const NavbarLink = ({ to, text, target, className }: Props) => {
    const location = usePathname()
    return (
        <Link
            href={to}
            target={target}
            className={`text-white hover:underline ${location.includes(to) ? 'font-bold underline' : ''} ${className}`.trim()}
        >
            {text}
        </Link>
    )
}