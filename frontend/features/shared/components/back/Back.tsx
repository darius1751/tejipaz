import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io"
type Props = {
    text: string;
    to: string;
}
export const Back = ({ text, to }: Props) => {
    return (
        <Link href={to} className="flex gap-2 items-center py-1 px-1.5 w-fit rounded-full backdrop-blur-sm bg-white/15 hover:bg-white/10">
            <IoIosArrowRoundBack className="text-lg"/>
            <span className="text-xs font-bold">{text}</span>
        </Link>
    )
}