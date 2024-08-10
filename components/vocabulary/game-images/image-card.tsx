import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import useGameStore from '@/store/game.provider';
import { Button } from '@/components/ui/button';
interface elementT {
    id: number
    title: string
    isCorrect: boolean
    img: string
}
const ImageCard = ({ element, index }: { element: elementT, index: number | null }) => {
  const { selectedImageId, setCurrent, setSelectedImageId, setIsDisabled, setIsCardSelected,   isCardSelected } = useGameStore();

  const correctSound = '/assets/music/correct.mp3'
  const wrongSound = '/assets/music/wrong.mp3'
  const playSound = (isCorrect: boolean) => {
	const sound = new Audio(isCorrect ? correctSound : wrongSound)
	sound.play()
  }
  const handleSelection = ({
    index,
    isCorrect,
    }: {
    index: number | null
    isCorrect: boolean
    }) => {
    if (index !== null) {
        setCurrent({ id: index, isCorrect: isCorrect })
        setSelectedImageId(index)
        setIsDisabled(false)
        setIsCardSelected(true)
        playSound(isCorrect)
        }
    }

  let bgColor = '';
  if (selectedImageId === index) {
    if (element.isCorrect) {
      bgColor = 'bg-green-500 dark:bg-green-500';
    } else {
      bgColor = 'bg-primary dark:bg-primary';
    }
  }

  return (
    <>
      <label key={element.id} htmlFor={element.title} className='group'>
        <input
          type='radio'
          name='animal'
          id={element.title}
          className='hidden peer'
          checked={selectedImageId === index}
          onChange={() => handleSelection({ index, isCorrect: element.isCorrect })}
          disabled={isCardSelected && selectedImageId !== index}
        />
        <Card
          className={`flex justify-center h-[205px] items-center transition-shadow duration-300 ease-in-out cursor-pointer dark:bg-white ${
            isCardSelected && selectedImageId !== index ? 'opacity-50 cursor-not-allowed' : ''
          } peer-checked:shadow-xl peer-checked:${selectedImageId === index ? 'bg-green-500' : 'bg-primary'} ${bgColor}`}
        >
          <CardContent className='flex justify-center items-center p-0'>
            <Image
              src={element.img}
              width={140}
              height={140}
              alt={element.title ?? 'Default image'}
              className='mx-auto md:w-[50%] md:h-[60%]  object-contain'
            />
          </CardContent>
        </Card>
      </label>
    </>
  );
};

export default ImageCard;
