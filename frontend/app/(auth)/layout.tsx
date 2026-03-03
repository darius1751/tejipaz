import { DotVariants } from "@/features/shared/components/slider/dot.variants"
import { Slider } from "@/features/shared/components/slider/Slider"

type Props = {
    children: React.ReactNode,
}
export default function AuthLayout({ children, }: Props) {

    return (
        // #272b31
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="max-w-full w-4xl bg-white dark:bg-black h-[500px] p-4 rounded-xl flex gap-4">
                <div className="w-full">
                    <Slider className="bg-amber-950 rounded-2xl p-4" dots={{ variant: DotVariants.DASH, activeColor: 'bg-white', desactiveColor: 'bg-gray-400/40' }} autoPlay={{ time: 3500, progress: true }}>
                        <div className="">
                            1
                        </div>
                        <div className="">2</div>
                        <div className="">3</div>
                    </Slider>
                </div>
                <div className="w-full p-3 box-border h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}