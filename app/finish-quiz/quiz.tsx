"use client";
import { useEffect, useState } from "react";
import script from "@/app/finish-quiz/script";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import heart from '@/public/assets/icons/heart.png'
import exitBtn from '@/public/assets/icons/exit-button.png'
import Link from "next/link";

let options = [
    { word_eng: "afraid", word_uzb: "Qo'rqqan, cho'chigan" },
    { word_eng: "agree", word_uzb: "Fikriga qo'shilmoq, rozi bo'lmoq" },
    { word_eng: "angry", word_uzb: "Jahli chiqqan, badjahl" },
    { word_eng: "arrive", word_uzb: "Yetib kelmoq, kelmoq" },
    { word_eng: "attack", word_uzb: "Hujum qilmoq, hujum uyushtirmoq" },
    { word_eng: "bottom", word_uzb: "Tag, pastki qism" },
    { word_eng: "clever", word_uzb: "Aqlli, ziyrak" },
    { word_eng: "cruel", word_uzb: "Shafqatsiz, berahm" },
    { word_eng: "finally", word_uzb: "Axiyri, vanihoyat" },
    { word_eng: "hide", word_uzb: "Yashirinmoq, bekinmoq" },
    { word_eng: "hunt", word_uzb: "Ov qilmoq, ovlamoq" },
    { word_eng: "lot", word_uzb: "Juda ko'p" },
    { word_eng: "middle", word_uzb: "O'rta" },
    { word_eng: "moment", word_uzb: "Sekund; on, zum" },
    { word_eng: "pleased", word_uzb: "Hursand, mamnun" },
    { word_eng: "promise", word_uzb: "Va'da bermoq" },
    { word_eng: "reply", word_uzb: "Javob bermoq" },
    { word_eng: "safe", word_uzb: "Xavfsiz, bexatar" },
    { word_eng: "trick", word_uzb: "Xiyla, nayrang; fokus" },
    { word_eng: "well", word_uzb: "Yaxshi" }
]

const Quiz = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioRefUk = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        script(options, 'Unit 1', 1, 1);
    }, []);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <>
            <div className=" w-[60%] mx-auto mt-10 flex justify-between items-center gap-4">
                <Link href={`/`}>
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
                <div className=" p-5 flex justify-center gap-5 flex-col hidden" id="vocabAudio">
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

export default Quiz;