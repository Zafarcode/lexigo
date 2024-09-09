import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

interface elementT {
  id: number;
  title: string;
  isCorrect: boolean;
  img: string;
}

const ImageCard = ({ element, index, isDisabled, onSelected }: { element: elementT, index: number | null, isDisabled: boolean, onSelected: () => void }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSelectedCorrect, setIsSelectedCorrect] = useState<boolean | null>(null);

  const correctSound = '/assets/music/correct.mp3';
  const wrongSound = '/assets/music/wrong.mp3';

  const playSound = (isCorrect: boolean) => {
    const sound = new Audio(isCorrect ? correctSound : wrongSound);
    sound.play();
  };

  const handleSelection = ({
    index,
    isCorrect,
  }: {
    index: number | null;
    isCorrect: boolean;
  }) => {
    if (index !== null && !isDisabled) {
      playSound(isCorrect);
      setSelectedIndex(index);
      setIsSelectedCorrect(isCorrect);
      onSelected(); // Notify parent that a selection was made
    }
  };

  // Determine background color based on selection
  let bgColor = '';
  if (selectedIndex === index) {
    bgColor = isSelectedCorrect ? 'bg-green-500' : 'bg-primary';
  }

  return (
    <>
      <label key={element.id} htmlFor={element.title} className='group'>
        <input
          type='radio'
          name='animal'
          id={element.title}
          className='hidden peer'
          onChange={() => handleSelection({ index, isCorrect: element.isCorrect })}
          disabled={isDisabled} // Disable input if isDisabled is true
        />
        <Card
          className={`flex justify-center h-[205px] items-center transition-shadow duration-300 ease-in-out cursor-pointer dark:bg-white dark:${bgColor} ${bgColor} ${isDisabled ? 'opacity-100 cursor-not-allowed' : ''}`}
        >
          <CardContent className='flex justify-center items-center p-0'>
            <Image
              src={element.img}
              width={140}
              height={140}
              alt={element.title ?? 'Default image'}
              className='mx-auto md:w-[50%] md:h-[60%] object-contain'
            />
          </CardContent>
        </Card>
      </label>
    </>
  );
};

export default ImageCard;
