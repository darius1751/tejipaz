import { useState } from "react"

type UseModalType = {
    initialOpen?: boolean;
}
export const useModal = (arg?: UseModalType) => {
    const [open, setOpen] = useState(arg?.initialOpen);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return {
        open,
        handleOpen,
        handleClose
    }
}