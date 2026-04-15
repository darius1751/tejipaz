'use client'

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Cookies from 'js-cookie'
type Props = {
    open: boolean;
}
export const SidebarUser = ({ open }: Props) => {
    const [user, setUser] = useState<any>();
    const t = useTranslations(``);

    useEffect(() => {
        if (localStorage) {
            const currentUser = JSON.parse(Cookies.get('user') || localStorage?.getItem('user') || "{}");
            setUser(currentUser);
        }
    }, []);
    return (
        <aside className={`fixed right-0 h-[calc(100vh-5rem)] z-30 bg-black top-20 transition-all text-white duration-200 overflow-hidden ${open ? 'w-96' : 'w-0'}`}>
            <div className="flex flex-col gap-6 pt-20 px-4 ">
                <h3 className="text-center w-full font-bold text-lg text-nowrap overflow-hidden">{user?.name}</h3>
                <ul className="flex flex-col gap-4 text-nowrap items-end">
                    {user ? (
                        <>
                            <li className="pt-4">
                                <Link className={`hover:underline`} href={''}>
                                    Perfil
                                </Link>
                            </li>
                            <li className="">
                                <Link className={`hover:underline`} href={''}>
                                    Mi Carrito
                                </Link>
                            </li>
                            <li className="">
                                <Link className={`hover:underline`} href={''}>
                                    Compras
                                </Link>
                            </li>
                            <ul className="pt-8">
                                <li>
                                    <Link href={''} className="hover:underline text-red-500 ">
                                        Cerrar sesión
                                    </Link>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <h3>{user?.name}</h3>
                            <li className="">
                                <Link className={`hover:underline`} href={''}>
                                    Perfil
                                </Link>
                            </li>
                            <li className="">
                                <Link className={`hover:underline`} href={''}>
                                    Mi Carrito
                                </Link>
                            </li>
                            <li className="">
                                <Link className={`hover:underline`} href={''}>
                                    Compras
                                </Link>
                            </li>
                            <li className={`text-red-500 pt-8 hover:underline`}>
                                Cerrar sesión
                            </li>
                        </>
                    )}


                </ul>
            </div>
        </aside>
    )
}