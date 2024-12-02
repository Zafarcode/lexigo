"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import heart from '@/public/assets/icons/heart.png'
import exitBtn from '@/public/assets/icons/exit-button.png'
import Link from "next/link";

const Content = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioRefUk = useRef<HTMLAudioElement | null>(null);


    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handlePlayUk = () => {
        if (audioRefUk.current) {
            audioRefUk.current.play();
        }
    };

    return (
        <>
            <div className=" w-[60%] mx-auto mt-10 flex justify-between items-center gap-4">
                <Link href={`/finish-quiz`}>
                    <Image src={exitBtn} alt="heart" className=" w-[25px] h-[25%]" />
                </Link>
                <div id="progress-container" className="w-full bg-gray-300 rounded-xl h-4">
                    <div
                        id="progress-bar"
                        className="bg-blue-500 h-full rounded-md"
                        style={{ width: '0%' }}
                    ></div>
                </div>
                <div className=" flex items-center justify-start gap-3">
                    <Image src={heart} alt="heart" className=" w-[25px] h-[25%]" />
                    <span id="chanceCount"></span>
                </div>
            </div>
            <Card className=" absolute w-[90%] max-w-[40em]  p-[5em_1em] sm:p-[5em_2em] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center rounded-3xl">
                <div className=" mb-4 text-black" id="hint-ref"></div>
                <div id="user-input-section"></div>
                <div id="message" className=" text-[#FE6873]"></div>
                <div id="letter-container" className="mt-8 space-y-2">
                </div>
            </Card>

            <div
                className=" bg-white absolute w-full h-full flex items-center justify-center flex-col gap-5 top-0 z-10"
                id="controls-container"
            >
                <div id="result" className=" text-[#282828]"></div>
                <div id="word" className=" font-semibold my-4"></div>
                <div id="unitName" className=" my-2 text-[#6740f6] text-[24px] font-semibold"></div>

                {/* VOICE */}
                <div className=" p-5 flex justify-center gap-5 flex-col hidden" id="vocabAudio">
                    {/* USA */}
                    <div className=" flex justify-center gap-5">
                        <audio ref={audioRef} id="audioUsa" />
                        <Image
                            width="30"
                            height="30"
                            src="/assets/icons/icons8-usa-30.png"
                            alt="usa"
                        />
                        <Image
                            width="30"
                            height="30"
                            src="/assets/icons/voice.gif"
                            alt="Cool Animation"
                            className=" cursor-pointer"
                            onClick={handlePlay}
                            title="Play Sound"
                        />
                    </div>
                    {/* UK */}
                    {/* <div className=" flex justify-center gap-5">
                        <audio ref={audioRefUk} src={""} id="audioUk" />
                        
                        <Image
                            width="30"
                            height="30"
                            src="/gif/voice.gif"
                            alt="Cool Animation"
                            className=" cursor-pointer"
                            onClick={handlePlayUk}
                            title="Play Sound"
                        />
                    </div> */}
                </div>

                <div className="box flex justify-center">
                    <Button
                        id="start"
                        className=" hover:bg-[#6740f6] h-full text-[1.2em] py-6 px-12 text-white bg-[#6740f6] border-none outline-none rounded-[2em] cursor-pointer"
                    >
                        Start
                    </Button>
                    <a href={""} id="linkNextUnit">
                        <Button
                            className=" hover:bg-[#6740f6] h-full text-[1.2em] py-6 px-12 text-white bg-[#6740f6] border-none outline-none rounded-[2em] cursor-pointer hidden"
                            id="nextUnit"
                        >
                            Next Unit
                        </Button>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Content;
