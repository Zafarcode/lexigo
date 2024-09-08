import { useState } from 'react';
import { Button } from '@/components/ui/button';
import rendomElement from '@/app/skills/[slug]/rendomElemen.json';
import ImageCard from '@/components/vocabulary/game-images/image-card';
import GameHeader from '@/components/vocabulary/game-images/game-start';
import GameDialog from './game-dialog';

const GameBody = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  const getRandomIndex = () => {
    const remainingIndices = rendomElement
      .map((_, index: number) => index)
      .filter(index => !usedIndices.includes(index));

    if (remainingIndices.length === 0) {
      if (usedIndices.includes(currentIndex)) {
        <GameDialog isOpen={true} onClose={() => {}}/>
        return currentIndex
      }

      setUsedIndices([currentIndex]); // Reset used indices but keep the current index to prevent immediate repetition
      const newRemainingIndices = rendomElement
        .map((_, index: number) => index)
        .filter(index => index !== currentIndex);

      return newRemainingIndices[Math.floor(Math.random() * newRemainingIndices.length)];
    }

    return remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
  };

  const handleNextClick = () => {
    const newIndex = getRandomIndex();
    if (newIndex !== currentIndex || usedIndices.length === 0) {
      setCurrentIndex(newIndex);
      setUsedIndices([...usedIndices, newIndex]);
    }
  };

  const currentElement = rendomElement[currentIndex];
  const elementName = currentElement?.name;

  return (
    <>
      <GameHeader text={elementName} />

      <div className='grid md:grid-cols-2 grid-cols-2 gap-2 md:gap-5 md:w-[70%] w-full mx-auto'>
        {currentElement?.images?.map((image, imageIndex) => (
          <ImageCard key={`${currentIndex}-${imageIndex}`} element={image} index={imageIndex} />
        ))}
      </div>
      
      <div className='flex justify-center md:w-[70%] w-full mx-auto mb-6'>
        <Button onClick={handleNextClick} className='w-full md:w-1/2 mt-5 font-sans'>
          Next
        </Button>
      </div>
    </>
  );
};

export default GameBody;
