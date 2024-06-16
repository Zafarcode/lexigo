'use client'
import Image from "next/image"
import HeroImage from '../../public/assets/images/hero-image.png'
import HeroBgCircles from '../../public/assets/images/hero-bg-circles.png'
import { BriefcaseBusiness, Lightbulb, Speech } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { DiplomatPerson, NoteBookIcon } from "../utils/icons"


const HeroSection = () => {

    const { theme } = useTheme()

    console.log(theme)
    console.log('first')

    return (
        <div className='w-100 overflow-x-hidden relative bg-repeat bg-left bg-contain' style={{ backgroundImage: 'url("/public/assets/images/hero-bg-circles.png")' }}>
            <div className="absolute w-full h-full flex ">
                <Image className="object-contain absolute left-0 top-0" src={HeroBgCircles} alt="hero-bg-circles" />
                <Image className="absolute object-contain bottom-0 right-0" src={HeroBgCircles} alt="hero-bg-circles" />
            </div>
            <div className="max-w-7xl mx-auto h-full px-4 mt-4">
                <div className="flex  justify-evenly gap-[97px] h-full max-[875px]:flex-col-reverse  relative">
                    <div className="min-h-[420px] max-w-[573px]">
                        <h2 className="text-[40px] font-bold leading-[45px] capitalize">
                            Unlock Your <span className="text-red-500">Language</span> Potential <span className="text-red-500">with</span> <span className="text-red-500">WordWonders</span>: Where English learning <span className="text-red-500">becomes</span> an <span className="text-red-500">adbenture!</span>
                        </h2>
                        <p className="leading-[180%] text-base text-[rgb(100,100,100)] mt-3 mb-5">Learn UI-UX Design skills with weekend UX . The latest online learning system and material that help your knowledge growing.</p>
                        <div className="flex gap-[28px]">
                            <button className="bg-red-500 text-white px-8 py-3 rounded-[8px]">Get Started</button>
                            <button className="border border-red-500 text-red-500 px-8 py-3 rounded-[8px] ml-4">Get free trial</button>
                        </div>
                        <ul className="mt-[30px] gap-[34px] flex">
                            <li className="flex items-center gap-[10px] ">
                                <Speech className="w-[30px] h-[30px]" color="rgb(241, 191, 90)" />
                                <p className="max-[875px]:text-[10px]">Public Speaking</p>
                            </li>
                            <li className="flex items-center gap-[10px]">
                                <BriefcaseBusiness className="w-[30px] h-[30px]" color="rgb(244, 135, 107)" />
                                <p className="max-[875px]:text-[10px]">Career Oriented</p>
                            </li>
                            <li className="flex items-center gap-[10px]">
                                <Lightbulb color="rgb(180, 112, 141)" className="border border-dashed w-[30px] h-[30px]" />
                                <p className="max-[875px]:text-[10px]">Creative Thinking</p>
                            </li>
                        </ul>

                    </div>
                    <div className="relative mt-4 max-[875px]:w-[400px] max-[600px]:w-[250px] max-[875px]:mx-auto">
                        <div className="absolute w-[400px] h-[400px] max-[600px]:w-[250px] max-[600px]:h-[250px] border border-red-500 rounded-full top-[-21px] left-[-22px]"></div>
                        <div className="overflow-hidden rounded-full bg-red-500 mb-auto w-[350px] h-[350px] flex items-end justify-center max-[600px]:w-[250px] max-[600px]:h-[250px]">
                            <Image src={HeroImage} className="w-[260px] h-[300px] max-[600px]:w-[150px] max-[600px]:h-[180px]" alt="hero" width={500} height={500} />
                        </div>
                        <div className={cn("absolute bg-red-500 max-[600px]:w-[100px] max-[600px]:h-[100px] w-[124px] max-[875px]:w-[100px] h-[169px] top-[-19px] right-[-36px] border border-red-500 rounded-[18px] flex items-center flex-col bg-[inherit] justify-center", theme == "light" ? "bg-white" : "bg-[#09090B]")}>
                            <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M40.36 4.36011C47.9624 4.36011 55.3697 6.76689 61.5203 11.2355C67.6708 15.7041 72.2487 22.0051 74.598 29.2355C76.9473 36.4659 76.9473 44.2544 74.598 51.4847C72.2487 58.7151 67.6708 65.0161 61.5203 69.4847" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3 className="text-[26px] max-[875px]:text-[20px]">2K</h3>
                            <p className="max-[875px]:text-[14px] max-[600px]:text-[12px]">Video Courses</p>
                        </div>
                        <div className={cn("absolute max-[600px]:right-0 gap-2 max-[875px]:w-[180px] max-[600px]:w-[130px] max-[600px]:h-[80px] bg-red-500 w-[200px] h-[75px] top-[30%] left-[-96px] border border-red-500 rounded-[18px] flex items-center justify-between p-[18px]", theme == "light" ? "bg-white" : "bg-[#09090B]")}>
                            <div className="bg-red-500 p-[7px] rounded-[12px]">
                                <NoteBookIcon />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-[20px] max-[875px]:text-[16px]">20K</h3>
                                <p className="max-[875px]:text-[14px] max-[600px]:text-[10px]">English words</p>
                            </div>
                        </div>
                        <div className={cn("absolute max-[875px]:w-[140px] gap-2 max-[600px]:bottom-[-10%] max-[600px]:w-[120px] max-[600px]:h-[80px] bg-red-500 w-[164px] h-[85px] bottom-[9%] right-0 border border-red-500 rounded-[18px] flex items-center justify-between p-[18px]", theme == "light" ? "bg-white" : "bg-[#09090B]")}>
                            <div className="bg-red-500 p-[7px] rounded-[12px]">
                                <DiplomatPerson />
                            </div>
                            <div className="flex flex-col">

                                <p className="text-gray-400 max-[875px]:text-[14px] max-[600px]:text-[10px]">Tutors</p>
                                <h3 className="text-[26px] max-[875px]:text-[20px] max-[600px]:text-[14px]">250+</h3>
                            </div>
                        </div>
                    </div>
                </div >
                <div className="flex mt-4 w-full items-center gap-8 max-[600px]:flex-wrap">
                    <div className="ml-[76px]">
                        <h2 className="text-red-500 text-3xl font-semibold">250+</h2>
                        <p className="text-xl font-semibold">Collobaration</p>
                    </div>
                    <ul className="flex gap-8 ">
                        <li className="">
                            <Image src={"/assets/icons/duolingo.svg"} width={150} height={30} alt={"duolingo"} />
                        </li>
                        <li className="">
                            <Image src={"/assets/icons/duolingo.svg"} width={150} height={30} alt={"duolingo"} />
                        </li>
                        <li className="">
                            <Image src={"/assets/icons/duolingo.svg"} width={150} height={30} alt={"duolingo"} />
                        </li>
                        <li className="">
                            <Image src={"/assets/icons/duolingo.svg"} width={150} height={30} alt={"duolingo"} />
                        </li>
                        <li className="">
                            <Image src={"/assets/icons/duolingo.svg"} width={150} height={30} alt={"duolingo"} />
                        </li>
                        <li className="">
                            <Image src={"/assets/icons/duolingo.svg"} width={150} height={30} alt={"duolingo"} />
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default HeroSection