type Props = {
    children: React.ReactNode,
}
export default function AdminLayout({ children }: Props) {
    return (
        <div className="bg-background-black">
            <div>
                {children}
            </div>
        </div>
    )
}