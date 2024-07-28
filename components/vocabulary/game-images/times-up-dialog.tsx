import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import NextLink from 'next/link';
import useGameStore from '@/store/game.provider';
import CardElement from "@/app/skills/[slug]/rendomElemen.json"

const TimesUpDialog = ({ isOpen, onClose }: { isOpen: any, onClose: any}) => {
  const { score } = useGameStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Time is Up!</DialogTitle>
          <DialogDescription>
            Unfortunately, your time is up. You scored {score} out of {CardElement.length} correct answers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex justify-center items-center '>
          <NextLink href={'/'}>
            <Button onClick={onClose}>Go to Home</Button>
          </NextLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimesUpDialog;
