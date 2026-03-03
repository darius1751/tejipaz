'use client'
import { ChangeEventHandler, useId } from "react";

type Props = {
    // initialValue: number | string;
    handleChange: ChangeEventHandler;
    name: string;
    value: string | number;
    options: { value: string, text: string }[];
    label?: string;
    className?: string;
    classNameInput?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    requiredSignal?: boolean;
}
export const InputDropdown = ({ name, value, options, disabled, label, required, className = '', classNameInput = '', placeholder, requiredSignal, handleChange }: Props) => {
    const id = useId();
    return (
        <div>
            {label && <label htmlFor={id} className={`flex gap-1 items-start cursor-pointer w-fit ${className}`.trim()}>
                <span className="font-bold">
                    {label}:
                </span>
                {requiredSignal && <span className="text-red-600">*</span>}
            </label>
            }
            <select
                name={name}
                value={value}
                disabled={disabled}
                onChange={handleChange}
                required={required}
                className={`bg-background-black rounded-lg h-12 p-1 focus:outline-0 ${classNameInput}`.trim()}
            >
                {placeholder && <option defaultChecked disabled>{placeholder}</option>}
                {options.map(({ text, value }, i) => (<option key={i} value={value}>{text}</option>))}
            </select>
        </div>
    )
}