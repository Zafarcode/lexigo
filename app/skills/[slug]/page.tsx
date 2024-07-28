"use client"
import { useEffect } from 'react';
import useGameStore from '@/store/game.provider';
import GameHeader from '@/components/vocabulary/game-images/game-start';
import GameBody from '@/components/vocabulary/game-images/game-body';
import GameDialog from '@/components/vocabulary/game-images/game-dialog';
import TimesUpDialog from '@/components/vocabulary/game-images/times-up-dialog';
import CardElement from '@/app/skills/[slug]/rendomElemen.json';

const SkillsDetailPage = () => {
  const { setShuffledIndices, isDialogOpen, setIsDialogOpen, isTimeUpDialogOpen, setIsTimeUpDialogOpen } = useGameStore();
  function shuffle(array: number[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
	}
  useEffect(() => {
    setShuffledIndices(shuffle(Array.from({ length: CardElement.length }, (_, i) => i)));
  }, [setShuffledIndices]);

  return (
    <main className='pt-24 md:pt-28'>
      <div className='container'>
        <GameHeader />
        <GameBody />
      </div>
      <GameDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      <TimesUpDialog isOpen={isTimeUpDialogOpen} onClose={() => setIsTimeUpDialogOpen(false)} />
    </main>
  );
};

export default SkillsDetailPage;


