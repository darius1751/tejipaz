import { CreateAccountForm } from "@/features/client/auth/components/CreateAccountForm";
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
        title: `Create account`
    }
}
export default function CreateAccount() {

    return (
        <CreateAccountForm />
    )
}