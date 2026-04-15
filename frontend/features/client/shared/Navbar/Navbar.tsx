import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { NavbarLink } from "./NavbarLink"
import { ToggleTheme } from "@/features/shared/components/toggle-theme/ToggleTheme"
import { ToggleLanguage } from "@/features/shared/components/toggle-language/ToggleLanguage"
import { FaShoppingCart } from "react-icons/fa"
import { ToogleSidebarUser } from "../SidebarUser/ToogleSidebarUser"
import tejipazWhite from '@/public/shared/icons/tejipaz-white.png'
import { ToggleSidebarLinks } from "../SidebarLinks/ToggleSidebarLinks"
import { NavbarCart } from "./NavbarCart"
export const Navbar = async () => {
    const t = await getTranslations(`RootLayout`)
    return (
        <nav className="w-full p-3 bg-black min-h-20 flex justify-between items-center">
            <Link href={`/`} className="flex-none">
                <Image src={tejipazWhite} alt="logo" loading="eager" width={60} />
            </Link>

            <ul className="flex gap-8 items-center">
                {
                    t?.raw?.('Navbar')?.map(({ text, to }: { text: string, to: string }, i: number) => (
                        <li key={i} className="hidden lg:block">
                            <NavbarLink text={text} to={to} className="text-nowrap" />
                        </li>
                    ))
                }
                <li>
                    <NavbarCart/>
                </li>
                <li>
                    <ToogleSidebarUser />
                </li>
                <li className="hidden lg:block">
                    <ToggleLanguage />
                </li>
                <li className="hidden lg:block">
                    <ToggleTheme />
                </li>
                <li className="block lg:hidden">
                    <ToggleSidebarLinks />
                </li>
            </ul>
        </nav>
    )
}