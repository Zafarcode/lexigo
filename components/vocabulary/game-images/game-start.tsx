import Image from 'next/image';

const GameHeader = ({text} : {text: string}) => {

  const handleSpeak = () => {
	if ('speechSynthesis' in window) {
		const speech = new SpeechSynthesisUtterance(text)
		speech.lang = 'en-US'
		window.speechSynthesis.speak(speech)
	}
}

  return (
    <div className='relative my-3'>
      <div className='flex justify-center items-center gap-3'>
        {(
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
