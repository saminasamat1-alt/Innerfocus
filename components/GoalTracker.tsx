
import React from 'react';

interface GoalTrackerProps {
  completedMinutes: number;
  dailyGoal: number;
  progress: number;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ completedMinutes, dailyGoal, progress }) => {
  return (
    <div className="w-full mt-10">
      <div className="flex justify-between items-center mb-1 text-sm text-slate-600">
        <span>Daily Goal</span>
        <span>{completedMinutes} / {dailyGoal} min</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div 
          className="bg-sky-500 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${Math.min(progress, 100)}%` }}>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;
