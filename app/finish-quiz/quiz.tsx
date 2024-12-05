"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import heart from "@/public/assets/icons/heart.png";
import exitBtn from "@/public/assets/icons/exit-button.png";
import Link from "next/link";

const Quiz = () => {
    const [randomWord, setRandomWord] = useState<string>("");
    const randomWordRef = useRef(randomWord);
    const [randomHint, setRandomHint] = useState<string>("");
    const [winCount, setWinCount] = useState<number>(0);
    const [lossCount, setLossCount] = useState<number>(5);
    const [loopCount, setLoopCount] = useState<number>(0);
    const [gameState, setGameState] = useState<"start" | "playing" | "end" | "continue">("start");

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

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            const key = event.key.toUpperCase();
            if (/^[A-Z]$/.test(key)) {
                handleLetterClick(key);
            }
        },
        [randomWord]
    );

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


    const handleLetterClick = (letter: string) => {
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
    };

    const createLetterButtons = useCallback(() => {
        const letterContainer = document.getElementById("letter-container")!;
        letterContainer.innerHTML = "";
        const letters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
        const br = document.createElement('br');
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
    }, []);

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

    const handleWin = () => {
        if (loopCount < lengthOptions - 1) {
            setLoopCount((prev) => prev + 1);
            console.log(loopCount);
            setGameState("continue");
        } else {
            setLoopCount((prev) => prev + 1);
            console.log("You won the game!");
            setGameState("end");
        }
    };

    const handleLoss = () => {
        console.log("Game Over!");
        setGameState("end");
    };

    const startGame = () => {
        setLoopCount(0);
        setGameState("playing");
    }
    const restartGame = () => {
        setLoopCount(0);
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
            <div className="w-[60%] mx-auto mt-10 flex justify-between items-center gap-4">
                <Link href={`/`}>
                    <Image src={exitBtn} alt="Exit" className="w-[25px]" />
                </Link>
                <div id="progress-container" className="w-full bg-gray-300 rounded-xl h-4">
                    <div
                        id="progress-bar"
                        className="bg-blue-500 h-full rounded-xl"
                        style={{ width: `${(loopCount / lengthOptions) * 100}%` }}
                    ></div>
                </div>
                <div className="flex items-center justify-start gap-3">
                    <Image src={heart} alt="Heart" className="w-[25px]" />
                    <span id="chanceCount">{lossCount}</span>
                </div>
            </div>
            <Card className="absolute w-[90%] max-w-[40em] h-[300px] p-4 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center rounded-3xl flex flex-col justify-center items-center">
                {gameState === "start" && (
                    <button
                        onClick={startGame}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Start
                    </button>
                )}
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
                        <button
                            onClick={continueGame}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hidden"
                        >
                            Continue
                        </button>
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
                        <button
                            onClick={continueGame}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Continue
                        </button>
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
                                        <button
                                            onClick={restartGame}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Restart
                                        </button>
                                        <button
                                            onClick={nextUnit}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Next Unit
                                        </button>
                                    </div>
                                </>
                            )
                            : (
                                <>
                                    <div className="text-lg font-bold text-red-500">
                                        Game Over
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <button
                                            onClick={restartGame}
                                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Restart
                                        </button>
                                    </div>
                                </>
                            )}

                    </>
                )}
            </Card>
        </>
    );
};

export default Quiz;

