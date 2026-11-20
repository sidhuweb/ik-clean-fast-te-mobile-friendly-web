import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Heart, 
  MessageCircle, 
  Send, 
  Copy, 
  Check, 
  Download,
  Share2
} from 'lucide-react';

export default function InteractivePreview({
  isOpen,
  onClose,
  generatedData,
  onToast
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!isOpen || !generatedData || !generatedData.slides) return null;

  const { client, handle, format, slides, colorScheme, fontPair, lighting } = generatedData;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  // Check if current lighting is dark or bright
  const isDark = colorScheme.textColor.toLowerCase().includes('fff') || lighting === 'dark' || lighting === 'busy';

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div>
            <span className="text-xs font-bold text-white font-poppins">
              Visual 4:5 Mobile Simulator
            </span>
            <span className="text-[10px] text-zinc-400 block">
              Slide {currentSlideIndex + 1} of {slides.length} • {client}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instagram Post Mockup (4:5 Aspect Ratio Container) */}
        <div className="p-3 overflow-y-auto">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
            {/* Instagram Post Header */}
            <div className="px-3 py-2 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-[10px] font-bold text-amber-400 font-mono">
                    {client.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">{client.toLowerCase()}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 text-black text-[7px] font-bold flex items-center justify-center">✓</span>
                  </div>
                  <span className="text-[9px] text-zinc-400 block leading-none">{handle}</span>
                </div>
              </div>

              {/* Slide Counter badge */}
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                {currentSlideIndex + 1}/{slides.length}
              </span>
            </div>

            {/* 4:5 Slide Canvas (Simulates 1080x1350 Canva canvas) */}
            <div 
              className={`relative aspect-[4/5] p-5 flex flex-col justify-between overflow-hidden select-none transition-colors duration-200 ${
                isDark ? 'bg-zinc-950 text-white' : 'bg-slate-100 text-slate-900'
              }`}
            >
              {/* Subtle background ambient glow / texture */}
              <div 
                className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: currentSlide.accentColor }}
              />

              {/* Top Tag & Swipe Cue */}
              <div className="flex items-center justify-between text-[11px] font-semibold opacity-75 relative z-10 font-mono">
                <span className="tracking-widest uppercase">
                  {currentSlide.role.split('•')[0] || 'SLIDE'}
                </span>
                <span>{currentSlideIndex + 1}/{slides.length} →</span>
              </div>

              {/* Center Content: Headline & Body */}
              <div className="my-auto space-y-3 relative z-10">
                {/* Headline / Hook */}
                <h3 
                  className="text-lg sm:text-xl font-bold leading-tight tracking-tight font-poppins"
                  style={{ color: currentSlide.textColor }}
                >
                  {currentSlide.hook}
                </h3>

                {/* Highlight Badge */}
                {currentSlide.highlightWords && (
                  <div className="inline-block">
                    <span 
                      className="px-2.5 py-1 rounded-md text-xs font-black tracking-wider uppercase shadow-sm"
                      style={{ 
                        backgroundColor: currentSlide.accentColor, 
                        color: '#09090B' 
                      }}
                    >
                      {currentSlide.highlightWords}
                    </span>
                  </div>
                )}

                {/* Body Text */}
                <p 
                  className={`text-xs leading-relaxed whitespace-pre-line font-dmsans ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  {currentSlide.body}
                </p>
              </div>

              {/* Bottom Canvas Footer: Coach Signature & CTA */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] opacity-75 relative z-10 font-mono">
                <span>{handle}</span>
                <span className="flex items-center gap-1 font-bold">
                  {currentSlideIndex === slides.length - 1 ? 'TAP LINK IN BIO' : 'SWIPE →'}
                </span>
              </div>
            </div>

            {/* Instagram Bottom Action Bar */}
            <div className="px-3 py-2 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-zinc-400">
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 hover:text-rose-500 cursor-pointer transition-colors" />
                <MessageCircle className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                <Send className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              </div>
              <div className="flex items-center gap-1">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlideIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlideIndex === i ? 'w-4 bg-amber-400' : 'w-1.5 bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <Bookmark className="w-4 h-4 hover:text-amber-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Controls: Prev & Next buttons */}
          <div className="flex items-center justify-between gap-3 mt-3">
            <button
              onClick={handlePrev}
              className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-zinc-800 flex items-center justify-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-xs font-bold text-black flex items-center justify-center gap-1 transition-colors shadow-sm"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
