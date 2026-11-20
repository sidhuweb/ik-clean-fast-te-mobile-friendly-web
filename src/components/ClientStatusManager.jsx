import React, { useState } from 'react';
import { X, Users, Check, Plus, ShieldCheck, ChevronDown, UserCheck, AlertCircle } from 'lucide-react';
import { STATUS_CONFIG } from '../data/scheduleData';

export default function ClientStatusManager({
  isOpen,
  onClose,
  clients,
  clientStatuses,
  onUpdateClientStatus,
  onAddNewClient,
  onToast
}) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientRole, setNewClientRole] = useState('');
  const [newClientHandle, setNewClientHandle] = useState('');
  const [newClientStatus, setNewClientStatus] = useState('Active');

  if (!isOpen) return null;

  const handleCreateClient = (e) => {
    e.preventDefault();
    if (!newClientName.trim()) {
      onToast({ type: 'error', message: 'Please enter a client name' });
      return;
    }

    onAddNewClient({
      name: newClientName.trim(),
      role: newClientRole.trim() || 'Fitness & Lifestyle Coach',
      handle: newClientHandle.trim() || `@${newClientName.trim().toLowerCase()}`,
      status: newClientStatus,
      defaultFormat: 'Tweet Carousel',
      notes: 'Custom client'
    });

    setNewClientName('');
    setNewClientRole('');
    setNewClientHandle('');
    setIsAddingNew(false);
    onToast({ type: 'success', message: `Added new client: ${newClientName.trim()}` });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-5 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-poppins">
                Client Roster & Status Hub
              </h3>
              <p className="text-[11px] text-zinc-400">
                Update client status (Active, On Hold, Not Started) anytime
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

        {/* Clients List */}
        <div className="py-4 space-y-2.5 overflow-y-auto pr-1 flex-1">
          {clients.map((c) => {
            const currentStatus = clientStatuses[c.name] || c.status || 'Active';
            const statusConf = STATUS_CONFIG[currentStatus] || STATUS_CONFIG['Active'];

            return (
              <div
                key={c.name}
                className="bg-zinc-900/60 p-3 rounded-2xl border border-zinc-800 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-poppins">
                      {c.name}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {c.handle}
                    </span>
                    {c.name === 'Pawandeep' && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                        Single Tweet Strict
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {c.role}
                  </p>
                </div>

                {/* Status Switcher Buttons */}
                <div className="flex items-center gap-1">
                  {['Active', 'On Hold', 'Not Started'].map((statusOption) => {
                    const isCurrent = currentStatus === statusOption;
                    const optConf = STATUS_CONFIG[statusOption];

                    return (
                      <button
                        key={statusOption}
                        type="button"
                        onClick={() => onUpdateClientStatus(c.name, statusOption)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                          isCurrent
                            ? `${optConf.bg} ${optConf.text} border ${optConf.border} shadow-sm`
                            : 'bg-zinc-950 text-zinc-500 hover:text-zinc-300 border border-zinc-800'
                        }`}
                      >
                        {statusOption}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Add New Client Section */}
          {isAddingNew ? (
            <form onSubmit={handleCreateClient} className="bg-zinc-900/90 p-3.5 rounded-2xl border border-amber-400/30 space-y-2.5 animate-in fade-in duration-150">
              <span className="text-xs font-bold text-amber-400 font-poppins block">
                Add New Fitness Coach
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Coach Name"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Instagram Handle (@...)"
                  value={newClientHandle}
                  onChange={(e) => setNewClientHandle(e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <input
                type="text"
                placeholder="Niche (e.g. Fat Loss / Strength / Posture)"
                value={newClientRole}
                onChange={(e) => setNewClientRole(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-amber-400 text-black text-xs font-bold rounded-lg hover:bg-amber-300"
                >
                  Save Coach
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingNew(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-zinc-700 hover:border-amber-400 text-xs font-medium text-zinc-400 hover:text-amber-400 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Coach</span>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
