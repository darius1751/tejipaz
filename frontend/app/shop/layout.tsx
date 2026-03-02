type Props = Readonly<{
    children: React.ReactNode
}>
export default function ShopLayout({ children }: Props) {
    return (
        <div>
            {children}
        </div>
    )
}