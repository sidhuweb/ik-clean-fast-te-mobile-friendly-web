import React from 'react';
import { X, CheckCircle2, Download, Layers, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

export default function CanvaGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const steps = [
    {
      num: '1',
      title: 'Download CSV from this App',
      desc: 'Generate your slides in Slide Studio and click "Download Canva CSV" (or copy to clipboard).'
    },
    {
      num: '2',
      title: 'Open Canva Template (1080x1350)',
      desc: 'In Canva Pro Lite or Canva Pro, open your base carousel template in 4:5 portrait (1080 x 1350 px).'
    },
    {
      num: '3',
      title: 'Open "Apps" → Search "Bulk Create"',
      desc: 'In the left sidebar of Canva, click on "Apps", search for "Bulk Create" and click "Enter data manually" or "Upload CSV".'
    },
    {
      num: '4',
      title: 'Connect Text Boxes to Data Fields',
      desc: 'Right-click your headline text box in Canva → Select "Connect Data" → Click "Header_Hook". Do the same for body copy with "Body_Text" and highlight words with "Highlight_Words".'
    },
    {
      num: '5',
      title: 'Click "Generate Pages"',
      desc: 'Canva will automatically duplicate the template and create all 4-6 finished carousel slides in seconds!'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-5 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-poppins">
                Canva Pro Lite 30-Second Workflow
              </h3>
              <p className="text-[11px] text-zinc-400">
                Bulk Create Carousels without manual copy-pasting
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Steps List */}
        <div className="py-4 space-y-3.5 overflow-y-auto pr-1">
          {steps.map((s) => (
            <div key={s.num} className="flex items-start gap-3 bg-zinc-900/60 p-3 rounded-2xl border border-zinc-800/80">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-black text-xs font-black flex items-center justify-center shrink-0 mt-0.5 font-mono">
                {s.num}
              </span>
              <div>
                <h4 className="text-xs font-bold text-white font-poppins">
                  {s.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Canva Fonts Pro-Tip */}
          <div className="bg-amber-400/10 border border-amber-400/20 rounded-2xl p-3.5">
            <h5 className="text-xs font-bold text-amber-300 font-poppins flex items-center gap-1.5 mb-1">
              <span>🎯 Strict Font Rules Reminder:</span>
            </h5>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              In Canva Pro Lite, search for and apply only these 3 fonts to match the high-ticket athletic aesthetic:
            </p>
            <div className="grid grid-cols-3 gap-1.5 mt-2 text-[10px] text-center font-bold">
              <span className="bg-zinc-950 px-2 py-1.5 rounded-lg border border-amber-400/30 text-amber-300">
                Advercase Demo
              </span>
              <span className="bg-zinc-950 px-2 py-1.5 rounded-lg border border-amber-400/30 text-amber-300">
                Poppins Bold
              </span>
              <span className="bg-zinc-950 px-2 py-1.5 rounded-lg border border-amber-400/30 text-amber-300">
                DM Sans
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-colors"
          >
            Got It, Let's Design
          </button>
        </div>
      </div>
    </div>
  );
}
