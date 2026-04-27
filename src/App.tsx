/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calculator, History, Settings as SettingsIcon, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculation, Settings } from './types';
import CalculatorScreen from './components/CalculatorScreen';
import HistoryScreen from './components/HistoryScreen';
import SettingsScreen from './components/SettingsScreen';

type View = 'calculator' | 'history' | 'settings';

export default function App() {
  const [view, setView] = useState<View>('calculator');
  const [history, setHistory] = useState<Calculation[]>([]);
  const [settings, setSettings] = useState<Settings>({
    defaultGstRate: 18,
    currency: 'INR',
    theme: 'light',
  });

  // Load from local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem('restful_math_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedSettings = localStorage.getItem('restful_math_settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      if (parsed.theme === 'dark') document.documentElement.classList.add('dark');
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('restful_math_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('restful_math_settings', JSON.stringify(settings));
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const addToHistory = (calc: Calculation) => {
    setHistory((prev) => [calc, ...prev]);
  };

  const deleteFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop Header */}
      <header className="hidden md:block sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-outline-variant/30 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <Moon className="w-6 h-6" />
            <span>Restful Math</span>
          </div>
          <nav className="flex items-center gap-4">
            <NavButton
              active={view === 'calculator'}
              onClick={() => setView('calculator')}
              icon={<Calculator className="w-5 h-5" />}
              label="Calculator"
            />
            <NavButton
              active={view === 'history'}
              onClick={() => setView('history')}
              icon={<History className="w-5 h-5" />}
              label="History"
            />
            <NavButton
              active={view === 'settings'}
              onClick={() => setView('settings')}
              icon={<SettingsIcon className="w-5 h-5" />}
              label="Settings"
            />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {view === 'calculator' && (
              <CalculatorScreen onSave={addToHistory} settings={settings} />
            )}
            {view === 'history' && (
              <HistoryScreen history={history} onDelete={deleteFromHistory} />
            )}
            {view === 'settings' && (
              <SettingsScreen settings={settings} onUpdate={setSettings} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-outline-variant/30 dark:border-slate-800 px-6 py-3 pb-8 flex justify-between items-center rounded-t-2xl shadow-xl">
        <MobileNavButton
          active={view === 'calculator'}
          onClick={() => setView('calculator')}
          icon={<Calculator className="w-6 h-6" />}
          label="Calculator"
        />
        <MobileNavButton
          active={view === 'history'}
          onClick={() => setView('history')}
          icon={<History className="w-6 h-6" />}
          label="History"
        />
        <MobileNavButton
          active={view === 'settings'}
          onClick={() => setView('settings')}
          icon={<SettingsIcon className="w-6 h-6" />}
          label="Settings"
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        active
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-outline hover:bg-surface-container'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileNavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-200 ${
        active ? 'text-primary scale-110' : 'text-outline'
      }`}
    >
      <div className={`p-2 rounded-xl ${active ? 'bg-primary/10' : ''}`}>
        {icon}
      </div>
      <span className="text-[11px] font-medium font-inter">{label}</span>
    </button>
  );
}
