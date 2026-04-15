import { Cart } from "@/features/client/shopping/components/Cart/Cart"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: `Cart`
    }
}

export default function CartPage() {
    return (
        <div>
            <Cart />
        </div>
    )
}