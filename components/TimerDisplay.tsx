
import React from 'react';
import { SessionType } from '../types';

interface TimerDisplayProps {
  timeRemaining: number;
  sessionType: SessionType;
  totalDuration: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeRemaining, sessionType, totalDuration }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = totalDuration > 0 ? ((totalDuration - timeRemaining) / totalDuration) * 100 : 0;
  const strokeColor = sessionType === SessionType.Work ? 'stroke-sky-500' : 'stroke-teal-500';
  const trackColor = sessionType === SessionType.Work ? 'stroke-sky-200' : 'stroke-teal-200';
  const size = 280;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative my-8 w-72 h-72 flex items-center justify-center">
      <svg className="absolute w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={`${trackColor} transition-all`}
          cx={size/2}
          cy={size/2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          className={`${strokeColor} transition-all duration-500`}
          cx={size/2}
          cy={size/2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="z-10 text-center">
        <p className="text-6xl font-bold tracking-tighter">{formatTime(timeRemaining)}</p>
        <p className="mt-2 text-lg uppercase tracking-widest">
          {sessionType === SessionType.Work ? 'Focus' : 'Break'}
        </p>
      </div>
    </div>
  );
};

export default TimerDisplay;
