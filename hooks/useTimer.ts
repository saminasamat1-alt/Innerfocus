import { useState, useEffect, useRef, useCallback } from 'react';
import { SessionType } from '../types';

interface TimerProps {
  workDuration: number;
  breakDuration: number;
  onSessionEnd: (sessionType: SessionType) => void;
}

export const useTimer = ({ workDuration, breakDuration, onSessionEnd }: TimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(workDuration);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>(SessionType.Work);

  // Fix: Replaced `NodeJS.Timeout` with `number` for browser compatibility.
  const intervalRef = useRef<number | null>(null);
  const onSessionEndRef = useRef(onSessionEnd);
  
  useEffect(() => {
    onSessionEndRef.current = onSessionEnd;
  }, [onSessionEnd]);

  const switchSession = useCallback(() => {
    onSessionEndRef.current(sessionType);
    if (sessionType === SessionType.Work) {
      setSessionType(SessionType.Break);
      setTimeRemaining(breakDuration);
    } else {
      setSessionType(SessionType.Work);
      setTimeRemaining(workDuration);
    }
  }, [sessionType, workDuration, breakDuration]);
  
  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            switchSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, switchSession]);
  
  useEffect(() => {
    if (!isActive) {
      setTimeRemaining(sessionType === SessionType.Work ? workDuration : breakDuration);
    }
  }, [workDuration, breakDuration, sessionType, isActive]);


  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);

  const resetTimer = useCallback((newSessionType?: SessionType) => {
    setIsActive(false);
    const sessionToReset = newSessionType || sessionType;
    setSessionType(sessionToReset);
    setTimeRemaining(sessionToReset === SessionType.Work ? workDuration : breakDuration);
  }, [sessionType, workDuration, breakDuration]);

  const setTimer = useCallback((durations: {workDuration: number, breakDuration: number}) => {
    if (!isActive) {
        const newDuration = sessionType === SessionType.Work ? durations.workDuration : durations.breakDuration;
        setTimeRemaining(newDuration);
    }
  }, [isActive, sessionType]);

  return { timeRemaining, isActive, sessionType, startTimer, pauseTimer, resetTimer, setTimer };
};