import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  Check, 
  Clock, 
  Sparkles, 
  Filter, 
  ChevronDown,
  Layers,
  Award,
  MessageSquareText,
  FileText
} from 'lucide-react';
import { STATUS_CONFIG } from '../data/scheduleData';

export const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WeeklySchedule({
  schedule,
  clientStatuses,
  onUpdateClientStatus,
  completedSlots,
  onToggleCompleteSlot,
  onLoadSlotIntoStudio,
  onSelectClient
}) {
  const currentDayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  const [selectedDayFilter, setSelectedDayFilter] = useState('ALL'); // 'ALL' or specific day
  const [statusDropdownSlotId, setStatusDropdownSlotId] = useState(null);

  // Filter schedule days
  const filteredSchedule = selectedDayFilter === 'ALL'
    ? schedule
    : schedule.filter(d => d.day === selectedDayFilter);

  const getFormatIcon = (format) => {
    if (format.includes('Testimonial')) return <Award className="w-3.5 h-3.5 text-amber-400" />;
    if (format.includes('Single')) return <FileText className="w-3.5 h-3.5 text-rose-400" />;
    return <MessageSquareText className="w-3.5 h-3.5 text-sky-400" />;
  };

  return (
    <div className="space-y-4">
      {/* Schedule Top Bar with Day Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/60 p-3.5 rounded-2xl border border-zinc-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2 font-poppins">
            <Calendar className="w-4 h-4 text-amber-400" />
            Weekly Content Desk
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Click any client card to immediately load into Slide Studio
          </p>
        </div>

        {/* Day Pills / Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedDayFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors ${
              selectedDayFilter === 'ALL'
                ? 'bg-amber-400 text-black font-semibold'
                : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            All Week
          </button>
          {ALL_DAYS.map(day => {
            const isToday = day.toLowerCase() === currentDayName.toLowerCase();
            const isSelected = selectedDayFilter === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDayFilter(day)}
                className={`px-2 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-400 text-black font-semibold'
                    : isToday
                    ? 'bg-zinc-800 text-amber-400 border border-amber-400/30'
                    : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>{day.slice(0, 3)}</span>
                {isToday && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Days Grid / List */}
      <div className="space-y-3">
        {filteredSchedule.map((dayGroup) => {
          const isToday = dayGroup.day.toLowerCase() === currentDayName.toLowerCase();
          const daySlots = dayGroup.slots || [];

          return (
            <div 
              key={dayGroup.day}
              className={`rounded-2xl border transition-all ${
                isToday 
                  ? 'bg-zinc-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5' 
                  : 'bg-zinc-900/40 border-zinc-800/80'
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold tracking-wide font-poppins ${
                    isToday ? 'text-amber-400' : 'text-zinc-200'
                  }`}>
                    {dayGroup.day}
                  </span>
                  {isToday && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-400 text-black uppercase tracking-wider">
                      Today
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-zinc-500 font-medium">
                  {daySlots.length} {daySlots.length === 1 ? 'Design' : 'Designs'}
                </span>
              </div>

              {/* Day Slots List */}
              <div className="p-2.5 sm:p-3 grid gap-2">
                {daySlots.map((slot) => {
                  const currentStatus = clientStatuses[slot.client] || slot.status || 'Active';
                  const statusConf = STATUS_CONFIG[currentStatus] || STATUS_CONFIG['Active'];
                  const isCompleted = !!completedSlots[slot.id];

                  return (
                    <div
                      key={slot.id}
                      className={`group relative rounded-xl border p-3 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCompleted
                          ? 'bg-zinc-950/60 border-zinc-800/50 opacity-70'
                          : 'bg-zinc-950/90 hover:bg-zinc-900 border-zinc-800 hover:border-zinc-700 shadow-sm'
                      }`}
                    >
                      {/* Left: Client info + format */}
                      <div 
                        onClick={() => onLoadSlotIntoStudio(slot)}
                        className="flex-1 cursor-pointer flex items-start gap-3 touch-manipulation"
                      >
                        {/* Completion Checkbox */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompleteSlot(slot.id);
                          }}
                          className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                            isCompleted
                              ? 'bg-emerald-500 border-emerald-400 text-black'
                              : 'border-zinc-700 hover:border-zinc-500 text-transparent hover:text-zinc-500 bg-zinc-900'
                          }`}
                          title={isCompleted ? "Mark incomplete" : "Mark as created in Canva"}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-semibold text-sm sm:text-base tracking-tight font-poppins ${
                              isCompleted ? 'line-through text-zinc-400' : 'text-white'
                            }`}>
                              {slot.client}
                            </span>

                            {/* Format Badge */}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-900 border border-zinc-700/80 text-zinc-300">
                              {getFormatIcon(slot.format)}
                              <span>{slot.format}</span>
                            </span>

                            {slot.client === 'Pawandeep' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium">
                                1 Slide Only
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-zinc-400">
                            {slot.timing && (
                              <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                                <Clock className="w-3 h-3 text-zinc-500" />
                                {slot.timing}
                              </span>
                            )}
                            <span className="text-[11px] text-zinc-500">
                              Target: {slot.recommendedSlides} {slot.recommendedSlides === 1 ? 'slide' : 'slides'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Status selector & Load CTA */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                        {/* Status Tag Dropdown */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setStatusDropdownSlotId(statusDropdownSlotId === slot.id ? null : slot.id);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-medium border flex items-center gap-1.5 transition-colors ${statusConf.bg} ${statusConf.text} ${statusConf.border}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConf.dot}`} />
                            <span>{currentStatus}</span>
                            <ChevronDown className="w-3 h-3 opacity-60" />
                          </button>

                          {/* Dropdown Menu */}
                          {statusDropdownSlotId === slot.id && (
                            <div className="absolute left-0 sm:left-auto sm:right-0 mt-1 w-36 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl z-30 py-1 overflow-hidden animate-in fade-in duration-150">
                              {['Active', 'On Hold', 'Not Started'].map((statusOption) => {
                                const optConf = STATUS_CONFIG[statusOption];
                                return (
                                  <button
                                    key={statusOption}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onUpdateClientStatus(slot.client, statusOption);
                                      setStatusDropdownSlotId(null);
                                    }}
                                    className={`w-full px-3 py-1.5 text-xs text-left flex items-center gap-2 hover:bg-zinc-800 transition-colors ${
                                      currentStatus === statusOption ? 'text-white font-semibold bg-zinc-800/50' : 'text-zinc-300'
                                    }`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full ${optConf.dot}`} />
                                    <span>{statusOption}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Direct Load CTA button */}
                        <button
                          type="button"
                          onClick={() => onLoadSlotIntoStudio(slot)}
                          className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold flex items-center gap-1 transition-transform active:scale-95 shadow-sm"
                        >
                          <span>Load Studio</span>
                          <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
