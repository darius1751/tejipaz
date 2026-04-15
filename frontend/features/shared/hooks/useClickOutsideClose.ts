import { useEffect } from "react";
type UseClickOutsideCloseData = {
    $current: React.RefObject<HTMLDivElement | null>
    open: boolean;
    setOpen: React.Dispatch<boolean>;
}
export const useClickOutsideClose = ({ $current, open, setOpen }: UseClickOutsideCloseData) => {
    const handleClickOutside = (event: PointerEvent) => {
        if (!$current.current?.contains(event?.target as Node) && open)
            setOpen(false);
    }
    useEffect(() => {
        if (open) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [open])
}