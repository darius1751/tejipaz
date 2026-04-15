import { MouseEvent, MouseEventHandler } from "react";
import { Loading } from "../loading/Loading";
import { ButtonVariant, variants } from "./Button.variant";

type Props = {
    text: string;
    className?: string;
    loading?: boolean;
    Icon?: React.ReactNode;
    disabled?: boolean;
    variant?: ButtonVariant;
    handleClick?: MouseEventHandler<HTMLButtonElement>,
    type?: "submit" | "reset" | "button",
}
export const Button = ({ Icon, text, className = "", type, loading = false, disabled = false, variant = ButtonVariant.ORANGE, handleClick }: Props) => {
    return (
        <button
            className={`${className} ${variants[variant]} rounded-lg p-2 mb-2 cursor-pointer flex gap-2 items-center w-fit justify-center disabled:cursor-default`.trim()}
            disabled={loading || disabled}
            onClick={handleClick}
            type={type}
        >
            {Icon}
            <span>
                {text}
            </span>
            {loading && <Loading />}
        </button>
    )
}