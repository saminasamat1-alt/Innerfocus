
import { useState, useEffect, useCallback } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return;
    }
    Notification.requestPermission().then(setPermission);
  }, []);

  const sendNotification = useCallback((title: string, body: string) => {
    if (permission === 'granted') {
      new Notification(title, { body });
    }
  }, [permission]);

  const playSound = useCallback(() => {
    const sound = document.getElementById('notification-sound') as HTMLAudioElement;
    if (sound) {
      sound.play().catch(error => console.error("Error playing sound:", error));
    }
  }, []);

  return { permission, requestPermission, sendNotification, playSound };
};
