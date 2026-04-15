import { AlertVariant } from "./alert.variant";
import { IoIosCloseCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { PiWarningFill } from "react-icons/pi";
import { FaCircleInfo } from "react-icons/fa6";

type Props = {
    title: string;
    text: string;
    variant?: AlertVariant;
}
export const Alert = ({ title, text, variant = AlertVariant.WARN }: Props) => {
    const icons = [
        <IoMdCheckmarkCircle className="text-green-600 w-7 h-7" />,
        <IoIosCloseCircle className="text-red-500 w-7 h-7" />,
        <PiWarningFill className="text-yellow-400 w-7 h-7" />,
        <FaCircleInfo className="text-blue-500 w-7 h-7" />
    ]
    return (
        <div className={`absolute w-96 top-3 right-3 bg-white pr-4 flex gap-2 p-1 items-center`}>
            {icons[variant]}
            <div className="flex flex-col gap-0.5">
                <h3 className="font-bold dark:text-black text-sm">{title}</h3>
                <p className="text-gray text-xs">{text}</p>
            </div>
        </div>
    )
}