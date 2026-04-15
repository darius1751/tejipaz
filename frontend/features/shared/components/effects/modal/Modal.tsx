import { IoClose } from "react-icons/io5";
import { ModalVariant, modalVariants } from "./modal.variant";
import { MouseEventHandler } from "react";

type Props = {
    children: React.ReactNode;
    header?: string | React.ReactNode;
    footer?: string | React.ReactNode;
    handleClose?: MouseEventHandler;
    className?: string;
    variant?: ModalVariant;
}
export const Modal = ({ header, footer, children, handleClose, variant = ModalVariant.SMALL, className = '' }: Props) => {

    return (
        <div className={`h-screen w-screen justify-center items-center flex bg-gray-600/70 fixed top-0 left-0 z-30`}>
            <div className={`flex flex-col gap-3 relative z-20 max-h-full bg-background-black p-4 max-w-full rounded-xl ${modalVariants[variant]} ${className}`.trim()}>
                {
                    handleClose && (
                        <div className="flex justify-end">
                            <IoClose className="cursor-pointer" onClick={handleClose} />
                        </div>
                    )
                }
                <div className="flex flex-col justify-between gap-2 h-full">
                    {
                        header && <div className="font-bold">
                            {header}
                        </div>
                    }
                    <div className="h-full">
                        {children}
                    </div>
                    {footer && <div>
                        {footer}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}