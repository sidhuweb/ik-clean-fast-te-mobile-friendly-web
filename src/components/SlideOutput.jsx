import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  Eye, 
  Sparkles, 
  Type, 
  Palette, 
  Layers, 
  Share2, 
  FileSpreadsheet, 
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { downloadCanvaCsv, generateCanvaCsv, formatSlidesAsPlainText } from '../utils/csvExporter';

export default function SlideOutput({
  generatedData,
  onUpdateSlide,
  onOpenPreview,
  onOpenCanvaGuide,
  onToast
}) {
  const [copiedSlideIndex, setCopiedSlideIndex] = useState(null);
  const [copiedCsv, setCopiedCsv] = useState(false);
  const [copiedAllText, setCopiedAllText] = useState(false);
  const [copiedColor, setCopiedColor] = useState(null);

  if (!generatedData || !generatedData.slides || generatedData.slides.length === 0) {
    return null;
  }

  const { client, format, slides, fontPair, colorScheme } = generatedData;

  // 1-Click copy single slide text
  const handleCopySlideText = (slide, index) => {
    const formatted = `[SLIDE ${slide.slideNumber} • ${slide.role}]\n\nHEADLINE:\n${slide.hook}\n\nBODY:\n${slide.body}\n\nHIGHLIGHT WORD(S):\n${slide.highlightWords}\n\nCANVA NOTES:\n${slide.layoutBlueprint}`;
    navigator.clipboard.writeText(formatted);
    setCopiedSlideIndex(index);
    onToast({
      type: 'success',
      message: `Slide ${slide.slideNumber} text copied to clipboard!`
    });
    setTimeout(() => setCopiedSlideIndex(null), 2000);
  };

  // 1-Click copy color hex
  const handleCopyHex = (hex, label) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    onToast({
      type: 'success',
      message: `${label} (${hex}) copied to clipboard!`
    });
    setTimeout(() => setCopiedColor(null), 1500);
  };

  // 1-Click copy CSV to clipboard
  const handleCopyCsv = () => {
    const csv = generateCanvaCsv(slides, client);
    navigator.clipboard.writeText(csv);
    setCopiedCsv(true);
    onToast({
      type: 'success',
      message: 'Canva Bulk Create CSV copied to clipboard!'
    });
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  // 1-Click copy all slides as plain text
  const handleCopyAllText = () => {
    const text = formatSlidesAsPlainText(slides, client, format);
    navigator.clipboard.writeText(text);
    setCopiedAllText(true);
    onToast({
      type: 'success',
      message: 'All slides copied as plain text for client review!'
    });
    setTimeout(() => setCopiedAllText(false), 2000);
  };

  // Download CSV
  const handleDownloadCsv = () => {
    downloadCanvaCsv(slides, client, format);
    onToast({
      type: 'success',
      message: `Downloaded CanvaBulk_${client}.csv!`
    });
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Overview & Quick Actions Bar */}
      <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-bold uppercase tracking-wider">
                {client}
              </span>
              <span className="text-xs text-zinc-300 font-semibold">
                {format}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                • {slides.length} {slides.length === 1 ? 'Slide' : 'Slides'} Generated
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Fonts: <strong className="text-white">{fontPair.hookFont}</strong> + <strong className="text-white">{fontPair.bodyFont}</strong> • Base Text: <code className="text-amber-400">{colorScheme.textColor}</code> • Highlight: <code className="text-amber-400">{colorScheme.accentColor}</code>
            </p>
          </div>

          {/* Action Buttons: Visual Preview & Canva CSV */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onOpenPreview}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-zinc-700 transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Visual 4:5 Preview</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadCsv}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-amber-400/10"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download Canva CSV</span>
            </button>
          </div>
        </div>

        {/* Secondary Bulk Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-800 flex-wrap">
          <button
            type="button"
            onClick={handleCopyCsv}
            className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-800 flex items-center gap-1.5 transition-colors"
          >
            {copiedCsv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileSpreadsheet className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copiedCsv ? 'CSV Copied!' : 'Copy Canva CSV'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyAllText}
            className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-800 flex items-center gap-1.5 transition-colors"
          >
            {copiedAllText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copiedAllText ? 'All Text Copied!' : 'Copy All Slides Text'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenCanvaGuide}
            className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4 ml-auto flex items-center gap-1"
          >
            <span>Canva Pro Bulk Guide</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Slide Cards Stack */}
      <div className="space-y-4">
        {slides.map((slide, index) => {
          const isCopied = copiedSlideIndex === index;

          return (
            <div 
              key={slide.slideNumber}
              className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg transition-all hover:border-zinc-700"
            >
              {/* Card Header */}
              <div className="bg-zinc-950/80 px-4 py-3 border-b border-zinc-800 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-400 text-black text-xs font-extrabold flex items-center justify-center font-mono">
                    {slide.slideNumber}
                  </span>
                  <span className="text-xs font-bold text-white font-poppins">
                    {slide.role}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopySlideText(slide, index)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 hover:text-white flex items-center gap-1.5 border border-zinc-700 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy Slide</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card Body - Content & Controls */}
              <div className="p-4 space-y-4">
                {/* 1. Editable Headline / Hook */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1 font-poppins">
                      <Type className="w-3 h-3 text-amber-400" />
                      Headline / Hook (Canva Headline Box)
                    </label>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Font: {slide.fontPairing.split('•')[0] || fontPair.hookFont}
                    </span>
                  </div>
                  <textarea
                    value={slide.hook}
                    onChange={(e) => onUpdateSlide(index, 'hook', e.target.value)}
                    rows={2}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white font-medium focus:outline-none focus:border-amber-400 transition-colors leading-snug resize-none font-poppins"
                    placeholder="Enter slide hook..."
                  />
                </div>

                {/* 2. Editable Body Content */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1 font-poppins">
                      <Layers className="w-3 h-3 text-sky-400" />
                      Body Content / Bullet Points / Proof
                    </label>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Font: {fontPair.bodyFont}
                    </span>
                  </div>
                  <textarea
                    value={slide.body}
                    onChange={(e) => onUpdateSlide(index, 'body', e.target.value)}
                    rows={3}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed resize-none font-mono"
                    placeholder="Enter slide body copy..."
                  />
                </div>

                {/* 3. Highlight Words & Visual Accent Preview */}
                <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Palette className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider font-poppins">
                        Highlight Words (1-2 Words)
                      </span>
                    </div>
                    <input
                      type="text"
                      value={slide.highlightWords}
                      onChange={(e) => onUpdateSlide(index, 'highlightWords', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold tracking-wide focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Visual Accent Badge Preview */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-zinc-500">Preview:</span>
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-black tracking-wider uppercase shadow-sm border border-black/30"
                      style={{
                        backgroundColor: slide.accentColor,
                        color: '#09090B'
                      }}
                    >
                      {slide.highlightWords || 'PREVIEW'}
                    </span>
                  </div>
                </div>

                {/* 4. Font & Color Recommendation Chips */}
                <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
                  {/* Font pairing chip */}
                  <div className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center gap-1.5 text-[11px]">
                    <span className="text-zinc-500 font-medium">Font:</span>
                    <span className="font-semibold text-white">{slide.fontPairing}</span>
                  </div>

                  {/* Text Color Chip */}
                  <button
                    type="button"
                    onClick={() => handleCopyHex(slide.textColor, 'Text Color')}
                    className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 flex items-center gap-1.5 text-[11px] transition-colors"
                    title="Click to copy Hex code"
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-zinc-600 shrink-0" 
                      style={{ backgroundColor: slide.textColor }} 
                    />
                    <span className="text-zinc-500">Text:</span>
                    <code className="text-white font-mono">{slide.textColor}</code>
                    <Copy className="w-2.5 h-2.5 text-zinc-500 ml-0.5" />
                  </button>

                  {/* Accent Color Chip */}
                  <button
                    type="button"
                    onClick={() => handleCopyHex(slide.accentColor, 'Accent Color')}
                    className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 flex items-center gap-1.5 text-[11px] transition-colors"
                    title="Click to copy Hex code"
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-black/50 shrink-0 shadow-sm" 
                      style={{ backgroundColor: slide.accentColor }} 
                    />
                    <span className="text-zinc-500">Accent:</span>
                    <code className="text-amber-400 font-mono font-bold">{slide.accentColor}</code>
                    <Copy className="w-2.5 h-2.5 text-zinc-500 ml-0.5" />
                  </button>
                </div>

                {/* 5. Canva Layout Blueprint Guide */}
                <div className="bg-zinc-950/90 rounded-xl p-3 border border-zinc-800/90 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1 text-[11px] font-poppins">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Canva Pro Lite Blueprint:</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-[11px]">
                    {slide.layoutBlueprint}
                  </p>
                  {slide.canvaTip && (
                    <p className="text-zinc-500 text-[10px] mt-1.5 italic border-t border-zinc-900 pt-1">
                      💡 Pro Tip: {slide.canvaTip}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
