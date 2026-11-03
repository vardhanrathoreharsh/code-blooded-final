import React, { useState } from 'react';
import { CategoryType, Complaint } from '../types';
import { CATEGORY_WEIGHTS, calculateUrgencyScore } from '../data/initialData';

interface RaiseComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newComplaint: Complaint) => void;
  nextId: string;
}

export const RaiseComplaintModal: React.FC<RaiseComplaintModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  nextId,
}) => {
  const [category, setCategory] = useState<CategoryType>('Wi-Fi');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentWeight = CATEGORY_WEIGHTS[category];
  const charLength = description.length;
  const isValid = charLength >= 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    const score = calculateUrgencyScore(category, 0); // 0 hours initially

    const newTicket: Complaint = {
      id: nextId,
      category,
      desc: description.trim(),
      location: location.trim() || 'General Campus Quad',
      hoursPending: 0,
      weight: currentWeight,
      score,
      status: 'Raised',
      createdAt: 'Just now',
      reportedBy: 'Alex Chen (Student)',
      assignedTeam:
        category === 'Wi-Fi'
          ? 'Network NOC'
          : category === 'Laboratory'
          ? 'Precision Tech Services'
          : category === 'Classroom'
          ? 'Classroom AV Ops'
          : 'Facilities Maintenance',
      priorityTag: 'Active SLA'
    };

    setTimeout(() => {
      onSubmit(newTicket);
      setIsSubmitting(false);
      setDescription('');
      setLocation('');
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-xl border border-slate-200/90 shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#102a43] text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">add_alert</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">
                  Raise Incident Complaint
                </h3>
                <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                  {nextId}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Deterministic Urgency Engine v2.4 Ingestion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Category Selector with Weighted Pills */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Facility Category &amp; Urgency Weight
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                Weight: +{currentWeight}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCategory('Wi-Fi')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
                  category === 'Wi-Fi'
                    ? 'bg-[#102a43] text-white border-[#102a43] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[16px]">wifi</span>
                  <span>Wi-Fi Network</span>
                </div>
                <span
                  className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${
                    category === 'Wi-Fi' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-900'
                  }`}
                >
                  +2
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('Hostel')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
                  category === 'Hostel'
                    ? 'bg-[#102a43] text-white border-[#102a43] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[16px]">hotel</span>
                  <span>Hostel Living</span>
                </div>
                <span
                  className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${
                    category === 'Hostel' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-900'
                  }`}
                >
                  +2
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('Classroom')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
                  category === 'Classroom'
                    ? 'bg-[#102a43] text-white border-[#102a43] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  <span>Classroom AV</span>
                </div>
                <span
                  className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${
                    category === 'Classroom' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-900'
                  }`}
                >
                  +1
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('Laboratory')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
                  category === 'Laboratory'
                    ? 'bg-[#102a43] text-white border-[#102a43] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[16px]">biotech</span>
                  <span>Laboratory</span>
                </div>
                <span
                  className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${
                    category === 'Laboratory' ? 'bg-white/20 text-white' : 'bg-slate-100 text-rose-700 font-bold'
                  }`}
                >
                  +3
                </span>
              </button>
            </div>
          </div>

          {/* Location Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Campus Location / Hall / Room
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                location_on
              </span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Hall 102, West Wing or Block B 3rd Floor"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 bg-white"
              />
            </div>
          </div>

          {/* Description Textarea */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Issue Specification
              </label>
              <span className="text-[11px] font-mono text-slate-400">{charLength} / 250</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={250}
              rows={3}
              placeholder="State concise issue details (e.g. Overhead projector lamp flickering and ballast failing)..."
              className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 bg-white"
              required
            />
          </div>

          {/* Real-time Urgency Score Formulation Banner */}
          <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-lg space-y-1 font-mono text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                <span className="material-symbols-outlined text-[15px] text-blue-900">calculate</span>
                <span>Deterministic Urgency Score:</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">
                {currentWeight}.0 Initial
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              Score = Base Weight ({currentWeight}) + floor(0h / 24) = {currentWeight}.0. Priority scales deterministically every 24 hours until resolved.
            </p>
          </div>

          {/* Validation & Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1.5 text-xs">
              {isValid ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono text-[11px] text-emerald-700 font-semibold">Valid Input</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span className="font-mono text-[11px] text-slate-500">Min 5 chars</span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs ${
                  isValid && !isSubmitting
                    ? 'bg-[#102a43] hover:bg-[#0c1f33] text-white active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] font-bold">bolt</span>
                <span>{isSubmitting ? 'Submitting...' : 'Raise Complaint'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
