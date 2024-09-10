import React from 'react';
import rendomElement from './rendomElemen.json';
import { GameDialogProps } from './game-image';




const GameDialog: React.FC<GameDialogProps> = ({ isOpen, onClose, onRestart, correctAnswers }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Game Over</h2>
        <p className="mb-4 text-black">
          You have completed all the rounds!
          You answered {correctAnswers} out of {rendomElement.length + 1} questions correctly
        </p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="btn-secondary text-black">Close</button>
          <button onClick={onRestart} className="btn-primary text-black">Restart</button>
        </div>
      </div>
    </div>
  );
};

export default GameDialog;
