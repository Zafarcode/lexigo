"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CardElement from './rendomElemen.json'; // Assuming 'rendomElemen.json' is your question data file.
import { useToast } from '@/components/ui/use-toast';
import NextLink from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useGameStore from '@/store/useGameStore'; // Assuming you have a custom store for game states.
import { useParams } from 'next/navigation';

const correctSound = "/assets/music/correct.mp3";
const wrongSound = "/assets/music/wrong.mp3";
const playSound = (isCorrect: boolean) => {
  const sound = new Audio(isCorrect ? correctSound : wrongSound);
  sound.play();
};

const SkillsDetailPage = () => {
  const { toast } = useToast();
  const params = useParams();
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

  // Use effect to handle timer countdown
  useEffect(() => {
    if (timerRunning && time > 0) {
      const timerId = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timerId);
    } else if (time === 0) {
      setIsTimeUpDialogOpen(true); // Open the "time up" modal
      setTimerRunning(false); // Stop the timer
    }

  }, [timerRunning, time, setTime, setIsTimeUpDialogOpen, setTimerRunning]);

  // Use effect to shuffle questions at the start
  useEffect(() => {
    setShuffledIndices(shuffle(Array.from({ length: CardElement.length }, (_, i) => i)));
  }, [setShuffledIndices]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  function shuffle(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleClick = () => {
    if (btnText !== 'Start') {
      if (current?.isCorrect) {
        setScore(score + 1);
      }
    }

    if (currentIndex >= shuffledIndices.length) {
      // Final score calculation
      const finalScore = score + (current?.isCorrect ? 1 : 0);
      setScore(finalScore);
      setIsDialogOpen(true);
    } else {
      // Move to the next question
      const rendom = shuffledIndices[currentIndex];
      const rendomElement = { ...CardElement[rendom], isCorrect: false, id: CardElement[rendom].id };
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

    setIsDisabled(true);
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

  const handleSelection = ({ index, isCorrect }: { index: number | null; isCorrect: boolean }) => {
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
      <div className='container'>
        <div className='relative'>
          <h1 className='text-[27px] md:text-4xl text-center font-sans font-medium'>
            {startGame}
          </h1>
          {progressVisible && (
            <div className='absolute top-[0] right-[0] flex gap-2 items-center'>
              <h3 className='text-xl text-primary font-sans mt-[52px] md:mt-2'>{formatTime(time)}</h3>
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
            className='text-2xl md:text-3xl font-sans font-medium cursor-pointer my-3'
            onClick={handleSpeak}
          >
            {text}
          </h2>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-2 gap-2 md:gap-5 md:w-[70%] w-full mx-auto '>
          {rendomElement?.images.map((element, index) => {
            let bgColor = '';
            if (selectedImageId === index) {
              if (element.isCorrect) {
                bgColor = 'bg-green-500 dark:bg-green-500';
              } else {
                bgColor = 'bg-primary dark:bg-primary';
              }
            }

            return (
              <label key={element.id} htmlFor={element.title} className='group'>
                <input
                  type='radio'
                  name='animal'
                  id={element.title}
                  className='hidden peer'
                  checked={selectedImageId === index}
                  onChange={() =>
                    handleSelection({
                      index,
                      isCorrect: element.isCorrect,
                    })
                  }
                  disabled={isCardSelected && selectedImageId !== index}
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
                      className='mx-auto md:w-[50%] md:h-[60%]  object-contain'
                    />
                  </CardContent>
                </Card>
              </label>
            );
          })}
        </div>
        <div className='flex justify-center md:w-[70%] w-full mx-auto mb-6'>
          <Button
            className='w-full md:w-1/2 mt-5 font-sans'
            onClick={handleClick}
            disabled={btnText === 'Start' ? false : isDisabled}
          >
            {btnText}
          </Button>
        </div>
      </div>

      {/* Dialog Component for Game Over */}
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(true)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Game Over</DialogTitle>
            <DialogDescription>
              {`You scored ${score} out of ${CardElement.length} correct answers.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className=''>
            <NextLink href={"/"}>
              <Button variant='outline'>Go to Home</Button>
            </NextLink>
            <NextLink href={`/skills/${params.slug}`}>
              <Button onClick={() => setIsDialogOpen(false)}>Next Level</Button>
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
              Unfortunately, your time is up. You scored {score} out of {CardElement.length} correct answers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex justify-center items-center '>
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
