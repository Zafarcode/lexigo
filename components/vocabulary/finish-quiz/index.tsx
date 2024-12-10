"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import heart from "@/public/assets/icons/heart.png";
import { Check, Heart, Volume2, X } from 'lucide-react'
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button";

const FinishQuiz = () => {
    const [randomWord, setRandomWord] = useState<string>("");
    const randomWordRef = useRef(randomWord);
    const [randomHint, setRandomHint] = useState<string>("");
    const [winCount, setWinCount] = useState<number>(0);
    const [lossCount, setLossCount] = useState<number>(5);
    const [loopCount, setLoopCount] = useState<number>(0);
    const [progress, setProgress] = useState(0)
    const [gameState, setGameState] = useState<"playing" | "end" | "continue">("playing");

    const buttonMap = useRef<Record<string, HTMLButtonElement>>({});
    const options = useMemo(() => [
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
        { word_eng: "well", word_uzb: "Yaxshi" },
    ], []);

    const lengthOptions = options.length

    useEffect(() => {
        randomWordRef.current = randomWord;
    }, [randomWord]);    

    const generateWord = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * options.length);
        const selectedWord = options[randomIndex];
        console.log("Generated Word:", selectedWord.word_eng);
        setRandomWord(selectedWord.word_eng);
        setRandomHint(selectedWord.word_uzb);

        const userInpSection = document.getElementById("user-input-section")!;
        userInpSection.innerHTML = selectedWord.word_eng
            .split("")
            .map(() => `<span class="inputSpace">_</span>`)
            .join("");
    }, [options]);

    const handleWin = useCallback(() => {
        if (loopCount < lengthOptions - 1) {
            setLoopCount((prev) => prev + 1);
            setProgress(prev =>
                Math.min(100, Math.round((prev + 100 / lengthOptions) * 100) / 100)
            )
            console.log(loopCount);
            setGameState("continue");
        } else {
            setLoopCount((prev) => prev + 1);
            console.log("You won the game!");
            setGameState("end");
        }
    }, [loopCount, lengthOptions]);

    const handleLoss = useCallback(() => {
        console.log("Game Over!");
        setGameState("end");
    }, []);

    const handleLetterClick = useCallback((letter: string) => {
        const button = buttonMap.current[letter];
        if (!button || button.disabled) return;

        const charArray = randomWordRef.current.toUpperCase().split("");
        console.log("randomWord:", randomWordRef.current);
        const inputSpaces = document.getElementsByClassName(
            "inputSpace"
        ) as HTMLCollectionOf<HTMLElement>;

        if (charArray.includes(letter)) {
            button.classList.remove('bg-white')
            button.classList.add("bg-green-500", "text-white");
            button.disabled = true;
            charArray.forEach((char, index) => {
                if (char === letter) {
                    inputSpaces[index].innerText = char;
                    setWinCount((prev) => {
                        const winCount = prev + 1;
                        if (winCount === charArray.length) {
                            console.log("continue");
                            handleWin();
                        }
                        return winCount;
                    });
                }
            });
        } else {
            button.classList.remove('bg-white')
            button.classList.add("bg-red-500", "text-white");
            button.disabled = true;
            setLossCount((prev) => {
                const newLossCount = prev - 1;
                if (newLossCount === 0) {
                    handleLoss();
                }
                return newLossCount;
            });
        }
    }, [handleWin, handleLoss]);

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            const key = event.key.toUpperCase();
            if (/^[A-Z]$/.test(key)) {
                handleLetterClick(key);
            }
        },
        [handleLetterClick]
    );

    const createLetterButtons = useCallback(() => {
        const letterContainer = document.getElementById("letter-container")!;
        letterContainer.innerHTML = "";
        const letters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
        const br = document.createElement("br");
        letters.forEach((letter, index) => {
            const button = document.createElement("button");
            button.innerText = letter;
            button.classList.add(
                "bg-white",
                "text-gray-800",
                "outline-none",
                "rounded-md",
                "cursor-pointer",
                "h-[28px]",
                "w-[28px]",
                "border-2",
                "mx-[2px]",
                "sm:mx-1",
                "sm:w-[2em]",
                "sm:h-[2em]",
                "md:w-[3em]",
                "md:h-[3em]"
            );
            button.addEventListener("click", () => handleLetterClick(letter));
            buttonMap.current[letter] = button;
            if (index === 19) {
                letterContainer.appendChild(br);
            }
            letterContainer.appendChild(button);
        });
    }, [handleLetterClick]);
    
    const initializeGame = useCallback(() => {
        setWinCount(0);
        setLossCount(5);
        generateWord();
        buttonMap.current = {};
        createLetterButtons();
        document.addEventListener("keydown", handleKeyPress);
    }, [setWinCount, setLossCount, generateWord, createLetterButtons, handleKeyPress]);

    useEffect(() => {
        if (gameState === "playing") {
            initializeGame();
        }

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [gameState, initializeGame, handleKeyPress]);

    const restartGame = () => {
        setLoopCount(0);
        setProgress(0)
        setGameState("playing");
    }

    const continueGame = () => {
        generateWord();
        setGameState("playing");
    };

    const nextUnit = () => {
        console.log('next unit');

    }


    return (
        <>
            <div className=" w-full max-w-4xl mx-auto flex justify-normal items-center flex-col gap-7">
                <div className="finishQuizProgress w-full mx-auto mt-10 flex justify-between items-center gap-4">
                    <div className='flex items-center gap-2'>
                        <Link
                            href='/dashboard/vocabulary'
                            aria-label='Go back to vocabulary page'
                        >
                            <X className='h-6 w-6 text-gray-200 hover:text-primary hover:text-gray-400 transition-all' />
                        </Link>
                    </div>
                    <Progress
                        value={progress}
                        className={cn('h-3 bg-pink-100', {
                            'bg-pink-200': progress > 0,
                        })}
                        aria-label={`Quiz progress: ${progress}%`}
                    />
                    <div className='flex items-center justify-end space-x-1'>
                        <Heart
                            className={cn('h-4 w-4 text-primary')}
                            aria-hidden='true'
                        />
                        {lossCount > 0 && <span className='text-primary'>{lossCount}</span>}
                    </div>
                </div>
                <Card className="cardFinishQuiz w-[90%] max-w-[40em] h-[350px] p-4 text-center rounded-3xl flex flex-col justify-center items-center">
                    {/* {gameState === "start" && (
                        <Button
                            onClick={startGame}
                            className="w-full  md:max-w-28 text-lg text-white font-semibold transition-colors duration-200 border-b-4 bg-pink-500 hover:bg-pink-600 border-pink-700"
                        >
                            Start
                        </Button>
                    )} */}
                    {gameState === "playing" && (
                        <>
                            <div className=" block">
                                <div id="hint-ref" className="mb-4 text-black">
                                    Hint: {randomHint}
                                </div>
                                <div id="user-input-section"></div>
                                <div id="message" className="text-[#FE6873]"></div>
                                <div id="letter-container" className="mt-8 space-y-2"></div>
                            </div>
                            <Button
                                onClick={continueGame}
                                className="w-full hidden md:max-w-28 text-lg text-white font-semibold transition-colors duration-200 border-b-4 bg-pink-500 hover:bg-pink-600 border-pink-700"
                            >
                                Continue
                            </Button>
                        </>
                    )}
                    {gameState === "continue" && (
                        <>
                            <div className=" hidden">
                                <div id="hint-ref" className="mb-4 text-black">
                                    Hint: {randomHint}
                                </div>
                                <div id="user-input-section"></div>
                                <div id="message" className="text-[#FE6873]"></div>
                                <div id="letter-container" className="mt-8 space-y-2"></div>
                            </div>
                            <Button
                                onClick={continueGame}
                                className=" w-full md:max-w-28 text-lg text-white font-semibold transition-colors duration-200 border-b-4 bg-green-500 hover:bg-green-600 border-green-700"
                            >
                                Continue
                            </Button>
                        </>
                    )}
                    {gameState === "end" && (
                        <>
                            {winCount === randomWord.length ?
                                (
                                    <>
                                        <div className="text-lg font-bold text-red-500">
                                            You Won!
                                        </div>
                                        <div className="flex gap-4 mt-4">
                                            <Button
                                                onClick={restartGame}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                            >
                                                Restart
                                            </Button>
                                            <Button
                                                onClick={nextUnit}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                            >
                                                Next Unit
                                            </Button>
                                        </div>
                                    </>
                                )
                                : (
                                    <>
                                        <div className="text-lg font-bold text-red-500">
                                            Game Over
                                        </div>
                                        <div className="flex gap-4 mt-4">
                                            <Button
                                                onClick={restartGame}
                                                className="w-full md:max-w-28 text-lg text-white font-semibold transition-colors duration-200 border-b-4 bg-pink-500 hover:bg-pink-600 border-pink-700"
                                            >
                                                Restart
                                            </Button>
                                        </div>
                                    </>
                                )}

                        </>
                    )}
                </Card>
            </div>
        </>
    );
};

export default FinishQuiz;

