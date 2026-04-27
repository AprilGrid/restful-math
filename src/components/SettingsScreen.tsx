import { Settings as SettingsType } from '../types';
import { Sun, Moon, CreditCard, Percent, Info, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface SettingsScreenProps {
  settings: SettingsType;
  onUpdate: (settings: SettingsType) => void;
}

export default function SettingsScreen({ settings, onUpdate }: SettingsScreenProps) {
  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold dark:text-white">Settings</h1>
        <p className="text-on-surface-variant dark:text-slate-400 mt-1">Configure your app preferences for a personalized experience.</p>
      </header>

      <div className="space-y-6">
        {/* Calculations Section */}
        <section className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-6 cloud-shadow border border-outline-variant/30 dark:border-slate-800 space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary flex items-center gap-2 font-inter">
            <Percent className="w-4 h-4" />
            Calculations
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-lg dark:text-white">Default GST Rate</p>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">Applied automatically to new calculator entries.</p>
            </div>
            <select
              value={settings.defaultGstRate}
              onChange={(e) => onUpdate({ ...settings, defaultGstRate: Number(e.target.value) })}
              className="bg-surface dark:bg-slate-800 border-outline-variant dark:border-slate-700 rounded-lg px-4 py-2 font-bold focus:ring-2 focus:ring-primary transition-all cursor-pointer"
            >
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>

          <div className="h-px bg-outline-variant/20" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-lg dark:text-white">Display Currency</p>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">Symbol used in price summaries and history.</p>
            </div>
            <select
              value={settings.currency}
              onChange={(e) => onUpdate({ ...settings, currency: e.target.value })}
              className="bg-surface dark:bg-slate-800 border-outline-variant dark:border-slate-700 rounded-lg px-4 py-2 font-bold focus:ring-2 focus:ring-primary transition-all cursor-pointer"
            >
              <option value="INR">₹ (INR)</option>
              <option value="USD">$ (USD)</option>
              <option value="EUR">€ (EUR)</option>
              <option value="GBP">£ (GBP)</option>
            </select>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-6 cloud-shadow border border-outline-variant/30 dark:border-slate-800 space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary flex items-center gap-2 font-inter">
            <Sun className="w-4 h-4" />
            Appearance
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-lg dark:text-white">App Theme</p>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">Adjust your interface lighting.</p>
            </div>
            <div className="flex bg-surface-container-low dark:bg-slate-800 p-1 rounded-xl w-fit border border-outline-variant/20">
              <button
                onClick={() => onUpdate({ ...settings, theme: 'light' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  settings.theme === 'light' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'
                }`}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button
                onClick={() => onUpdate({ ...settings, theme: 'dark' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  settings.theme === 'dark' ? 'bg-slate-700 shadow-sm text-primary-container' : 'text-on-surface-variant'
                }`}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-6 cloud-shadow border border-outline-variant/30 dark:border-slate-800 space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary flex items-center gap-2 font-inter">
            <Info className="w-4 h-4" />
            About the App
          </h2>

          <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/10 flex gap-4">
            <div className="p-3 bg-primary text-white rounded-full h-fit flex-shrink-0">
               <Moon className="w-6 h-6" />
            </div>
            <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed text-sm">
              Restful Math is designed to help you navigate complex mattress pricing structures with clarity and peace of mind. We believe a good night's sleep shouldn't start with a stressful purchase decision.
            </p>
          </div>

          <div className="space-y-4">
            <SettingsLink icon={<ShieldCheck />} label="Privacy Policy" />
            <SettingsLink icon={<FileText />} label="Terms of Service" />
            <div className="flex justify-between items-center py-2 px-2">
              <span className="font-semibold dark:text-white">Version</span>
              <span className="text-on-surface-variant text-sm font-medium">2.1.4 (Build 89)</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingsLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low transition-colors group">
      <div className="flex items-center gap-3 text-on-surface dark:text-white">
        <div className="text-outline-variant group-hover:text-primary transition-colors">
          {icon}
        </div>
        <span className="font-semibold">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-outline-variant group-hover:text-primary transition-all group-hover:translate-x-1" />
    </button>
  );
}
