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
        title: `Blog - ${slug}`,
        // description: post.description,
    }
}

export default async function Blog({ params }: Props) {
    const { slug } = await params;
    return (
        <div>
            Blog - {slug}
        </div>
    )
}