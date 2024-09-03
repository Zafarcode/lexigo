import Image from 'next/image';
import useGameStore from '@/store/game.provider';
import Timer  from "./game-timer"

const GameHeader = () => {
  const { startGame, text, musicIconVisible, progressVisible } = useGameStore();

  const handleSpeak = () => {
	if ('speechSynthesis' in window) {
		const speech = new SpeechSynthesisUtterance(text)
		speech.lang = 'en-US'
		window.speechSynthesis.speak(speech)
	} 
}

  return (
    <div className='relative'>
      <h1 className='text-[27px] md:text-4xl text-center font-sans font-medium'>{startGame}</h1>

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
        <h2 className='text-2xl md:text-3xl font-sans font-medium cursor-pointer my-3' onClick={handleSpeak}>
          {text}
        </h2>
      </div>
    </div>
  );
};

export default GameHeader;
