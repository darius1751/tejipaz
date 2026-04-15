import React from "react"
import { Navbar } from "@/features/client/shared/Navbar/Navbar"

type Props = {
    children: React.ReactNode,
}
export default function ClientLayout({ children, }: Props) {
    return (
        <div className="flex flex-col">
            <Navbar />

            <div className="w-4/5 mx-auto mt-4 h-[calc(100vh-6.5rem)]">
                {children}
            </div>
        </div>

    )
}