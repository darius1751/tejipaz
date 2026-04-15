'use client'
import { UIEvent, useEffect, useRef, useState } from "react"
import { dotVariants, DotVariants } from "./dot.variants";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


type Props = {
    className?: string,
    children: React.ReactNode[],
    /**
     * autoPlay in milliseconds
     * @example 
     * 2000ms -> 2segs
     */
    autoPlay?: {
        progress?: boolean;
        time: number;
    },
    initialCurrentItem?: number;
    dots?: {
        variant: DotVariants,
        activeColor: string;
        desactiveColor: string;
    };
    chevrons?: string | boolean;
}
export const Slider = ({ children, autoPlay, dots, chevrons, className = "", initialCurrentItem = 0 }: Props) => {
    const [currentItem, setCurrentItem] = useState(initialCurrentItem);
    const $slider = useRef<HTMLOListElement>(null);

    const handleScroll = (e: UIEvent<HTMLOListElement>) => {
        const { clientWidth, scrollLeft } = $slider.current!;
        setCurrentItem(Math.round(scrollLeft / clientWidth));
    }
    const handleClickChevron = (step: number) => {
        if (currentItem <= 0 && step < 0) {
            setCurrentItem(children.length - 1);
        } else if (currentItem >= (children.length - 1) && step >= 1) {
            setCurrentItem(0)
        } else {
            setCurrentItem((prev) => prev + step);
        }
    }
    useEffect(() => {
        if (!!autoPlay) {
            const key = setInterval(() => {
                setCurrentItem((prev) => (prev >= (children.length - 1)) ? 0 : (prev + 1))
            }, autoPlay.time);
            return () => clearInterval(key);
        }
    }, []);
    useEffect(() => {
        const { clientWidth } = $slider.current!;
        $slider.current!.scrollTo({
            behavior: 'smooth',
            left: clientWidth * currentItem,
        })
    });
    return (
        <div className={`${className} flex flex-col gap-4 w-full overflow-hidden h-full`.trim()}>
            <div className="w-full h-full relative flex flex-col gap-2">
                {chevrons && <FaChevronLeft className={`${chevrons} text-xl cursor-pointer absolute top-1/2 left-2`.trim()} onClick={() => handleClickChevron(-1)} />}
                {/* {autoPlay?.progress && (
                    <div className="bg-gray-500/25">
                        <div className="h-1.5 rounded-xs loading-progress bg-blue-600" style={{
                            animationDuration: `${autoPlay.time}ms`
                        }} />
                    </div>
                )
                } */}
                <ol className="w-full overflow-scroll [scroll-snap-type:x_mandatory] flex items-stretch [scrollbar-width:none] h-full" ref={$slider} onScrollEnd={handleScroll} >
                    {
                        children.map((child, i) => (
                            <li key={i} className={`w-full max-w-full shrink-0 snap-center max-h-full h-full`}>
                                {child}
                            </li>)
                        )
                    }
                </ol>
                {chevrons && <FaChevronRight className={`${chevrons} text-xl cursor-pointer absolute top-1/2 right-2`.trim()} onClick={() => handleClickChevron(1)} />}
            </div>
            {
                dots && (
                    <ol className="flex gap-3 justify-center">
                        {
                            children.map((_, i) => (
                                <li key={`dot-slide-${i}`}>
                                    <button className={`${dotVariants[dots.variant]} ${i === currentItem ? dots?.activeColor : dots?.desactiveColor}`} onClick={() => setCurrentItem(i)} />
                                </li>
                            ))
                        }
                    </ol>
                )
            }
        </div>
    )
}