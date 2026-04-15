'use client'
import { ChangeEvent, ChangeEventHandler, useEffect, useId, useRef, useState } from "react";
import { Input } from "./Input";
import { IoIosArrowDown } from "react-icons/io";
import { useClickOutsideClose } from "../../hooks/useClickOutsideClose";

type Props = {
    // initialValue: number | string;
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    name: string;
    value: string;
    options: { value: string, text: string }[];
    label?: string;
    className?: string;
    classNameInput?: string;
    classNameOptions?: string;
    classNameOption?: string;
    classNameLabel?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    requiredSignal?: boolean;
    searcheable?: boolean;
}
export const InputDropdown = ({ name, value, options, disabled, label, required, searcheable, placeholder, requiredSignal, className = '', classNameInput = '', classNameOptions = '', classNameOption = '', classNameLabel = '', handleChange }: Props) => {
    const id = useId();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const $current = useRef<HTMLDivElement>(null);
    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const handleSelect = (value: string) => {
        handleChange({ target: { name, value } } as ChangeEvent<HTMLInputElement>);
        setOpen(false);
    }
    const toogleOpen = () => {
        if (disabled)
            return;
        setOpen(!open);
    }
    useClickOutsideClose({ $current, open, setOpen });
    return (
        <div ref={$current} className={className}>
            {label && <label htmlFor={id} className={`${classNameLabel} ${disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'} flex gap-1 items-start  w-fit`.trim()}>
                <span className="font-bold text-white">
                    {label}:
                </span>
                {requiredSignal && <span className="text-red-600">*</span>}
            </label>
            }
            <div className={`relative w-full`.trim()}>
                <button className={`${classNameInput} bg-background-black rounded-lg h-12 p-1 ${disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'} focus:outline-0 flex gap-4 items-center justify-between`.trim()} type="button" onClick={toogleOpen}>
                    <span className={`min-w-10 text-nowrap ${value ? 'text-white' : 'text-gray'}`}>{value || placeholder}</span>
                    <IoIosArrowDown className="text-white" />
                </button>
                <ol className={`${classNameOptions} bg-background-black absolute top-12 rounded-lg p-1 border flex flex-col gap-0.5 transition-all md:duration-200 z-20 ${open ? "max-h-40 overflow-y-auto" : "max-h-0 overflow-hidden hidden"}`.trim()}>
                    {searcheable && <Input name={`search-${id}`} value={search} placeholder="Buscar..." classNameInput="px-2 bg-black" handleChange={handleChangeSearch} required={false} />}
                    {options.filter(({ text }) => {
                        return !!!search?.trim().length ? true : text.trim().toLowerCase().includes(search.trim().toLowerCase())
                    }).map(({ text, value: valueOption }, i) => (
                        <li
                            id={valueOption}
                            key={i}
                            value={valueOption}
                            className={`text-nowrap text-ellipsis overflow-x-hidden text-white hover:bg-black cursor-pointer h-10 shrink-0 pt-2.5 ${value === valueOption ? 'bg-black' : ''} ${classNameOption}`.trim()}
                            onClick={() => handleSelect(valueOption)}
                        >
                            {text}
                        </li>))
                    }
                </ol>
            </div>
        </div>
    )
}