import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  FileSpreadsheet, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  Eye, 
  Share2,
  Table,
  Code
} from 'lucide-react';
import { generateCanvaCsv, downloadCanvaCsv, formatSlidesAsPlainText } from '../utils/csvExporter';

export default function BulkHub({
  generatedData,
  onOpenCanvaGuide,
  onOpenPreview,
  onToast
}) {
  const [copiedCsv, setCopiedCsv] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'raw'

  if (!generatedData || !generatedData.slides || generatedData.slides.length === 0) {
    return (
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mx-auto flex items-center justify-center">
          <FileSpreadsheet className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white font-poppins">
            No Active Carousel in Studio
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1 leading-relaxed">
            Pick a client from the Weekly Desk or generate slides in the Slide Studio to export Canva Bulk Create CSV files.
          </p>
        </div>
      </div>
    );
  }

  const { client, format, slides, fontPair, colorScheme } = generatedData;
  const rawCsv = generateCanvaCsv(slides, client);

  const handleCopyCsv = () => {
    navigator.clipboard.writeText(rawCsv);
    setCopiedCsv(true);
    onToast({
      type: 'success',
      message: 'Canva Bulk Create CSV copied to clipboard!'
    });
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  const handleCopyText = () => {
    const text = formatSlidesAsPlainText(slides, client, format);
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    onToast({
      type: 'success',
      message: 'Plain text copied for WhatsApp/DM review!'
    });
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownload = () => {
    downloadCanvaCsv(slides, client, format);
    onToast({
      type: 'success',
      message: `Downloaded CanvaBulk_${client}.csv!`
    });
  };

  return (
    <div className="space-y-5">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-4 sm:p-5 rounded-2xl border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-black uppercase tracking-wider">
                {client}
              </span>
              <span className="text-xs text-zinc-300 font-semibold">{format}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1 font-poppins">
              Canva Bulk Create Central
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Upload this RFC-4180 CSV directly to Canva Pro Lite to auto-generate all {slides.length} slides.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-400/10 transition-all active:scale-95"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download .CSV File</span>
            </button>

            <button
              onClick={handleCopyCsv}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center gap-2 border border-zinc-700 transition-colors"
            >
              {copiedCsv ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
              <span>{copiedCsv ? 'Copied CSV!' : 'Copy CSV Text'}</span>
            </button>
          </div>
        </div>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800/80 text-xs">
          <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-500 block uppercase font-mono">Hook Font</span>
            <span className="font-bold text-white font-poppins">{fontPair.hookFont}</span>
          </div>
          <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-500 block uppercase font-mono">Body Font</span>
            <span className="font-bold text-white font-poppins">{fontPair.bodyFont}</span>
          </div>
          <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-500 block uppercase font-mono">Text Color</span>
            <span className="font-bold text-amber-400 font-mono">{colorScheme.textColor}</span>
          </div>
          <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-500 block uppercase font-mono">Accent Color</span>
            <span className="font-bold text-amber-400 font-mono">{colorScheme.accentColor}</span>
          </div>
        </div>
      </div>

      {/* Canva CSV Inspector & Data Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
        {/* Table / Raw View Switcher */}
        <div className="px-4 py-3 bg-zinc-950/90 border-b border-zinc-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white font-poppins">
              CSV Data Mapping ({slides.length} Rows)
            </span>
            <span className="text-[10px] text-zinc-500 hidden sm:inline">
              Matches Canva Connect Data columns
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center p-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  viewMode === 'table' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Table className="w-3 h-3" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  viewMode === 'raw' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Code className="w-3 h-3" />
                <span>Raw CSV</span>
              </button>
            </div>

            <button
              onClick={handleCopyText}
              className="text-xs px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors flex items-center gap-1"
              title="Copy formatted summary for WhatsApp"
            >
              {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3 text-zinc-400" />}
              <span className="hidden sm:inline">{copiedText ? 'Copied' : 'Client Copy'}</span>
            </button>
          </div>
        </div>

        {/* View Mode Content */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-950/70 border-b border-zinc-800 text-[11px] text-zinc-400 font-mono">
                  <th className="p-3 w-16">#</th>
                  <th className="p-3 min-w-[140px]">Header_Hook</th>
                  <th className="p-3 min-w-[200px]">Body_Text</th>
                  <th className="p-3 min-w-[120px]">Highlight_Words</th>
                  <th className="p-3 min-w-[140px]">Font_Pairing</th>
                  <th className="p-3 min-w-[160px]">Canva_Layout_Blueprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono text-[11px]">
                {slides.map((s) => (
                  <tr key={s.slideNumber} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-3 text-amber-400 font-bold">{s.slideNumber}</td>
                    <td className="p-3 text-white font-sans font-medium line-clamp-2">{s.hook}</td>
                    <td className="p-3 text-zinc-300 font-sans line-clamp-2">{s.body}</td>
                    <td className="p-3">
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{ backgroundColor: s.accentColor, color: '#09090b' }}
                      >
                        {s.highlightWords}
                      </span>
                    </td>
                    <td className="p-3 text-zinc-400 font-sans">{s.fontPairing}</td>
                    <td className="p-3 text-zinc-400 font-sans text-[10px] leading-snug line-clamp-2">
                      {s.layoutBlueprint}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-3">
            <textarea
              readOnly
              value={rawCsv}
              rows={10}
              className="w-full bg-zinc-950 text-amber-300 font-mono text-xs p-3 rounded-xl border border-zinc-800 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* Workflow Reminder Bar */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <span className="font-bold text-white font-poppins">
            Need help importing into Canva?
          </span>
          <p className="text-zinc-400 text-[11px]">
            Follow the 30-second Bulk Create guide to auto-populate your 1080x1350 Canva template.
          </p>
        </div>
        <button
          onClick={onOpenCanvaGuide}
          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-semibold flex items-center gap-1.5 transition-colors shrink-0 text-xs"
        >
          <span>View 5-Step Canva Guide</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
