'use client'
import { Link } from "@/i18n/navigation"
import { useEffect, useState } from "react"
import { FaShoppingCart } from "react-icons/fa"

export const NavbarCart = () => {
    const [cantItems, setCantItems] = useState(0);
    useEffect(() => {
        setCantItems(Object.keys(JSON.parse(localStorage.getItem('cart') || '{}')).length);

    }, [])
    return (
        <div>
            <Link href={'/shop/cart'} className="relative">
                {!!cantItems && <span className="text-center flex justify-center items-center absolute -right-3 -top-2.5 bg-red-400 rounded-full font-bold text-[7px] leading-px tracking-[0px] text-black w-3.5 h-3.5">{cantItems < 10 ? cantItems : "+10"}</span>}
                <FaShoppingCart className="cursor-pointer text-white" />
            </Link>
        </div>
    )
}