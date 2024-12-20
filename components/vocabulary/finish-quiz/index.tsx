"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Heart, X } from 'lucide-react'
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button";

const generateRandomValue = (() => {
    let availableIndices: number[] = [];

    return (array: any[]): number | undefined => {
        if (availableIndices.length === 0) {
            availableIndices = Array.from(array.keys());
        }

        const randomIndex = Math.floor(Math.random() * availableIndices.length);

        return availableIndices.splice(randomIndex, 1)[0];
    };
})();

const FinishQuiz = () => {
    const [randomWord, setRandomWord] = useState<string>("");
    const randomWordRef = useRef(randomWord);
    const [randomHint, setRandomHint] = useState<string>("");
    const [winCount, setWinCount] = useState<number>(0);
    const [lossCount, setLossCount] = useState<number>(5);
    const [loopCount, setLoopCount] = useState<number>(0);
    const [progress, setProgress] = useState(0)
    const [gameState, setGameState] = useState<"playing" | "end" | "continue">("playing");
    const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const row3 = ["Z", "X", "C", "V", "B", "N", "M"]

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
        const randomIndex: any = generateRandomValue(options);
        const selectedWord = options[randomIndex];
        setRandomWord(selectedWord.word_eng);
        setRandomHint(selectedWord.word_uzb);
    
        const userInpSection = document.getElementById("user-input-section");
        if (userInpSection) {
            userInpSection.innerHTML = selectedWord.word_eng
                .split("")
                .map(() => `<span class="inputSpace">_</span>`)
                .join("");
        }
    }, [options]);


    const handleWin = useCallback(() => {
        if (loopCount < lengthOptions - 1) {
            setLoopCount((prev) => prev + 1);
            setProgress(prev =>
                Math.min(100, Math.round((prev + 100 / lengthOptions) * 100) / 100)
            )
            setGameState("continue");
        } else {
            setLoopCount((prev) => prev + 1);
            setGameState("end");
        }
    }, [loopCount, lengthOptions]);

    const handleLoss = useCallback(() => {
        setGameState("end");
    }, []);

    const handleLetterClick = useCallback((letter: string) => {
        const button = buttonMap.current[letter];
        if (!button || button.disabled) return;

        const charArray = randomWordRef.current.toUpperCase().split("");
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
        const buttons = letterContainer.querySelectorAll("button[data-letter]");
        buttons.forEach((button) => {
            const letter = button.getAttribute("data-letter")!;
            const htmlButton = button as HTMLButtonElement;
            htmlButton.addEventListener("click", () => handleLetterClick(letter));
            buttonMap.current[letter] = htmlButton;
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
            <div className=" w-full max-w-4xl mx-auto flex justify-normal items-center flex-col gap-7 p-3 md:p-6">
                <div className=" w-full p-3 max-w-4xl mx-auto flex justify-normal items-center flex-col gap-7">
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
                    <div className=" w-full text-left">
                        <h1 className='text-2xl sm:text-3xl font-bold'>
                            Finish Quiz
                        </h1>
                    </div>
                    <Card className="cardFinishQuiz w-full h-[350px] p-1 lg:p-4 text-center rounded-3xl flex flex-col justify-center items-center">
                        {gameState === "playing" && (
                            <>
                                <div className=" block">
                                    <div id="hint-ref" className="mb-4 text-lg- text-gray-800 font-medium dark:text-white">
                                        Hint: {randomHint}
                                    </div>
                                    <div id="user-input-section" className=" text-lg"></div>
                                    <div id="message" className="text-[#FE6873]"></div>
                                    <div id="letter-container" className="mt-8 space-y-2">
                                        <div className="keyboard-row">
                                            {row1.map((letter) => (
                                                <button
                                                    key={letter}
                                                    data-letter={letter}
                                                    className="bg-white text-gray-800 outline-none rounded-md cursor-pointer text-[14px] h-[27px] w-[27px] border-2 mx-[2px] sm:mx-1 sm:w-[34px] sm:h-[34px] lg:w-[38px] lg:h-[38px] sm:text-xl"
                                                >
                                                    {letter}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="keyboard-row">
                                            {row2.map((letter) => (
                                                <button
                                                    key={letter}
                                                    data-letter={letter}
                                                    className="bg-white text-gray-800 outline-none rounded-md cursor-pointer text-[14px] h-[27px] w-[27px] border-2 mx-[2px] sm:mx-1 sm:w-[34px] sm:h-[34px] lg:w-[38px] lg:h-[38px] sm:text-xl"
                                                >
                                                    {letter}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="keyboard-row">
                                            {row3.map((letter) => (
                                                <button
                                                    key={letter}
                                                    data-letter={letter}
                                                    className="bg-white text-gray-800 outline-none rounded-md cursor-pointer text-[14px] h-[27px] w-[27px] border-2 mx-[2px] sm:mx-1 sm:w-[34px] sm:h-[34px] lg:w-[38px] lg:h-[38px] sm:text-xl"
                                                >
                                                    {letter}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
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
                                <div className="text-lg font-bold text-red-500">
                                    {winCount === randomWord.length ? "You Won!" : "Game Over"}
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <Button
                                        onClick={restartGame}
                                        className={
                                            winCount === randomWord.length
                                                ? "bg-blue-500 text-white px-4 py-2 rounded-md"
                                                : "w-full md:max-w-28 text-lg text-white font-semibold transition-colors duration-200 border-b-4 bg-pink-500 hover:bg-pink-600 border-pink-700"
                                        }
                                    >
                                        Restart
                                    </Button>
                                    {winCount === randomWord.length && (
                                        <Button
                                            onClick={nextUnit}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Next Unit
                                        </Button>
                                    )}
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default FinishQuiz;