'use client'
import { useRef, useState } from "react"
import { FaUser } from "react-icons/fa6"
import { SidebarUser } from "./SidebarUser";
import { useClickOutsideClose } from "@/features/shared/hooks/useClickOutsideClose";

export const ToogleSidebarUser = () => {
    const [open, setOpen] = useState(false);
    const toogleSidebarUser = () => {
        setOpen(!open);
    }
    const $current = useRef<HTMLDivElement>(null);
    useClickOutsideClose({ $current, open, setOpen });
    return (
        <div ref={$current}>
            <FaUser className="cursor-pointer text-white" onClick={toogleSidebarUser} />
            <SidebarUser open={open} />
        </div>
    )
}