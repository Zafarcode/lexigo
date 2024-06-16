'use client'
import Image from "next/image"
import HeroImage from '../../public/assets/images/hero-image.png'
import { BriefcaseBusiness, Lightbulb, Speech } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { DiplomatPerson, NoteBookIcon } from "../utils/icons"

const HeroSection = () => {
    const { theme } = useTheme()

    return (
        <div className="w-full overflow-x-hidden">
            <div className="absolute w-[414px] h-[414px] rounded-full border border-red-500 left-[-100px] top-[10%] -z-10">
                <div className="absolute w-[344px] h-[344px] rounded-full border border-red-500 mt-[30px] ml-[33px]">
                    <div className="absolute w-[274px] h-[274px] rounded-full border border-red-500 mt-[30px] ml-[30px]">
                        <div className="absolute w-[204px] h-[204px] rounded-full border border-red-500 mt-[30px] ml-[30px]">

                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute w-[414px] h-[414px] rounded-full border border-red-500 right-[-100px] bottom-0 -z-10">
                <div className="absolute w-[344px] h-[344px] rounded-full border border-red-500 mt-[30px] ml-[33px]">
                    <div className="absolute w-[274px] h-[274px] rounded-full border border-red-500 mt-[30px] ml-[30px]">
                        <div className="absolute w-[204px] h-[204px] rounded-full border border-red-500 mt-[30px] ml-[30px]">

                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-4">
                <div className="flex justify-center items-center gap-[97px] h-full relative">
                    <div className="min-h-[420px] max-w-[573px] mb-[5%]">
                        <h2 className="text-[60px] font-bold leading-[72px] capitalize">up your <span className="text-red-500">skills </span> <br /> to <span className="text-red-500">advance</span> your <span className="text-red-500">career</span> path</h2>
                        <p className="leading-[180%] text-base text-[rgb(100,100,100)] mt-4 mb-7">Learn UI-UX Design skills with weekend UX . The latest online learning system and material that help your knowledge growing.</p>
                        <div className="flex gap-[28px]">
                            <button className="bg-red-500 text-white px-8 py-3 rounded-[8px]">Get Started</button>
                            <button className="border border-red-500 text-red-500 px-8 py-3 rounded-[8px] ml-4">Get free trial</button>
                        </div>
                        <ul className="mt-[40px] gap-[34px] flex">
                            <li className="flex items-center gap-[10px]">
                                <Speech className="w-[30px] h-[30px]" color="rgb(241, 191, 90)" />
                                <p>Public Speaking</p>
                            </li>
                            <li className="flex items-center gap-[10px]">
                                <BriefcaseBusiness className="w-[30px] h-[30px]" color="rgb(244, 135, 107)" />
                                <p>Career Oriented</p>
                            </li>
                            <li className="flex items-center gap-[10px]">
                                <Lightbulb color="rgb(180, 112, 141)" className="border border-dashed w-[30px] h-[30px]" />
                                <p>Creative Thinking</p>
                            </li>
                        </ul>

                    </div>
                    <div className="relative">
                        <div className="absolute w-[480px] h-[480px] border border-red-500 rounded-full top-[-21px] left-[-22px]"></div>
                        <div className="overflow-hidden rounded-full bg-red-500 w-[480px] h-[480px] flex items-end justify-center">
                            <Image src={HeroImage} className="w-[366px] h-[432px]" alt="hero" width={500} height={500} />
                        </div>
                        <div className={cn("absolute", "bg-red-500", "w-[144px]", "h-[189px]", "top-[-19px]", "right-[-36px]", "border", "border-red-500", "rounded-[18px]", "flex", "items-center", "flex-col", "justify-center", theme == "light" ? "bg-white" : "bg-[#09090B]")}>
                            <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M40.36 4.36011C47.9624 4.36011 55.3697 6.76689 61.5203 11.2355C67.6708 15.7041 72.2487 22.0051 74.598 29.2355C76.9473 36.4659 76.9473 44.2544 74.598 51.4847C72.2487 58.7151 67.6708 65.0161 61.5203 69.4847" stroke="#EF4444" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <h3 className="text-[26px]">2K</h3>
                            <p>Video Courses</p>
                        </div>
                        <div className={cn("absolute", "bg-red-500", "w-[214px]", "h-[90px]", "top-[30%]", "left-[-96px]", "border", "border-red-500", "rounded-[18px]", "flex", "items-center", "justify-between", "p-[18px]", theme == "light" ? "bg-white" : "bg-[#09090B]")}>
                            <div className="bg-red-500 p-[7px] rounded-[12px]">
                                <NoteBookIcon />
                            </div>
                            <div className="flex flex-col">

                                <h3 className="text-[26px]">20K</h3>
                                <p>English words</p>
                            </div>
                        </div>
                        <div className={cn("absolute", "bg-red-500", "w-[164px]", "h-[85px]", "bottom-[5%]", "right-0", "border", "border-red-500", "rounded-[18px]", "flex", "items-center", "justify-between", "p-[18px]", theme == "light" ? "bg-white" : "bg-[#09090B]")}>
                            <div className="bg-red-500 p-[7px] rounded-[12px]">
                                <DiplomatPerson />
                            </div>
                            <div className="flex flex-col">

                                <p className="text-gray-400">Tutors</p>
                                <h3 className="text-[26px]">250+</h3>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    )
}

export default HeroSection