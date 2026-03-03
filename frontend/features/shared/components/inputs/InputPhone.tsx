import { ChangeEventHandler, useId } from "react";
import { Input } from "./Input";
import { countries } from "../../constants/countries";
import { InputDropdown } from "./InputDropdown";

type Props = {
    code: string;
    phone: string;
    placeholderCode?: string;
    placeholderPhone?: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    requiredSignal?: boolean;
    className?: string;
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}
export const InputPhone = ({ code, phone, placeholderCode, placeholderPhone, label, handleChange, className = "", disabled = false, required = true, requiredSignal = !!label }: Props) => {
    const id = useId();
    return (
        <div className={`${className} flex flex-col items-end`.trim()}>
            <div className="flex">
                <InputDropdown
                    classNameInput='rounded-e-none'
                    name="code"
                    value={code}
                    handleChange={handleChange}
                    options={countries.map(({ codeCountry }) => ({ text: `${codeCountry}`, value: codeCountry }))}
                    placeholder={placeholderCode}
                    label={label}
                />
                <Input
                    classNameInput="rounded-s-none"
                    name="phone"
                    value={phone}
                    handleChange={handleChange}
                    placeholder={placeholderPhone}
                    disabled={disabled}
                    required={required}
                />
            </div>
        </div>
    )
}