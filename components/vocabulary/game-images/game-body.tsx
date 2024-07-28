import { Button } from '@/components/ui/button';
import useGameStore from '@/store/game.provider';
import CardElement from '@/app/skills/[slug]/rendomElemen.json';
import ImageCard from '@/components/vocabulary/game-images/image-card';

const GameBody = () => {
  const { rendomElement, btnText, isDisabled, setScore, score, current, setIsDialogOpen, currentIndex, setRendomElement, setText, setSelectedImageId, setStartGame, setMusicIconVisible, setProgress, setProgressVisible, progress, setIsDisabled, setIsCardSelected, setCurrentIndex, setTimerRunning, setBtnText, shuffledIndices } = useGameStore();

  const handleClick = () => {
    if (btnText !== 'Start') {
        if (current?.isCorrect) {
            setScore(score + 1)
        }
    }

    if (currentIndex >= shuffledIndices.length) {
        // Final score calculation
        const finalScore = score + (current?.isCorrect ? 1 : 0)
        setScore(finalScore)
        setIsDialogOpen(true)
    } else {
        // Move to the next question
        const rendom = shuffledIndices[currentIndex]
        const rendomElement = {
            ...CardElement[rendom],
            isCorrect: false,
            id: CardElement[rendom].id,
        }
        setRendomElement(rendomElement)
        setText(rendomElement.name)
        setSelectedImageId(null)
        setCurrentIndex(currentIndex + 1)
        setIsCardSelected(false)
        setTimerRunning(true)
        setBtnText('Next')
        setMusicIconVisible(true)
        setProgressVisible(true)
        setStartGame('Select the correct image')
        setProgress(progress + 1)
    }

    setIsDisabled(true)
}


  return (
    <>
      <div className='grid md:grid-cols-2 grid-cols-2 gap-2 md:gap-5 md:w-[70%] w-full mx-auto'>
        {rendomElement?.images.map((element, index) => (
          <ImageCard key={element.id} element={element} index={index} />
        ))}
      </div>
      <div className='flex justify-center md:w-[70%] w-full mx-auto mb-6'>
        <Button className='w-full md:w-1/2 mt-5 font-sans' onClick={handleClick} disabled={btnText === 'Start' ? false : isDisabled}>
          {btnText}
        </Button>
      </div>
    </>
  );
};

export default GameBody;
