import { LoginForm } from "@/features/client/auth/components/LoginForm";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: `Login`
    }
}

export default function Login() {
    return (
        <LoginForm />
    )
}