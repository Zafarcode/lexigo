import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { KeyboardProps } from '@/types';

const Keyboard: React.FC<KeyboardProps> = ({
    clickedLetters,
    currentWord,
    inputSpaces,
    handleLetterClick,
    handleNormalSpeech,
    alwaysDisabled = false,
    statusSpeech
}) => {
    const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

    return (
        <div className=' flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center gap-2 items-center'>
                <Button
                    variant='ghost'
                    size='icon'
                    className={` ${statusSpeech} h-10 w-10 rounded-lg bg-pink-500 border-b-4 border-pink-600 animate-pulse hover:bg-pink-500`}
                    onClick={evt => handleNormalSpeech(evt, currentWord)}
                >
                    <Volume2 className='h-5 w-5 text-sky-100' aria-hidden='true' />
                </Button>
                <p className='flex gap-2 text-base sm:text-lg'>
                    {inputSpaces.map((char, idx) => (
                        <span key={idx}>{char}</span>
                    ))}
                </p>
            </div>
            <ul className='mt-6 grid grid-cols-10 gap-1 md:gap-3'>
                {keyboardRows.map((row, rowIndex) => (
                    <li key={rowIndex} className='flex justify-center col-span-full sm:gap-2'>
                        {row.split('').map(letter => (
                            <Button
                                key={letter}
                                onClick={() => handleLetterClick(letter)}
                                disabled={alwaysDisabled || clickedLetters[letter]}
                                className={`rounded-md px-2 py-2 text-xs sm:text-sm ${clickedLetters[letter]
                                    ? currentWord.toUpperCase().includes(letter)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-pink-500 text-white'
                                    : ''
                                    }`}
                            >
                                {letter}
                            </Button>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Keyboard;
