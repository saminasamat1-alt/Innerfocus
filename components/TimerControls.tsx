
import React from 'react';
import { SessionType } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { ResetIcon } from './icons/ResetIcon';

interface TimerControlsProps {
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  sessionType: SessionType;
}

const TimerControls: React.FC<TimerControlsProps> = ({ isActive, onStart, onPause, onReset, sessionType }) => {
  const baseButtonClass = "transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95";
  const startPauseButtonColor = sessionType === SessionType.Work ? 'bg-sky-500 text-white' : 'bg-teal-500 text-white';
  const resetButtonColor = "bg-slate-200 text-slate-600 hover:bg-slate-300";

  return (
    <div className="flex items-center space-x-4">
      <button onClick={onReset} className={`${baseButtonClass} ${resetButtonColor} p-4 rounded-full`}>
        <ResetIcon />
      </button>
      <button 
        onClick={isActive ? onPause : onStart} 
        className={`${baseButtonClass} ${startPauseButtonColor} w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold uppercase shadow-lg`}
      >
        {isActive ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className="w-12 h-12" /> {/* Spacer */}
    </div>
  );
};

export default TimerControls;
