import { useState } from "react"
export type UseAlertType = {
    duration: number;
}
export const useAlert = ({ duration }: UseAlertType) => {
    const [activeAlert, setActiveAlert] = useState(false);
    const dispatchAlert = () => {
        setActiveAlert(true);
        setTimeout(() => {
            setActiveAlert(false);
        }, duration)
    }
    return {
        activeAlert,
        setActiveAlert,
        dispatchAlert,
    }
}