"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Content from "@/app/finish-quiz/Content";
import script from "@/app/finish-quiz/typescript/script";
import useTTS from "@/hooks/useTTS";

type Option = {
    word_eng: string;
    word_uzb: string;
};

type Unit = {
    book_id: number;
    book_name: string;
    unit_id: number;
    unit_name: string;
    options: Option[];
};

interface QuizProps {
    params: {
        modul_id: number;
        unitId: number;
    };
}

const Quiz = ({ params }: QuizProps) => {
    const { handleNormalSpeech, handleSlowSpeech } = useTTS('en-US');

    const [data, setData] = useState<Unit[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const { modul_id } = params;
        fetch(`https://word-game-data.vercel.app/essential${modul_id}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData: Unit[]) => setData(jsonData))
            .catch((err) => setError(err.message));
    }, [params]);

    useEffect(() => {
        if (data) {
            const id = Number(params.unitId);
            const selectedUnit = data.find(unit => unit.unit_id === id);
            if (selectedUnit) {
                script(selectedUnit.options, selectedUnit.unit_name, selectedUnit.unit_id, selectedUnit.book_id, handleNormalSpeech);
            }
        }
    }, [data, params.unitId, handleNormalSpeech]);

    if (error) return <div>Error: {error}</div>;
    if (!data) {
        return (
            <main className="flex justify-center items-center h-[1200px] xl:h-[650px]">
                <Loader2 className="mr-2 h-20 w-20 animate-spin text-customPink" />
            </main>
        );
    }

    return (
        <>
            <Content />
        </>
    );
};

export default Quiz;
