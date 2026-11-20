import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  Camera, 
  Palette, 
  FileText, 
  Sliders, 
  Check, 
  HelpCircle,
  Copy,
  Trash2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { 
  PHOTO_LIGHTING_OPTIONS, 
  MOOD_OPTIONS, 
  FORMAT_OPTIONS 
} from '../data/scheduleData';
import { SAMPLE_INPUTS } from '../data/templates';

export default function InputStudio({
  clients,
  selectedClient,
  setSelectedClient,
  selectedFormat,
  setSelectedFormat,
  rawInput,
  setRawInput,
  lighting,
  setLighting,
  mood,
  setMood,
  slideCount,
  setSlideCount,
  customAccent,
  setCustomAccent,
  onGenerate,
  onToast
}) {
  const isPawandeep = selectedClient.toLowerCase() === 'pawandeep';

  // Enforce Pawandeep strict rule
  useEffect(() => {
    if (isPawandeep && selectedFormat !== 'Single Slide Tweet') {
      setSelectedFormat('Single Slide Tweet');
      setSlideCount(1);
    }
  }, [isPawandeep, selectedFormat]);

  // Adjust default slide count when format changes
  const handleFormatChange = (newFormat) => {
    if (isPawandeep) {
      onToast({ type: 'info', message: 'Pawandeep policy: Single Slide Tweet is mandatory.' });
      return;
    }
    setSelectedFormat(newFormat);
    if (newFormat === 'Single Slide Tweet') {
      setSlideCount(1);
    } else if (newFormat === 'Testimonial Carousel') {
      if (slideCount > 4 || slideCount < 3) setSlideCount(4);
    } else {
      // Tweet Carousel
      if (slideCount < 4 || slideCount > 6) setSlideCount(5);
    }
  };

  // Load sample template for quick testing
  const handleLoadSample = (sample) => {
    setSelectedClient(sample.client);
    setSelectedFormat(sample.format);
    setRawInput(sample.rawText);
    setLighting(sample.lighting);
    setMood(sample.mood);
    setSlideCount(sample.slideCount);
    onToast({
      type: 'success',
      message: `Loaded template: ${sample.title}`
    });
  };

  return (
    <div className="space-y-5">
      {/* Top Banner / Studio Mode */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-4 rounded-2xl border border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <h2 className="text-base font-bold text-white font-poppins">
                Slide Studio & Canva Architect
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Zero-AI-slop copy engine • Strict 3-font system • Dynamic contrast & layout blueprint
            </p>
          </div>

          {/* Quick Sample Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] text-zinc-500 shrink-0 font-medium mr-1">
              Quick Samples:
            </span>
            {SAMPLE_INPUTS.slice(0, 4).map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleLoadSample(sample)}
                className="px-2 py-1 rounded-lg text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 shrink-0 transition-colors"
                title={sample.title}
              >
                {sample.client} ({sample.format.includes('Single') ? 'Single' : sample.format.includes('Testimonial') ? 'Testimonial' : 'Tweet'})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Input Form */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Left Column: Client, Format, Raw Copy */}
        <div className="space-y-4 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          {/* 1. Client Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-poppins">
              1. Select Fitness Coach
            </label>
            <div className="grid grid-cols-3 gap-2">
              {clients.map((c) => {
                const isSelected = selectedClient.toLowerCase() === c.name.toLowerCase();
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedClient(c.name)}
                    className={`p-2.5 rounded-xl border text-left transition-all touch-manipulation ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-white font-semibold shadow-sm'
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs truncate">{c.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    </div>
                    <span className="text-[10px] text-zinc-500 block truncate mt-0.5">
                      {c.name === 'Pawandeep' ? 'Single Tweet Only' : c.role.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Format Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-poppins">
                2. Choose Format
              </label>
              {isPawandeep && (
                <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20 font-medium">
                  <Lock className="w-3 h-3" />
                  Locked: Pawandeep Single Tweet
                </span>
              )}
            </div>

            <div className="grid gap-2">
              {FORMAT_OPTIONS.map((f) => {
                const isSelected = selectedFormat === f.id;
                const isDisabled = isPawandeep && f.id !== 'Single Slide Tweet';

                return (
                  <button
                    key={f.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleFormatChange(f.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                      isDisabled
                        ? 'opacity-40 cursor-not-allowed bg-zinc-950/40 border-zinc-900'
                        : isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-poppins">{f.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                          {f.slides}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Raw Input Box */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-poppins">
                3. Raw Notes / Transcript / Testimonial
              </label>
              {rawInput && (
                <button
                  type="button"
                  onClick={() => setRawInput('')}
                  className="text-[11px] text-zinc-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Paste coach's video transcript, WhatsApp testimonial screenshot text, voice note summary, or rough workout/nutrition bullet points here..."
              rows={7}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed resize-none font-mono"
            />
            <div className="flex items-center justify-between mt-1 text-[11px] text-zinc-500">
              <span>{rawInput.length} characters</span>
              <span>Human fitness voice • Clichés auto-filtered</span>
            </div>
          </div>
        </div>

        {/* Right Column: Photo Lighting, Mood, Colors, Slide Count */}
        <div className="space-y-4 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          {/* 4. Photo Lighting & Backdrop */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-poppins">
              4. Photo Lighting & Background Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PHOTO_LIGHTING_OPTIONS.map((item) => {
                const isSelected = lighting === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLighting(item.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold truncate">{item.name.split('/')[0]}</span>
                      {/* Color Preview Swatch */}
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm shrink-0" 
                        style={{ backgroundColor: item.accentColor }} 
                        title={`Accent: ${item.accentColor}`}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 block leading-tight">
                      Text: {item.textName.split(' ')[0]} • Accent: {item.accentName.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Moodboard & Typography Aesthetic */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-poppins">
              5. Moodboard & Font System (Strict 3 Fonts)
            </label>
            <div className="grid gap-2">
              {MOOD_OPTIONS.map((item) => {
                const isSelected = mood === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMood(item.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                        : 'bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold font-poppins">{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-mono">
                        {item.fontPairing}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {item.style}
                    </p>
                  </button>
                );
              })}
            </div>
            <div className="mt-2 text-[11px] text-zinc-400 bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-800/80">
              <span className="text-amber-400 font-semibold">Strict Rule Applied:</span> Fonts strictly suggested from <strong className="text-zinc-200">Advercase Demo</strong>, <strong className="text-zinc-200">Poppins</strong>, and <strong className="text-zinc-200">DM Sans</strong>. No random fonts.
            </div>
          </div>

          {/* 6. Slide Count Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-poppins">
                6. Slide Count
              </label>
              <span className="text-xs text-amber-400 font-bold font-mono">
                {slideCount} {slideCount === 1 ? 'Slide' : 'Slides'}
              </span>
            </div>

            {selectedFormat === 'Single Slide Tweet' ? (
              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
                <span>Single Slide format (Locked)</span>
                <span className="text-amber-400 font-bold">1 Slide</span>
              </div>
            ) : selectedFormat === 'Testimonial Carousel' ? (
              <div className="grid grid-cols-2 gap-2">
                {[3, 4].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setSlideCount(cnt)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      slideCount === cnt
                        ? 'bg-amber-400 text-black border-amber-400 shadow-sm'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {cnt} Slides {cnt === 4 ? '(Recommended)' : '(Compact)'}
                  </button>
                ))}
              </div>
            ) : (
              // Tweet Carousel 4-6 slides
              <div className="grid grid-cols-3 gap-2">
                {[4, 5, 6].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setSlideCount(cnt)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      slideCount === cnt
                        ? 'bg-amber-400 text-black border-amber-400 shadow-sm'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {cnt} Slides {cnt === 5 ? '★' : ''}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 7. Optional Custom Accent Color Override */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-poppins">
              7. Highlight Accent Color (Auto or Custom)
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2">
                <input
                  type="color"
                  value={customAccent || '#CCFF00'}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer"
                  title="Pick custom accent color"
                />
                <input
                  type="text"
                  value={customAccent || ''}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  placeholder="Auto-suggested from photo lighting"
                  className="bg-transparent text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none w-full font-mono uppercase"
                />
              </div>
              {customAccent && (
                <button
                  type="button"
                  onClick={() => setCustomAccent('')}
                  className="px-2.5 py-2 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800 rounded-xl border border-zinc-700"
                >
                  Reset
                </button>
              )}
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">
              Leave blank to automatically use optimal high-contrast accent for your photo type.
            </p>
          </div>
        </div>
      </div>

      {/* Main Generate Action Bar */}
      <div className="sticky bottom-4 z-30 pt-2">
        <button
          type="button"
          onClick={onGenerate}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black font-bold text-sm sm:text-base shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.99] touch-manipulation font-poppins"
        >
          <Sparkles className="w-5 h-5 text-black stroke-[2.5]" />
          <span>Generate Slides & Canva Blueprint</span>
          <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
