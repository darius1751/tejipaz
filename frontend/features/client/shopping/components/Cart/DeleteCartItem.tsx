import { Button } from "@/features/shared/components/button/Button";
import { ButtonVariant } from "@/features/shared/components/button/Button.variant";
import { MouseEvent } from "react";

type Props = {
    _id: string;
    name: string;
    handleClose: () => void
}
export const DeleteCartItem = ({ _id, name, handleClose }: Props) => {
    const handleConfirm = () => {

    }
    return (
        <div className="h-full">
            <div className="flex justify-end gap-4">
                <Button text='Cancelar' variant={ButtonVariant.DANGER} handleClick={handleClose} />
                <Button text="Confirmar" variant={ButtonVariant.BLUE} handleClick={handleConfirm} />
            </div>
        </div>
    )
}