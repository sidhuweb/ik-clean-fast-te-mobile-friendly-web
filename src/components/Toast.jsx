import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/30 bg-zinc-900/95 text-zinc-100',
    error: 'border-rose-500/30 bg-zinc-900/95 text-zinc-100',
    info: 'border-sky-500/30 bg-zinc-900/95 text-zinc-100'
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 flex justify-center pointer-events-none sm:bottom-6 sm:right-6 sm:left-auto">
      <div
        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md max-w-md w-full transition-all animate-in fade-in slide-in-from-bottom-4 duration-200 ${
          borderColors[toast.type || 'info']
        }`}
      >
        {icons[toast.type || 'info']}
        <div className="flex-1 text-sm font-medium leading-snug">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
