'use client'
import { useRef, useState } from "react"
import { SidebarLinks } from "./SidebarLinks";
import { useClickOutsideClose } from "@/features/shared/hooks/useClickOutsideClose";
import { IoMenuOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";

export const ToggleSidebarLinks = () => {
    const [open, setOpen] = useState(false);
    const toggleSidebarLinks = () => {
        setOpen(!open);
    }
    const $current = useRef<HTMLDivElement>(null);
    useClickOutsideClose({ $current, open, setOpen });
    return (
        <div ref={$current}>
            <IoMdMenu className="cursor-pointer text-white h-full text-2xl" onClick={toggleSidebarLinks} />
            <SidebarLinks open={open} />
        </div>
    )
}