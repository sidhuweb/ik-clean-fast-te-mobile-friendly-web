import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WeeklySchedule from './components/WeeklySchedule';
import InputStudio from './components/InputStudio';
import SlideOutput from './components/SlideOutput';
import InteractivePreview from './components/InteractivePreview';
import CanvaGuideModal from './components/CanvaGuideModal';
import ClientStatusManager from './components/ClientStatusManager';
import BulkHub from './components/BulkHub';
import Toast from './components/Toast';

import { 
  INITIAL_CLIENTS, 
  INITIAL_WEEKLY_SCHEDULE 
} from './data/scheduleData';
import { SAMPLE_INPUTS } from './data/templates';
import { generateSlides } from './utils/slideGenerator';
import { Calendar, Layers, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // 1. Navigation state
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' | 'studio' | 'export'

  // 2. Client list & statuses (persisted in localStorage)
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem('desk_clients');
      return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  const [clientStatuses, setClientStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem('desk_client_statuses');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    // Default statuses as requested:
    // Shivam, Dalwinder, Sukhsher, Pawandeep: Active
    // Karanpratap: Not Started
    // Hardik: On Hold
    const defaults = {};
    INITIAL_CLIENTS.forEach(c => {
      defaults[c.name] = c.status;
    });
    return defaults;
  });

  // 3. Completed weekly slots tracking (persisted in localStorage)
  const [completedSlots, setCompletedSlots] = useState(() => {
    try {
      const saved = localStorage.getItem('desk_completed_slots');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 4. Input Studio state
  const [selectedClient, setSelectedClient] = useState('Shivam');
  const [selectedFormat, setSelectedFormat] = useState('Testimonial Carousel');
  const [rawInput, setRawInput] = useState(() => SAMPLE_INPUTS[0].rawText);
  const [lighting, setLighting] = useState('dark');
  const [mood, setMood] = useState('aggressive_minimalist');
  const [slideCount, setSlideCount] = useState(4);
  const [customAccent, setCustomAccent] = useState('');

  // 5. Generated Slides State (pre-populate with Shivam's initial carousel)
  const [generatedData, setGeneratedData] = useState(() => {
    return generateSlides({
      clientName: 'Shivam',
      handle: '@coachshivam',
      format: 'Testimonial Carousel',
      rawText: SAMPLE_INPUTS[0].rawText,
      lighting: 'dark',
      mood: 'aggressive_minimalist',
      slideCount: 4
    });
  });

  // 6. UI Modals & Toast State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCanvaGuideOpen, setIsCanvaGuideOpen] = useState(false);
  const [isClientManagerOpen, setIsClientManagerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Persistence helpers
  useEffect(() => {
    try {
      localStorage.setItem('desk_clients', JSON.stringify(clients));
    } catch (e) {
      console.error(e);
    }
  }, [clients]);

  useEffect(() => {
    try {
      localStorage.setItem('desk_client_statuses', JSON.stringify(clientStatuses));
    } catch (e) {
      console.error(e);
    }
  }, [clientStatuses]);

  useEffect(() => {
    try {
      localStorage.setItem('desk_completed_slots', JSON.stringify(completedSlots));
    } catch (e) {
      console.error(e);
    }
  }, [completedSlots]);

  // Show Toast Helper
  const showToast = (toastObj) => {
    setToast(toastObj);
    setTimeout(() => {
      setToast((current) => (current === toastObj ? null : current));
    }, 3200);
  };

  // Update client status
  const handleUpdateClientStatus = (clientName, newStatus) => {
    setClientStatuses((prev) => ({
      ...prev,
      [clientName]: newStatus
    }));
    showToast({
      type: 'success',
      message: `${clientName} status updated to "${newStatus}"`
    });
  };

  // Add new client
  const handleAddNewClient = (newClient) => {
    setClients((prev) => [...prev, newClient]);
    setClientStatuses((prev) => ({
      ...prev,
      [newClient.name]: newClient.status || 'Active'
    }));
  };

  // Toggle completed slot
  const handleToggleCompleteSlot = (slotId) => {
    setCompletedSlots((prev) => {
      const next = { ...prev, [slotId]: !prev[slotId] };
      return next;
    });
  };

  // Clicking ANY day's item immediately preloads into Slide Studio!
  const handleLoadSlotIntoStudio = (slot) => {
    setSelectedClient(slot.client);
    
    // Strict Pawandeep check
    const isPawandeep = slot.client.toLowerCase() === 'pawandeep';
    const effectiveFormat = isPawandeep ? 'Single Slide Tweet' : slot.format;
    setSelectedFormat(effectiveFormat);

    // Pick matching sample template if available
    const matchingSample = SAMPLE_INPUTS.find(
      s => s.client.toLowerCase() === slot.client.toLowerCase() && s.format === effectiveFormat
    ) || SAMPLE_INPUTS.find(s => s.client.toLowerCase() === slot.client.toLowerCase()) || SAMPLE_INPUTS[0];

    const newRawText = matchingSample.rawText;
    const newSlideCount = isPawandeep ? 1 : slot.recommendedSlides || 4;
    const newLighting = matchingSample.lighting || 'dark';
    const newMood = matchingSample.mood || 'aggressive_minimalist';

    setRawInput(newRawText);
    setSlideCount(newSlideCount);
    setLighting(newLighting);
    setMood(newMood);

    // Find client handle
    const clientObj = clients.find(c => c.name.toLowerCase() === slot.client.toLowerCase());
    const handle = clientObj ? clientObj.handle : `@${slot.client.toLowerCase()}`;

    // Auto-generate slides
    const generated = generateSlides({
      clientName: slot.client,
      handle,
      format: effectiveFormat,
      rawText: newRawText,
      lighting: newLighting,
      mood: newMood,
      slideCount: newSlideCount,
      customAccent
    });

    setGeneratedData(generated);
    setActiveTab('studio');
    showToast({
      type: 'success',
      message: `Loaded ${slot.client} (${effectiveFormat}) into Slide Studio!`
    });
  };

  // Handle Generate CTA
  const handleGenerate = () => {
    if (!rawInput.trim()) {
      showToast({
        type: 'error',
        message: 'Please paste raw notes, transcript, or pick a sample template first.'
      });
      return;
    }

    const clientObj = clients.find(c => c.name.toLowerCase() === selectedClient.toLowerCase());
    const handle = clientObj ? clientObj.handle : `@${selectedClient.toLowerCase()}`;

    const generated = generateSlides({
      clientName: selectedClient,
      handle,
      format: selectedFormat,
      rawText: rawInput,
      lighting,
      mood,
      slideCount,
      customAccent: customAccent.trim() || null
    });

    setGeneratedData(generated);
    showToast({
      type: 'success',
      message: `Generated ${generated.slides.length} slides with Canva blueprint!`
    });
  };

  // Update specific slide property inline
  const handleUpdateSlide = (slideIndex, field, value) => {
    setGeneratedData((prev) => {
      if (!prev || !prev.slides) return prev;
      const updatedSlides = [...prev.slides];
      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        [field]: value
      };
      return {
        ...prev,
        slides: updatedSlides
      };
    });
  };

  // Calculate weekly stats
  const totalSlotsCount = INITIAL_WEEKLY_SCHEDULE.reduce((acc, day) => acc + day.slots.length, 0);
  const completedCount = Object.values(completedSlots).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased pb-24 sm:pb-12">
      {/* Header with Navigation & Quick Actions */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedCount={completedCount}
        totalSlots={totalSlotsCount}
        onOpenClientManager={() => setIsClientManagerOpen(true)}
        onOpenCanvaGuide={() => setIsCanvaGuideOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 sm:py-6">
        {/* TAB 1: WEEKLY DESK */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Quick Hero Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 p-4 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Weekly Workflow Desk
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white font-poppins">
                  6 Fitness Clients • Monday to Sunday Schedule
                </h3>
                <p className="text-xs text-zinc-400">
                  Click any client card to load that day's format into the generator.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <span className="text-xs font-bold text-white block">
                    {completedCount} of {totalSlotsCount} Complete
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {Math.round((completedCount / totalSlotsCount) * 100)}% of week's posts
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-black font-extrabold flex items-center justify-center text-xs font-mono">
                  {Math.round((completedCount / totalSlotsCount) * 100)}%
                </div>
              </div>
            </div>

            {/* Weekly Schedule Component */}
            <WeeklySchedule
              schedule={INITIAL_WEEKLY_SCHEDULE}
              clientStatuses={clientStatuses}
              onUpdateClientStatus={handleUpdateClientStatus}
              completedSlots={completedSlots}
              onToggleCompleteSlot={handleToggleCompleteSlot}
              onLoadSlotIntoStudio={handleLoadSlotIntoStudio}
              onSelectClient={setSelectedClient}
            />
          </div>
        )}

        {/* TAB 2: SLIDE STUDIO & GENERATOR */}
        {activeTab === 'studio' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Input Configuration & Raw Notes */}
            <InputStudio
              clients={clients}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              selectedFormat={selectedFormat}
              setSelectedFormat={setSelectedFormat}
              rawInput={rawInput}
              setRawInput={setRawInput}
              lighting={lighting}
              setLighting={setLighting}
              mood={mood}
              setMood={setMood}
              slideCount={slideCount}
              setSlideCount={setSlideCount}
              customAccent={customAccent}
              setCustomAccent={setCustomAccent}
              onGenerate={handleGenerate}
              onToast={showToast}
            />

            {/* Slide Output & Canva Blueprint Cards */}
            {generatedData && (
              <SlideOutput
                generatedData={generatedData}
                onUpdateSlide={handleUpdateSlide}
                onOpenPreview={() => setIsPreviewOpen(true)}
                onOpenCanvaGuide={() => setIsCanvaGuideOpen(true)}
                onToast={showToast}
              />
            )}
          </div>
        )}

        {/* TAB 3: CANVA BULK HUB */}
        {activeTab === 'export' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <BulkHub
              generatedData={generatedData}
              onOpenCanvaGuide={() => setIsCanvaGuideOpen(true)}
              onOpenPreview={() => setIsPreviewOpen(true)}
              onToast={showToast}
            />
          </div>
        )}
      </main>

      {/* Floating Bottom Navigation Bar for Mobile (iPhone 15 Pro Thumb Zone) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800/80 px-4 py-2 sm:hidden pb-safe-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'schedule' ? 'text-amber-400 font-bold' : 'text-zinc-500'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-[10px]">Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'studio' ? 'text-amber-400 font-bold' : 'text-zinc-500'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[10px]">Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'export' ? 'text-amber-400 font-bold' : 'text-zinc-500'
            }`}
          >
            <Download className="w-4 h-4" />
            <span className="text-[10px]">Canva CSV</span>
          </button>

          <button
            onClick={() => setIsPreviewOpen(true)}
            disabled={!generatedData}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              generatedData ? 'text-zinc-400 hover:text-white' : 'opacity-40 cursor-not-allowed text-zinc-600'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-[10px]">Preview</span>
          </button>
        </div>
      </div>

      {/* Visual 4:5 Mobile Simulator Modal */}
      <InteractivePreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        generatedData={generatedData}
        onToast={showToast}
      />

      {/* Canva Pro Lite Bulk Create Guide Modal */}
      <CanvaGuideModal
        isOpen={isCanvaGuideOpen}
        onClose={() => setIsCanvaGuideOpen(false)}
      />

      {/* Client Status Manager Modal */}
      <ClientStatusManager
        isOpen={isClientManagerOpen}
        onClose={() => setIsClientManagerOpen(false)}
        clients={clients}
        clientStatuses={clientStatuses}
        onUpdateClientStatus={handleUpdateClientStatus}
        onAddNewClient={handleAddNewClient}
        onToast={showToast}
      />

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
