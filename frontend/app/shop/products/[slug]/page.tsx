import { Metadata, ResolvingMetadata } from "next"

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    params: Promise<{ slug: string }>
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug
    return {
        title: `Shop - ${slug}`,
        // description: post.description,
    }
}

export default async function Product({ params }: Props) {
    const { slug } = await params;
    return (
        <div>
            {slug}
        </div>
    )
}