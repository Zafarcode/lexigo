import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import NextLink from 'next/link';
import useGameStore from '@/store/game.provider';
import CardElement from "@/app/skills/[slug]/rendomElemen.json"
import { useParams } from 'next/navigation';

const GameDialog = ({ isOpen, onClose }: { isOpen: any, onClose: any}) => {
  const params = useParams();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Game Over</DialogTitle>
          <DialogDescription>{`You scored 2 out of ${CardElement.length} correct answers.`}</DialogDescription>
        </DialogHeader>
        <DialogFooter className=''>
          <NextLink href={'/'}>
            <Button variant='outline'>Go to Home</Button>
          </NextLink>
          <NextLink href={`/skills/${params.slug}`}>
            <Button onClick={onClose}>Next Level</Button>
          </NextLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameDialog;
