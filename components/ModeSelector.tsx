
import React from 'react';
import { FocusMode, SessionType } from '../types';
import { FOCUS_MODES } from '../constants';

interface ModeSelectorProps {
  currentMode: FocusMode;
  onModeChange: (mode: FocusMode) => void;
  sessionType: SessionType;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange, sessionType }) => {
  const inactiveWork = "bg-white text-slate-500 hover:bg-sky-100";
  const activeWork = "bg-sky-500 text-white shadow-md";
  const inactiveBreak = "bg-white text-slate-500 hover:bg-teal-100";
  const activeBreak = "bg-teal-500 text-white shadow-md";

  return (
    <div className="flex space-x-2 p-1 bg-slate-200/80 rounded-full">
      {Object.values(FocusMode).map((mode) => {
        const isActive = currentMode === mode;
        let styleClass = "";
        if (sessionType === SessionType.Work) {
            styleClass = isActive ? activeWork : inactiveWork;
        } else {
            styleClass = isActive ? activeBreak : inactiveBreak;
        }
        
        return (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${styleClass}`}
          >
            {FOCUS_MODES[mode].name}
          </button>
        );
      })}
    </div>
  );
};

export default ModeSelector;
