
import React, { useState, useEffect, useCallback } from 'react';
import { FocusMode, SessionType } from './types';
import { FOCUS_MODES, MOTIVATIONAL_QUOTES } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTimer } from './hooks/useTimer';
import { useNotifications } from './hooks/useNotifications';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import ModeSelector from './components/ModeSelector';
import GoalTracker from './components/GoalTracker';
import SettingsModal from './components/SettingsModal';
import { SettingsIcon } from './components/icons/SettingsIcon';

const getTodayString = () => new Date().toISOString().split('T')[0];

export default function App() {
  const [mode, setMode] = useLocalStorage<FocusMode>('focusMode', FocusMode.Classic);
  const [dailyGoal, setDailyGoal] = useLocalStorage<number>('dailyGoal', 120);
  const [completedMinutes, setCompletedMinutes] = useLocalStorage<number>('completedMinutes', 0);
  const [lastSavedDate, setLastSavedDate] = useLocalStorage<string>('lastSavedDate', getTodayString());

  const [motivationalQuote, setMotivationalQuote] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage<boolean>('notificationsEnabled', true);

  const { requestPermission, sendNotification, playSound } = useNotifications();

  const handleSessionEnd = useCallback((sessionType: SessionType) => {
    if (sessionType === SessionType.Work) {
      const workDuration = FOCUS_MODES[mode].work;
      const newCompletedMinutes = completedMinutes + workDuration;
      setCompletedMinutes(newCompletedMinutes);

      const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
      setMotivationalQuote(quote);
      setTimeout(() => setMotivationalQuote(null), 5000);
      
      if (notificationsEnabled) {
        sendNotification("Work session complete!", "Time for a break.");
        playSound();
      }
    } else {
       if (notificationsEnabled) {
        sendNotification("Break is over!", "Ready for the next focus session?");
        playSound();
      }
    }
  }, [mode, completedMinutes, setCompletedMinutes, sendNotification, playSound, notificationsEnabled]);

  const {
    timeRemaining,
    isActive,
    sessionType,
    startTimer,
    pauseTimer,
    resetTimer,
    setTimer,
  } = useTimer({
    workDuration: FOCUS_MODES[mode].work * 60,
    breakDuration: FOCUS_MODES[mode].break * 60,
    onSessionEnd: handleSessionEnd,
  });

  useEffect(() => {
    const today = getTodayString();
    if (lastSavedDate !== today) {
      setCompletedMinutes(0);
      setLastSavedDate(today);
    }
  }, [lastSavedDate, setCompletedMinutes, setLastSavedDate]);
  
  const handleModeChange = (newMode: FocusMode) => {
    setMode(newMode);
    resetTimer(SessionType.Work);
  };
  
  useEffect(() => {
    setTimer({
      workDuration: FOCUS_MODES[mode].work * 60,
      breakDuration: FOCUS_MODES[mode].break * 60,
    });
  }, [mode, setTimer]);

  const progress = dailyGoal > 0 ? (completedMinutes / dailyGoal) * 100 : 0;
  const bgColor = sessionType === SessionType.Work ? 'bg-sky-50' : 'bg-teal-50';
  const textColor = sessionType === SessionType.Work ? 'text-sky-800' : 'text-teal-800';

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-500 ${bgColor} ${textColor}`}>
      <main className="w-full max-w-md mx-auto flex flex-col items-center text-center">
        <header className="w-full flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">InnerFocus</h1>
          <button onClick={() => setIsSettingsOpen(true)} className="p-2 rounded-full hover:bg-black/10 transition-colors">
            <SettingsIcon />
          </button>
        </header>

        <ModeSelector currentMode={mode} onModeChange={handleModeChange} sessionType={sessionType} />
        
        <TimerDisplay 
          timeRemaining={timeRemaining} 
          sessionType={sessionType} 
          totalDuration={sessionType === SessionType.Work ? FOCUS_MODES[mode].work * 60 : FOCUS_MODES[mode].break * 60} 
        />

        <TimerControls 
          isActive={isActive}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={() => resetTimer()}
          sessionType={sessionType}
        />

        {motivationalQuote && (
          <p className="mt-4 text-center text-slate-600 animate-fade-in">{motivationalQuote}</p>
        )}

        <GoalTracker completedMinutes={completedMinutes} dailyGoal={dailyGoal} progress={progress} />
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        dailyGoal={dailyGoal}
        setDailyGoal={setDailyGoal}
        notificationsEnabled={notificationsEnabled}
        setNotificationsEnabled={setNotificationsEnabled}
        requestNotificationPermission={requestPermission}
      />
    </div>
  );
}
