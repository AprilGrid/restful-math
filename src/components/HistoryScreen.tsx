import { Trash2, Calendar, Tag, ChevronDown, BedDouble, Bed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculation } from '../types';

interface HistoryScreenProps {
  history: Calculation[];
  onDelete: (id: string) => void;
}

export default function HistoryScreen({ history, onDelete }: HistoryScreenProps) {
  const formatDate = (ts: number) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
    }).format(ts);
  };

  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('king')) return <BedDouble className="w-5 h-5" />;
    return <Bed className="w-5 h-5" />;
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold dark:text-white">Calculation History</h1>
        <p className="text-on-surface-variant dark:text-slate-400 mt-1">Review your recent mattress pricing scenarios.</p>
      </header>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant bg-surface-container-low/50 rounded-2xl border-2 border-dashed border-outline-variant/30">
          <div className="p-4 bg-surface-container rounded-full mb-4">
            <Calendar className="w-10 h-10 opacity-20" />
          </div>
          <p className="font-semibold">No calculations saved yet.</p>
          <p className="text-sm">Your math will appear here once saved.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-surface-container-lowest dark:bg-slate-900 rounded-xl p-6 cloud-shadow border border-outline-variant/30 dark:border-slate-800 relative overflow-hidden flex flex-col gap-4 group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-primary">
                    {getIcon(item.label)}
                    <span className="text-xs font-bold uppercase tracking-wider font-inter">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-on-surface-variant/70">{formatDate(item.timestamp)}</span>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-outline-variant hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-end mt-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 font-inter">Final Price</p>
                    <p className="text-3xl font-bold text-on-surface dark:text-white">
                      ₹{item.finalPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 font-inter">MRP</p>
                    <p className="text-lg text-outline-variant line-through font-medium">₹{item.mrp.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-primary/40" 
                    style={{ width: `${(1 - item.finalPrice / item.mrp) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-primary">Saved {((1 - item.finalPrice / item.mrp) * 100).toFixed(1)}%</span>
                  <div className="flex gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 bg-surface-container dark:bg-slate-800 px-2 py-1 rounded-full text-[10px] font-bold text-on-surface-variant/80 font-inter">
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <button className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-colors group">
            <ChevronDown className="w-6 h-6 text-outline group-hover:text-primary transition-colors" />
            <span className="text-sm font-semibold text-outline group-hover:text-primary mt-2">Load Older Calculations</span>
          </button>
        </div>
      )}
    </div>
  );
}
