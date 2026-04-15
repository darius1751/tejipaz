'use client'
import { ChangeEvent, useState } from "react"

type UseFormData<T> = {
    initialForm: T;    
}
export const useForm = <T>({ initialForm }: UseFormData<T>) => {
    const [values, setValues] = useState(initialForm);
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    }
    const handleReset = () => {
        setValues(initialForm);
    }
    return {
        values,
        setValues,
        handleChange,
        handleReset
    }
}