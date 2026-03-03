type Props = {
    className?: string;
}
export const Loading = ({ className }: Props) => {
    return (
        <div className={`${className} animate-spin w-3.5 h-3.5 rounded-[50%] border-2 border-gray-300 border-b-transparent`} />
    )
}