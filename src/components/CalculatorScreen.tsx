import { useState, useEffect } from 'react';
import { Save, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { Calculation, Settings } from '../types';

interface CalculatorScreenProps {
  onSave: (calc: Calculation) => void;
  settings: Settings;
}

export default function CalculatorScreen({ onSave, settings }: CalculatorScreenProps) {
  const [mrp, setMrp] = useState<number>(45000);
  const [discountPercent, setDiscountPercent] = useState<number>(25);
  const [includeGst, setIncludeGst] = useState<boolean>(true);
  const [label, setLabel] = useState<string>('King Size • Firm');
  
  // Derived values
  const subtotal = mrp * (1 - discountPercent / 100);
  const gstAmount = includeGst ? subtotal * (settings.defaultGstRate / 100) : 0;
  const finalPrice = subtotal + gstAmount;
  const totalSavings = mrp - finalPrice;
  const savingsPercent = (totalSavings / mrp) * 100;

  const handleSave = () => {
    const newCalc: Calculation = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      label,
      mrp,
      discountPercent,
      includeGst,
      finalPrice,
      tags: discountPercent >= 25 ? ['Big Sale'] : [],
    };
    onSave(newCalc);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: settings.currency,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="flex flex-col gap-6">
        <header>
          <h1 className="text-3xl font-bold text-on-surface dark:text-white">Sleep on a great deal.</h1>
          <p className="text-on-surface-variant dark:text-slate-400 mt-1">Calculate your exact savings before you buy.</p>
        </header>

        <section className="bg-surface-container-lowest dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-outline-variant/30 dark:border-slate-800 flex flex-col gap-6">
          {/* Label Input */}
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 block font-inter">Item Description</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-surface dark:bg-slate-800 border-outline-variant dark:border-slate-700 rounded-lg p-3 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="e.g. King Size • Firm"
            />
          </div>

          {/* MRP Input */}
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 block font-inter">Maximum Retail Price (MRP)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-on-surface-variant opacity-50">₹</span>
              <input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(Number(e.target.value))}
                className="w-full bg-surface dark:bg-slate-800 border-outline-variant dark:border-slate-700 rounded-lg py-4 pl-12 pr-4 text-3xl font-bold text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Discount Slider */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant font-inter">Discount Percentage</label>
              <span className="text-3xl font-bold text-primary">{Math.round(discountPercent)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full h-2 bg-surface dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {[10, 25, 40, 50].map((val) => (
                <button
                  key={val}
                  onClick={() => setDiscountPercent(val)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    discountPercent === val
                      ? 'bg-primary text-white'
                      : 'bg-surface-container text-on-surface-variant hover:bg-primary/10'
                  }`}
                >
                  {val === 10 ? 'Seasonal 10%' : val === 25 ? 'Flash Sale 25%' : val === 40 ? 'Clearance 40%' : `${val}% Off`}
                </button>
              ))}
            </div>
          </div>

          {/* GST Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
            <div>
              <p className="font-semibold text-on-surface dark:text-white">Include {settings.defaultGstRate}% GST</p>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">Required for final billing</p>
            </div>
            <button
              onClick={() => setIncludeGst(!includeGst)}
              className={`w-14 h-8 rounded-full transition-all relative ${
                includeGst ? 'bg-primary' : 'bg-outline-variant dark:bg-slate-700'
              }`}
            >
              <motion.div
                animate={{ x: includeGst ? 28 : 4 }}
                className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-sm"
              />
            </button>
          </div>
        </section>
      </div>

      {/* Results Section */}
      <div className="flex flex-col gap-6">
        <section className="bg-gradient-to-br from-surface-container-lowest to-surface-container-low dark:from-slate-900 dark:to-slate-800 p-8 rounded-xl cloud-shadow-lg border border-primary/10 flex flex-col h-full">
          <h2 className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-8 font-inter">Transaction Summary</h2>
          
          <div className="space-y-4 flex-1">
            <div className="flex justify-between">
              <span className="text-on-surface-variant dark:text-slate-400">Original Price (MRP)</span>
              <span className="font-semibold">{formatCurrency(mrp)}</span>
            </div>
            <div className="flex justify-between text-primary">
              <span className="">Discount ({discountPercent.toFixed(1)}%)</span>
              <span className="font-bold">- {formatCurrency(mrp - subtotal)}</span>
            </div>
            <div className="h-px bg-outline-variant/30 my-4" />
            <div className="flex justify-between">
              <span className="text-on-surface-variant dark:text-slate-400">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            {includeGst && (
              <div className="flex justify-between">
                <span className="text-on-surface-variant dark:text-slate-400">GST ({settings.defaultGstRate}%)</span>
                <span>{formatCurrency(gstAmount)}</span>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t-2 border-primary/20">
            <p className="text-xs uppercase tracking-widest font-bold text-primary mb-1 font-inter">Final Payable Amount</p>
            <h3 className="text-5xl font-extrabold tracking-tight text-on-surface dark:text-white">
              {formatCurrency(finalPrice)}
            </h3>
          </div>

          <div className="mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-on-surface-variant">Potential Savings</span>
              <span className="text-primary font-bold">{formatCurrency(totalSavings)} saved</span>
            </div>
            <div className="h-3 bg-surface-container dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(savingsPercent, 100)}%` }}
                className="h-full bg-primary"
              />
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              <Save className="w-5 h-5" />
              Save Scenario
            </button>
            <button
              onClick={() => { setMrp(45000); setDiscountPercent(25); }}
              className="p-4 bg-surface dark:bg-slate-700 text-on-surface-variant dark:text-slate-200 rounded-xl hover:bg-surface-container active:rotate-180 transition-all duration-300"
            >
              <RefreshCcw className="w-6 h-6" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
