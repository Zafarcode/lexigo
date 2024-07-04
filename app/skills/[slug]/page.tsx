"use client"
import {  useParams } from 'next/navigation';
import NextLink from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CardElement from './rendomElemen.json';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useGameStore from '@/store/useGameStore';



const correctSound = "/assets/music/correct.mp3";
const wrongSound = "/assets/music/wrong.mp3";
const playSound = (isCorrect: any) => {
  const sound = new Audio(isCorrect ? correctSound : wrongSound);
  sound.play();
};

const SkillsDetailPage = () => {
  const params = useParams();
  const { toast } = useToast();
  const {
    time,
    isTimeUpDialogOpen,
    progress,
    progressVisible,
    text,
    startGame,
    btnText,
    score,
    shuffledIndices,
    currentIndex,
    rendomElement,
    selectedImageId,
    musicIconVisible,
    isDisabled,
    current,
    isCardSelected,
    isDialogOpen,
    timerRunning,
    setTime,
    setIsTimeUpDialogOpen,
    setProgress,
    setProgressVisible,
    setText,
    setStartGame,
    setBtnText,
    setScore,
    setShuffledIndices,
    setCurrentIndex,
    setRendomElement,
    setSelectedImageId,
    setMusicIconVisible,
    setIsDisabled,
    setCurrent,
    setIsCardSelected,
    setIsDialogOpen,
    setTimerRunning,
  } = useGameStore();
  
  useEffect(() => {
    if (timerRunning && time > 0) {
      const timerId = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timerId);
    } else if (time === 0) {
      setIsTimeUpDialogOpen(true); // Open the "time up" modal
      setTimerRunning(false); // Stop the timer
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerRunning, time]);

  useEffect(() => {
    setShuffledIndices(shuffle(Array.from({ length: CardElement.length }, (_, i) => i)));
  }, [setShuffledIndices]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  function shuffle(array:number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleClick = () => {
    
    if (btnText !== 'Start') {
      // Update the score based on the current selection

      if (current?.isCorrect) {
        setScore(score + 1);
      }
    }

    if (currentIndex >= shuffledIndices.length) {
      // Update the score one last time before showing the alert
      const finalScore = score + (current?.isCorrect ? 1 : 0);
      // toast({
      //   title: "You've completed the game!",
      //   description: `You scored ${finalScore} out of ${CardElement.length} right answers`,
      // });
      setScore(finalScore);
      setIsDialogOpen(true);

      // Reset for a new game
      setShuffledIndices(shuffle(Array.from({ length: CardElement.length }, (_, i) => i) as number[]));
      setCurrentIndex(0);
      setBtnText('Start');
      setScore(0);
      setStartGame('Start Game');
      setMusicIconVisible(false);
      setProgressVisible(false);
      setIsCardSelected(false);
    } else {
      // Move to the next question
      const rendom: any = shuffledIndices[currentIndex];
      const rendomElement = {...CardElement[rendom], isCorrect: false, id: CardElement[rendom].id};
      setRendomElement(rendomElement);
      setText(rendomElement.name);
      setSelectedImageId(null);
      setCurrentIndex(currentIndex + 1);
      setIsCardSelected(false);
      setTimerRunning(true);
      setBtnText('Next');
      setMusicIconVisible(true);
      setProgressVisible(true);
      setStartGame('Select the correct image');
      setProgress(progress + 1);
    }

    setIsDisabled(true); // Reset the button disable state
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'en-US';
      window.speechSynthesis.speak(speech);
    } else {
      toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      });
    }
  };

  const handleSelection = ({
    index,
    isCorrect,
  }: {
    index: number | null;
    isCorrect: boolean;
  }) => {
    if (index !== null) {
      setCurrent({ id: index, isCorrect: isCorrect });
      setSelectedImageId(index);
      setIsDisabled(false);
      setIsCardSelected(true);
      playSound(isCorrect);
    }
  };
  

  return (
    <main className='pt-24 md:pt-28'>
      {/* SkillsDetailPage {params.slug} */}
      <div className='container'>
        <div className='relative'>
          <h1 className='text-4xl text-center font-sans font-medium'>
            {startGame}
          </h1>
            { progressVisible && (
              <div className='absolute top-[0] right-[0] flex gap-2 items-center'>
                {/* <Progress value={(progress/ CardElement.length) * 100 } className='w-[300px] h-2'/>             
                <p>{progress}/{CardElement.length}</p> */}
                <h3 className='text-xl text-primary font-sans'>{formatTime(time)}</h3>
              </div>
            )}
        </div>
        <div className='flex justify-center items-center gap-3'>
          {musicIconVisible && (
            <Image
              className='cursor-pointer'
              src={'/assets/icons/music-therapy.png'}
              width={30}
              height={30}
              alt='music-therapy'
              onClick={handleSpeak}
            />
          )}
          <h2
            className='text-3xl font-sans font-medium cursor-pointer my-3'
            onClick={handleSpeak}
          >
            {text}
          </h2>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-2 gap-5 w-[70%] mx-auto '>
          {rendomElement?.images.map((element: { isCorrect: any; id: number; title: string | undefined; img: string; }, index: number | null) => {
            // Determine the background color based on selection and correctness
            let bgColor = '';
            if (selectedImageId === index) {
              if (element.isCorrect) {
                bgColor = 'bg-green-500 dark:bg-green-500'; // Green background for correct selection
              } else {
                bgColor = 'bg-primary dark:bg-primary'; // Red background for incorrect selection
              }
            }

            return (
              <label key={element.id} htmlFor={element.title} className='group'>
                <input
                  type='radio'
                  name='animal'
                  id={element.title}
                  className='hidden peer'
                  checked={selectedImageId === (index ?? -1)}
                  onChange={() =>
                    handleSelection({
                      index: index,
                      isCorrect: element.isCorrect,
                    })
                  }
                  disabled={isCardSelected && selectedImageId !== index} // Disable if another card is selected
                />
                <Card
                  className={`flex justify-center h-[205px] items-center transition-shadow duration-300 ease-in-out cursor-pointer dark:bg-white ${isCardSelected && selectedImageId !== index ? 'opacity-50 cursor-not-allowed' : ''} peer-checked:shadow-xl peer-checked:${selectedImageId === index ? "bg-green-500" : "bg-primary"} ${bgColor}`}
                >
                  <CardContent className='flex justify-center items-center p-0'>
                    <Image
                      src={element.img}
                      width={140}
                      height={140}
                      alt={element.title ?? "Default image"}
                    />
                  </CardContent>
                </Card>
              </label>
            );
          })}
        </div>
        <div className='flex justify-center w-[70%] mx-auto mb-6'>
          <Button
            className='w-full md:w-1/2 mt-5 font-sans'
            onClick={handleClick}
            disabled={btnText === 'Start' ? false : isDisabled}
          >
            {btnText}
          </Button>
           
        </div>
      </div>

      {/* Dialog Component */}
        <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(true)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Game Over</DialogTitle>
              <DialogDescription>
                {`You scored ${score} out of ${CardElement.length} correct answers.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <NextLink href={"/"}>
                <Button variant='outline'>Go to Home</Button>
              </NextLink>
              <NextLink href={`/skills/${params.slug}`}>
                <Button onClick={() => setIsDialogOpen(false)}>next level</Button>
              </NextLink>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Time's Up Dialog */}
        <Dialog open={isTimeUpDialogOpen} onOpenChange={() => setIsTimeUpDialogOpen(true)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Time is Up!</DialogTitle>
              <DialogDescription>
                Unfortunately, your time is up.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <NextLink href={"/"}>
                <Button onClick={() => setIsTimeUpDialogOpen(false)}>Go to Home</Button>
              </NextLink>
            </DialogFooter>
          </DialogContent>
        </Dialog>

    </main>
  );
};
export default SkillsDetailPage;
