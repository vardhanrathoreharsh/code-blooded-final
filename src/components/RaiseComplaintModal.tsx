import React, { useState, useEffect } from 'react';
import { CategoryType, Complaint } from '../types';
import { CATEGORY_WEIGHTS, calculateUrgencyScore } from '../data/initialData';

interface RaiseComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newComplaint: Complaint) => void;
  nextId: string;
  currentStudent?: { id: string; name: string } | null;
}

export const RaiseComplaintModal: React.FC<RaiseComplaintModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  nextId,
  currentStudent,
}) => {
  const [category, setCategory] = useState<CategoryType>('Wi-Fi');
  const [otherCategory, setOtherCategory] = useState('');
  const [studentName, setStudentName] = useState(currentStudent?.name || 'Alex Chen');
  const [enrollmentNo, setEnrollmentNo] = useState(currentStudent?.id || 'ENR-2024-8841');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (currentStudent) {
        setStudentName(currentStudent.name || 'Alex Chen');
        setEnrollmentNo(currentStudent.id || 'ENR-2024-8841');
      }
    }
  }, [isOpen, currentStudent]);

  if (!isOpen) return null;

  const currentWeight = CATEGORY_WEIGHTS[category] || 1;
  const charLength = description.length;
  const isValidDesc = charLength >= 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = studentName.trim();
    const cleanEnr = enrollmentNo.trim().toUpperCase();
    const cleanDesc = description.trim();
    const cleanLoc = location.trim() || 'General Campus Quad';
    const cleanOtherCat = otherCategory.trim();

    if (!cleanName) {
      setError('Please enter Student Name.');
      return;
    }
    if (!cleanEnr) {
      setError('Please enter Enrollment Number.');
      return;
    }
    if (category === 'Other' && !cleanOtherCat) {
      setError('Please specify the category in the Other Categories field.');
      return;
    }
    if (cleanDesc.length < 5) {
      setError('Issue specification must be at least 5 characters.');
      return;
    }

    setIsSubmitting(true);
    const score = calculateUrgencyScore(category, 0); // 0 hours initially

    const newTicket: Complaint = {
      id: nextId,
      category,
      otherCategory: cleanOtherCat || undefined,
      studentName: cleanName,
      enrollmentNo: cleanEnr,
      desc: cleanDesc,
      location: cleanLoc,
      hoursPending: 0,
      weight: currentWeight,
      score,
      status: 'Raised',
      createdAt: 'Just now',
      reportedBy: `${cleanName} (${cleanEnr})`,
      assignedTeam:
        category === 'Wi-Fi'
          ? 'Network NOC'
          : category === 'Laboratory'
          ? 'Precision Tech Services'
          : category === 'Classroom'
          ? 'Classroom AV Ops'
          : category === 'Hostel'
          ? 'Facilities Maintenance'
          : 'Campus Operations Dispatch',
      priorityTag: 'Active SLA'
    };

    setTimeout(() => {
      onSubmit(newTicket);
      setIsSubmitting(false);
      setDescription('');
      setLocation('');
      setOtherCategory('');
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div
        className="bg-white rounded-xl border border-slate-200/90 shadow-xl w-full max-w-lg overflow-hidden flex flex-col my-8"
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
            className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center space-x-2 text-rose-700 text-xs font-mono">
              <span className="material-symbols-outlined text-[16px] text-rose-600 shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* 1. Student Name & Enrollment No Columns (2-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Student Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                <span>Student Name</span>
                <span className="text-[10px] text-blue-800 font-bold">Required</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[16px]">
                  person
                </span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 bg-white"
                  required
                />
              </div>
            </div>

            {/* Enrollment Number */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                <span>Enrollment No</span>
                <span className="text-[10px] text-blue-800 font-bold">Required</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[16px]">
                  badge
                </span>
                <input
                  type="text"
                  value={enrollmentNo}
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  placeholder="e.g. ENR-2024-8841"
                  className="w-full pl-8 pr-3 py-2 text-xs font-mono uppercase tracking-wide border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 bg-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* 2. Facility Category & Urgency Weight Pills */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Facility Category
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                Weight: +{currentWeight}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory('Wi-Fi')}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  category === 'Wi-Fi'
                    ? 'bg-[#102a43] text-white border-[#102a43] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="material-symbols-outlined text-[15px]">wifi</span>
                  <span>Wi-Fi</span>
                </div>
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    category === 'Wi-Fi' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-900'
                  }`}
                >
                  +2
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('Hostel')}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  category === 'Hostel'
                    ? 'bg-[#102a43] text-white border-[#102a43] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="material-symbols-outlined text-[15px]">hotel</span>
                  <span>Hostel</span>
                </div>
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    category === 'Hostel' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-900'
                  }`}
                >
                  +2
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('Classroom')}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  category === 'Classroom'
                    ? 'bg-[#102a43] text-white border-[#102a43] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="material-symbols-outlined text-[15px]">school</span>
                  <span>Classroom</span>
                </div>
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    category === 'Classroom' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-900'
                  }`}
                >
                  +1
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('Laboratory')}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  category === 'Laboratory'
                    ? 'bg-[#102a43] text-white border-[#102a43] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="material-symbols-outlined text-[15px]">biotech</span>
                  <span>Laboratory</span>
                </div>
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    category === 'Laboratory' ? 'bg-white/20 text-white' : 'bg-slate-100 text-rose-700'
                  }`}
                >
                  +3
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('Other')}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer sm:col-span-2 ${
                  category === 'Other'
                    ? 'bg-[#102a43] text-white border-[#102a43] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="material-symbols-outlined text-[15px]">more_horiz</span>
                  <span>Other Categories</span>
                </div>
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    category === 'Other' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-900'
                  }`}
                >
                  +1
                </span>
              </button>
            </div>
          </div>

          {/* 3. Other Categories Specific Column */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
              <span>Other Categories / Specific Area</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {category === 'Other' ? 'Required for Other' : 'Optional'}
              </span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[16px]">
                category
              </span>
              <input
                type="text"
                value={otherCategory}
                onChange={(e) => setOtherCategory(e.target.value)}
                placeholder="e.g. Cafeteria, Sports Facility, Transport, Library, Restroom, Auditorium..."
                className={`w-full pl-8 pr-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 bg-white ${
                  category === 'Other' && !otherCategory.trim()
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* 4. Campus Location Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Campus Location / Hall / Room
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[16px]">
                location_on
              </span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Hall 102, West Wing or Block B 3rd Floor"
                className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 bg-white"
              />
            </div>
          </div>

          {/* 5. Issue Specification Textarea */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
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
          <div className="p-2.5 bg-slate-50 border border-slate-200/90 rounded-lg space-y-1 font-mono text-xs text-slate-600">
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
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-1.5 text-xs">
              {isValidDesc ? (
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
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValidDesc || isSubmitting}
                className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer ${
                  isValidDesc && !isSubmitting
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
