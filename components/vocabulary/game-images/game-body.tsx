import { useState, useEffect } from 'react';
import ImageCard from '@/components/vocabulary/game-images/image-card';
import rendomElement from './rendomElemen.json';
import GameHeader from '@/components/vocabulary/game-images/game-start';
import { Button } from '@/components/ui/button';
import GameDialog from '@/components/vocabulary/game-images/game-dialog';
import { Progress } from '@/components/ui/progress';

interface ImageT {
  id: number;
  img: string;
  title: string;
  isCorrect: boolean;
}

const shuffleArray = (array: ImageT[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const GameBody = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnySelected, setIsAnySelected] = useState(false);
  const [shuffledImages, setShuffledImages] = useState<any[]>([]);
  const [usedIndexes, setUsedIndexes] = useState(new Set<number>());
  const [showDialog, setShowDialog] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
  const [progressValue, setProgressValue] = useState(0); // Track progress value

  useEffect(() => {
    const shuffled = shuffleArray([...rendomElement[currentIndex]?.images || []]);
    setShuffledImages(shuffled);
  }, [currentIndex]);

  const handleNextClick = () => {
    setIsAnySelected(false);

    if (usedIndexes.size >= rendomElement.length) {
      setShowDialog(true);
      return;
    }

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * rendomElement.length);
    } while (usedIndexes.has(newIndex)); // Keep finding a new index until an unused one is found

    setUsedIndexes((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.add(newIndex); // Add the new index to the used set
      setProgressValue((updatedSet.size / (rendomElement.length)) * 100); // Update progress value
      return updatedSet;
    });

    setCurrentIndex(newIndex);
  };

  const handleCorrectSelection = () => {
    setIsAnySelected(true);
    setCorrectAnswers(prev => prev + 1); // Increment correct answers count
  };

  const currentElement = rendomElement[currentIndex];
  const elementName = currentElement?.name;

  return (
    <>
      <div className='container'>
        <Progress
          value={progressValue}
          max={100}
          color="green"
        />
      </div>
      <GameHeader text={elementName} />

      <div className="grid md:grid-cols-2 grid-cols-2 gap-2 md:gap-5 md:w-[70%] w-full mx-auto">
        {shuffledImages.map((image, imageIndex) => (
          <ImageCard
            key={`${currentIndex}-${imageIndex}`}
            element={image}
            index={imageIndex}
            isDisabled={isAnySelected}
            onSelected={image.isCorrect ? handleCorrectSelection : () => setIsAnySelected(true)}
          />
        ))}
      </div>

      <div className="flex justify-center md:w-[70%] w-full mx-auto mb-6">
        <Button
          onClick={handleNextClick}
          className="w-full md:w-1/2 mt-5 font-sans"
          disabled={!isAnySelected}
        >
          Next
        </Button>
      </div>

      <GameDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onRestart={() => {
          setUsedIndexes(new Set());
          setCurrentIndex(0);
          setCorrectAnswers(0); // Reset correct answers
          setProgressValue(0); // Reset progress
          setShowDialog(false);
        }}
        correctAnswers={correctAnswers} // Pass correct answers count
      />
    </>
  );
};



export default GameBody;
