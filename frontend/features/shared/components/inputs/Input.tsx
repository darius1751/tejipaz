import { ChangeEventHandler, HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, useId, useMemo } from "react"

type Props = {
    label?: string;
    name: string;
    value: string | number | readonly string[];
    type?: HTMLInputTypeAttribute,
    readOnly?: boolean;
    className?: string;
    classNameInput?: string;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    requiredSignal?: boolean;
    autoComplete?: HTMLInputAutoCompleteAttribute;
    handleChange?: ChangeEventHandler<HTMLInputElement>;
    validation?: (value: string | number | readonly string[]) => string | undefined,

}
export const Input = ({ label, name, type, value, readOnly, placeholder, handleChange, validation, autoComplete, required = true, requiredSignal = !!label, disabled = false, className = "", classNameInput = "", }: Props) => {
    const id = useId();
    const error = useMemo(() => {
        if (value.toString().length > 0)
            return validation?.(value)
    }, [value])
    return (
        <div className={`flex flex-col gap-3 w-full ${className}`.trim()}>
            {label && <label htmlFor={id} className={`flex gap-1 items-start cursor-pointer w-fit`}>
                <span className="font-bold text-white">
                    {label}:
                </span>
                {requiredSignal && <span className="text-red-600">*</span>}
            </label>}
            <input
                type={type}
                value={value}
                name={name}
                id={id}
                readOnly={readOnly}
                onChange={handleChange}
                disabled={disabled}
                placeholder={placeholder}
                className={`${classNameInput} bg-background-black text-white rounded-lg h-12 p-1 focus:outline-0 w-full`.trim()}
                required={required}
                autoComplete={autoComplete}
            />
            <span className="text-red-400 text-xs">{error}</span>
        </div>
    )
}