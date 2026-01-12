
import React, { useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyGoal: number;
  setDailyGoal: (goal: number) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  requestNotificationPermission: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  dailyGoal,
  setDailyGoal,
  notificationsEnabled,
  setNotificationsEnabled,
  requestNotificationPermission,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleNotificationToggle = () => {
    if (!notificationsEnabled) {
      requestNotificationPermission();
    }
    setNotificationsEnabled(!notificationsEnabled);
  }

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fade-in-fast"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-slate-700">
          <CloseIcon />
        </button>
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        
        <div className="mb-6">
          <label htmlFor="daily-goal" className="block text-sm font-medium text-slate-700 mb-1">
            Daily Focus Goal (minutes)
          </label>
          <input
            id="daily-goal"
            type="number"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Enable Notifications</span>
          <button
            onClick={handleNotificationToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
              notificationsEnabled ? 'bg-sky-500' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
