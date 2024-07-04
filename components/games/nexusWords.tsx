'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Word {
    word: string;
    translation: string;
}

interface Result {
    word: Word;
    translation: Word;
    isCorrect: boolean;
}

const words: Word[] = [
    {
        word: 'apple',
        translation: 'яблоко'
    },
    {
        word: 'banana',
        translation: 'банан'
    },
    {
        word: 'orange',
        translation: 'апельсин'
    },
    {
        word: 'grape',
        translation: 'виноград'
    },
    {
        word: 'pear',
        translation: 'груша'
    },
];

const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

const NexusWords: React.FC = () => {
    const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
    const [shuffledTranslations, setShuffledTranslations] = useState<Word[]>([]);
    const [selectedWord, setSelectedWord] = useState<Word | null>(null);
    const [selectedTranslation, setSelectedTranslation] = useState<Word | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [isOver, setIsOver] = useState<boolean>(false);

    useEffect(() => {
        setShuffledWords(shuffleArray([...words]));
        setShuffledTranslations(shuffleArray([...words]));
    }, []);

    useEffect(() => {
        if (results.length === words.length) {
            setIsOver(true);
        }
    }, [results]);

    const handleWordClick = (word: Word) => {
        setSelectedWord(word);
        if (selectedTranslation) {
            checkMatch(word, selectedTranslation);
        }
    };

    const handleTranslationClick = (translation: Word) => {
        setSelectedTranslation(translation);
        if (selectedWord) {
            checkMatch(selectedWord, translation);
        }
    };

    const checkMatch = (word: Word, translation: Word) => {
        const isCorrect = word.translation === translation.translation;
        setResults((prevResults) => [...prevResults, { word, translation, isCorrect }]);
        setSelectedWord(null);
        setSelectedTranslation(null);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full">
                <h2 className="text-[22px] font-bold">Bir xil so’zlarni tanlang</h2>
                <p className="ml-0 text-gray-800 dark:text-gray-200" style={{ margin: 0 }}>So’zning inglizcha hamda o’zbekcha holatini birdaniga bosing</p>
                <div className="w-full flex gap-2">
                    <div className="w-full">
                        {shuffledWords.map((word, index) => {
                            const isSelected = selectedWord && selectedWord.word === word.word;
                            const isCorrect = results.some((result) => result.word.word === word.word && result.isCorrect);
                            const isWrong = results.some((result) => result.word.word === word.word && !result.isCorrect);
                            return (
                                <Button
                                    variant={'outline'}
                                    key={index}
                                    onClick={() => handleWordClick(word)}
                                    disabled={results.some((result) => result.word.word === word.word)}
                                    className={`p-2 mb-2 border w-full  flex px-[15px] dark:text-white dark:bg-[#141414] items-center h-[55px] rounded-[15px] disabled:opacity-100
                                        ${isSelected ? 'border-2 border-black dark:border-white' : ''}
                                         ${isCorrect ? 'bg-[#58cc02] dark:bg-[#58cc02] text-white' : isWrong ?
                                            'bg-red-700 dark:bg-red-700 text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-[#1F1F1F]'
                                        }`}
                                >
                                    <p>{word.word}</p>
                                </Button>
                            );
                        })}
                    </div>
                    <div className="w-full">
                        {shuffledTranslations.map((translation, index) => {
                            const isSelected = selectedTranslation && selectedTranslation.translation === translation.translation;
                            const isCorrect = results.some((result) => result.translation.translation === translation.translation && result.isCorrect);
                            const isWrong = results.some((result) => result.translation.translation === translation.translation && !result.isCorrect);
                            return (
                                <Button
                                    variant={'outline'}
                                    key={index}
                                    onClick={() => handleTranslationClick(translation)}
                                    disabled={results.some((result) => result.translation.translation === translation.translation)}
                                    className={`p-2 mb-2 border w-full  flex px-[15px] dark:text-white dark:bg-[#141414] items-center h-[55px] rounded-[15px] disabled:opacity-100
                                        ${isSelected ? 'border-2 border-black dark:border-white' : ''}
                                         ${isCorrect ? 'bg-[#58cc02] dark:bg-[#58cc02] text-white' : isWrong ?
                                            'bg-red-700 dark:bg-red-700 text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-[#1F1F1F]'
                                        }`}
                                >
                                    <p>{translation.translation}</p>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <p className="text-lg font-semibold">
                    {isOver ? 'Game Over! All words matched' : 'Keep matching the words!'}
                </p>
            </div>
        </div>
    );
};

export default NexusWords;
