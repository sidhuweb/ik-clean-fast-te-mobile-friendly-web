import React from 'react';
import { Sparkles, Calendar, Layers, Download, Users, CheckCircle2 } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  completedCount, 
  totalSlots,
  onOpenClientManager,
  onOpenCanvaGuide
}) {
  const currentDayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  const navItems = [
    { id: 'schedule', label: 'Weekly Desk', icon: Calendar, badge: `${completedCount}/${totalSlots}` },
    { id: 'studio', label: 'Slide Studio', icon: Layers },
    { id: 'export', label: 'Canva Bulk Hub', icon: Download },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 px-4 pt-safe-top">
      <div className="max-w-5xl mx-auto py-3">
        {/* Top brand row */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-300 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5 font-poppins">
                  Carousel & Weekly Desk
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  Canva Pro Lite
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-none">
                Fitness Coach Carousel Engine • <span className="text-zinc-300 font-medium">{currentDayName}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCanvaGuide}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex items-center gap-1.5"
              title="How to Bulk Create in Canva"
            >
              <span className="hidden xs:inline">Canva Guide</span>
              <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center">?</span>
            </button>

            <button
              onClick={onOpenClientManager}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex items-center gap-1.5"
              title="Manage Clients & Statuses"
            >
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Clients</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar - Optimized for iOS thumb reach */}
        <nav className="flex items-center gap-1.5 p-1 bg-zinc-900/90 rounded-xl border border-zinc-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-center gap-1.5 touch-manipulation active:scale-[0.98] ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
