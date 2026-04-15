import { Shop } from "@/features/client/shopping/components/Shop"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Shop'
}

export default async function ShopPage() {

    return (
        <div>
            <Shop />
        </div>
    )
}