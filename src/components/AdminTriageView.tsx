import React, { useState, useMemo } from 'react';
import { CategoryType, Complaint, StatusType } from '../types';

interface AdminTriageViewProps {
  complaints: Complaint[];
  onOpenRaiseModal: () => void;
  onUpdateStatus: (id: string, newStatus: StatusType) => void;
  onSelectTicket: (ticket: Complaint) => void;
}

export const AdminTriageView: React.FC<AdminTriageViewProps> = ({
  complaints,
  onOpenRaiseModal,
  onUpdateStatus,
  onSelectTicket,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'All'>('All');
  const [activeStatus, setActiveStatus] = useState<StatusType | 'ALL'>('ALL');

  // Stats calculation
  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'Raised').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;

  // High-Priority Unresolved Queue (Top 3)
  // Deterministic order: Unresolved first (Raised or In Progress), sorted by score desc, then hoursPending desc
  const highPriorityQueue = useMemo(() => {
    return complaints
      .filter((c) => c.status !== 'Resolved')
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.hoursPending - a.hoursPending;
      })
      .slice(0, 3);
  }, [complaints]);

  // Master Ledger filtered and sorted by score descending
  const filteredComplaints = useMemo(() => {
    return complaints
      .filter((c) => {
        const matchCategory = activeCategory === 'All' || c.category === activeCategory;
        const matchStatus = activeStatus === 'ALL' || c.status === activeStatus;
        const q = searchQuery.toLowerCase().trim();
        const matchSearch =
          !q ||
          c.id.toLowerCase().includes(q) ||
          c.desc.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q);
        return matchCategory && matchStatus && matchSearch;
      })
      .sort((a, b) => {
        // High priority first, active before resolved, score descending
        if (a.status === 'Resolved' && b.status !== 'Resolved') return 1;
        if (b.status === 'Resolved' && a.status !== 'Resolved') return -1;
        if (b.score !== a.score) return b.score - a.score;
        return b.hoursPending - a.hoursPending;
      });
  }, [complaints, activeCategory, activeStatus, searchQuery]);

  const getCategoryCount = (cat: CategoryType | 'All') => {
    if (cat === 'All') return complaints.length;
    return complaints.filter((c) => c.category === cat).length;
  };

  const getScoreBadgeMeta = (score: number, status: StatusType) => {
    if (status === 'Resolved') {
      return {
        label: `Score ${score.toFixed(1)}`,
        className: 'bg-slate-100 text-slate-600 border-slate-200',
      };
    }
    if (score >= 4.0) {
      return {
        label: `Score ${score.toFixed(1)} - Critical`,
        className: 'bg-rose-50 text-rose-800 border-rose-300',
      };
    }
    if (score >= 3.0) {
      return {
        label: `Score ${score.toFixed(1)} - High`,
        className: 'bg-amber-50 text-amber-800 border-amber-300',
      };
    }
    return {
      label: `Score ${score.toFixed(1)} - Normal`,
      className: 'bg-slate-100 text-slate-700 border-slate-200',
    };
  };

  // Status breakdown percentages
  const raisedPct = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0;
  const inProgressPct = totalCount > 0 ? Math.round((inProgressCount / totalCount) * 100) : 0;
  const resolvedPct = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;

  return (
    <main className="flex-1 flex flex-col relative w-full pt-4 pb-16 bg-[#f8fafc]">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Header & Live Engine Status Banner */}
        <div className="flex flex-col space-y-1.5 pt-1">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-300 bg-slate-100 shadow-2xs w-fit">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="font-mono text-[11px] text-slate-700 font-semibold tracking-tight">
                Local Persistence Active • Auto-synced
              </span>
            </div>
            <button
              onClick={onOpenRaiseModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#1e3a8a] bg-[#1e3a8a] text-white text-xs font-semibold shadow-xs hover:bg-[#102a43] active:scale-95 transition-all uppercase tracking-wider"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] font-semibold">add</span>
              <span>+ Raise Complain</span>
            </button>
          </div>

          <div className="pt-1">
            <h1 className="font-display-hero text-2xl sm:text-3xl font-bold uppercase text-[#0f172a] tracking-wider leading-none">
              Queue &amp; Analytics
            </h1>
            <p className="text-[12px] font-medium text-slate-500 mt-1 uppercase tracking-wider font-mono">
              Deterministic Urgency Engine &amp; Active Campus Triage
            </p>
          </div>
        </div>

        {/* Top Stats & Performance Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Stat 1: Total Complaints */}
          <div className="p-3.5 border border-slate-200 rounded-lg bg-white shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
                Total Complaints
              </span>
              <span className="material-symbols-outlined text-[#1e3a8a] text-[20px]">dataset</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display-hero text-3xl font-bold text-slate-900">
                {totalCount}
              </span>
              <span className="text-[11px] font-mono text-[#1e3a8a] bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 font-semibold">
                +12% cyc
              </span>
            </div>
          </div>

          {/* Stat 2: Pending Unresolved */}
          <div className="p-3.5 border border-rose-200 rounded-lg bg-[#fef2f2] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-rose-600">
                Pending Unresolved
              </span>
              <span className="material-symbols-outlined text-rose-600 text-[20px]">emergency</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display-hero text-3xl font-bold text-slate-900">
                {pendingCount}
              </span>
              <span className="text-[11px] font-mono text-rose-800 bg-rose-100 border border-rose-300 rounded px-1.5 py-0.5 font-bold uppercase">
                Urgent SLA
              </span>
            </div>
          </div>

          {/* Stat 3: In Progress */}
          <div className="p-3.5 border border-amber-200 rounded-lg bg-[#fffbeb] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-amber-700">
                In Progress
              </span>
              <span className="material-symbols-outlined text-amber-600 text-[20px]">timelapse</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display-hero text-3xl font-bold text-slate-900">
                {inProgressCount}
              </span>
              <span className="text-[11px] font-mono text-amber-800 bg-amber-100 border border-amber-300 rounded px-1.5 py-0.5 font-semibold">
                ~2.4h cycle
              </span>
            </div>
          </div>

          {/* Stat 4: Resolved */}
          <div className="p-3.5 border border-emerald-200 rounded-lg bg-[#f0fdf4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-emerald-700">
                Resolved
              </span>
              <span className="material-symbols-outlined text-emerald-600 text-[20px]">verified</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display-hero text-3xl font-bold text-slate-900">
                {resolvedCount}
              </span>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 border border-emerald-300 rounded px-1.5 py-0.5 font-semibold">
                94.2% sat
              </span>
            </div>
          </div>
        </div>

        {/* Analytical Urgency Spotlight Section ('HIGH-PRIORITY UNRESOLVED QUEUE') */}
        <div className="flex flex-col space-y-3 p-4 border border-slate-300 rounded-xl bg-slate-100/80 shadow-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded bg-[#1e3a8a] flex items-center justify-center shrink-0 text-white shadow-xs">
              <span className="material-symbols-outlined text-[18px]">calculate</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">
                  High-Priority Unresolved Queue
                </span>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-[#1e3a8a] text-white font-bold uppercase font-mono">
                  Top 3
                </span>
              </div>
              <p className="font-mono text-[11px] text-slate-600 font-medium mt-0.5 leading-snug">
                Urgency Score = Category Weight (Lab: 3, Wi-Fi: 2, Hostel: 2, Classroom: 1) + floor(Hours Pending / 24)
              </p>
            </div>
          </div>

          {/* Priority Cards Carousel / Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {highPriorityQueue.map((item, idx) => {
              const badgeMeta = getScoreBadgeMeta(item.score, item.status);
              return (
                <div
                  key={item.id}
                  className="p-3.5 border border-slate-200 rounded-lg bg-white shadow-xs flex flex-col justify-between space-y-2.5 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-[11px] bg-slate-800 text-white rounded px-2 py-0.5 font-bold">
                        {item.id}
                      </span>
                      <span className="text-[11px] bg-slate-100 text-slate-700 border border-slate-200 rounded px-1.5 py-0.5 font-semibold uppercase">
                        {item.category} • +{item.weight}
                      </span>
                      <span className="text-[11px] text-rose-600 font-semibold uppercase">
                        {item.hoursPending}h pending
                      </span>
                    </div>
                    <div className={`px-2 py-0.5 rounded border text-[11px] font-mono font-bold ${badgeMeta.className}`}>
                      Score {item.score.toFixed(1)}
                    </div>
                  </div>

                  <p
                    onClick={() => onSelectTicket(item)}
                    className="text-xs font-semibold text-slate-900 leading-snug cursor-pointer hover:text-blue-900 transition-colors line-clamp-2"
                  >
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 border border-slate-200 rounded px-1.5 py-0.5 font-medium uppercase truncate max-w-[150px]">
                      {item.priorityTag || (idx === 0 ? 'Oldest Submission Priority' : 'High Impact')}
                    </span>
                    <button
                      onClick={() => onUpdateStatus(item.id, 'In Progress')}
                      className="text-[11px] font-mono text-white bg-[#1e3a8a] rounded px-2.5 py-1 shadow-xs hover:bg-slate-900 active:scale-95 transition-all flex items-center gap-1 font-semibold uppercase shrink-0"
                    >
                      <span>Move to In Progress</span>
                      <span className="material-symbols-outlined text-[13px] font-bold">arrow_forward</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Exclusion note */}
          <div className="flex items-center gap-1.5 pt-0.5 font-mono text-[11px] text-slate-500">
            <span className="material-symbols-outlined text-[15px]">info</span>
            <span>Resolved complaints automatically excluded from this priority queue.</span>
          </div>
        </div>

        {/* Search, Filter & Control Toolbar */}
        <div className="flex flex-col space-y-2.5 pt-2">
          {/* Search Bar */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by ID, keywords, or location..."
              className="w-full h-10 pl-9 pr-8 border border-slate-300 rounded-lg bg-white text-slate-900 text-xs placeholder:text-slate-400 shadow-2xs focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills (Horizontal Scroll) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-mono">
            {(['All', 'Wi-Fi', 'Hostel', 'Classroom', 'Laboratory'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 border rounded-full font-semibold transition-all uppercase whitespace-nowrap ${
                  activeCategory === cat
                    ? 'border-[#1e3a8a] bg-[#1e3a8a] text-white shadow-xs'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat} ({getCategoryCount(cat)})
              </button>
            ))}
          </div>

          {/* Status Segment Toggle */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200 rounded-lg border border-slate-300 font-mono text-xs">
            {(['ALL', 'Raised', 'In Progress', 'Resolved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setActiveStatus(st)}
                className={`py-1.5 font-bold rounded transition-all text-center uppercase tracking-wide ${
                  activeStatus === st
                    ? 'bg-white text-[#1e3a8a] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Master Complaints Ledger Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">Active Ledger</span>
            <span className="font-mono text-[11px] bg-blue-50 text-[#1e3a8a] border border-blue-200 rounded px-2 py-0.5 font-bold uppercase">
              {filteredComplaints.length} complaints
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
            Sorted by Score ↓
          </span>
        </div>

        {/* Master Complaints Card List */}
        <div className="space-y-2.5">
          {filteredComplaints.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-lg shadow-xs text-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-slate-300 bg-slate-100 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined text-[24px]">inbox</span>
              </div>
              <span className="text-sm font-bold uppercase text-slate-900">No complaints found</span>
              <p className="text-xs text-slate-500 max-w-xs font-mono">
                No complaints found matching your query or active filter selections.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setActiveStatus('ALL');
                }}
                className="mt-2 px-4 py-1.5 border border-[#1e3a8a] rounded bg-[#1e3a8a] text-white font-mono text-[11px] font-semibold shadow-xs uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredComplaints.map((item) => {
              const badgeMeta = getScoreBadgeMeta(item.score, item.status);
              const isResolved = item.status === 'Resolved';

              return (
                <div
                  key={item.id}
                  className={`p-3.5 border border-slate-200 rounded-lg bg-white shadow-xs flex flex-col space-y-2 transition-all hover:border-slate-300 ${
                    isResolved ? 'opacity-85' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-[11px] bg-slate-800 text-white rounded px-2 py-0.5 font-bold">
                        {item.id}
                      </span>
                      <span className="text-[11px] bg-slate-100 text-slate-700 border border-slate-200 rounded px-2 py-0.5 font-semibold uppercase">
                        {item.category} • +{item.weight}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono">
                      <span className={`text-[11px] border rounded px-2 py-0.5 font-bold uppercase tracking-wider ${badgeMeta.className}`}>
                        {badgeMeta.label}
                      </span>
                    </div>
                  </div>

                  <p
                    onClick={() => onSelectTicket(item)}
                    className={`text-xs font-semibold leading-snug cursor-pointer hover:text-blue-900 transition-colors ${
                      isResolved ? 'text-slate-500 line-through' : 'text-slate-900'
                    }`}
                  >
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                      <span>{item.hoursPending}h ago {isResolved ? '(Closed)' : ''}</span>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span className="hidden sm:inline text-slate-400">{item.location}</span>
                    </div>

                    {/* Status Dropdown Control */}
                    <div className="relative">
                      <select
                        value={item.status}
                        onChange={(e) => onUpdateStatus(item.id, e.target.value as StatusType)}
                        className={`appearance-none rounded font-mono text-[11px] font-bold pl-2.5 pr-6 py-1 cursor-pointer focus:outline-none uppercase shadow-2xs border ${
                          item.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : item.status === 'In Progress'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        <option value="Raised">Raised</option>
                        <option value="In Progress">Move to In Progress</option>
                        <option value="Resolved">Mark Resolved</option>
                      </select>
                      <span
                        className={`material-symbols-outlined text-[15px] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none font-bold ${
                          item.status === 'Resolved'
                            ? 'text-emerald-700'
                            : item.status === 'In Progress'
                            ? 'text-amber-700'
                            : 'text-rose-700'
                        }`}
                      >
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Status Breakdown Donut Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#1e3a8a]">donut_large</span>
              <h3 className="text-xs font-bold uppercase tracking-tight text-slate-900 font-mono">
                Status Breakdown
              </h3>
            </div>
            <span className="font-mono text-[11px] text-[#1e3a8a] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold uppercase">
              {totalCount} Total
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            {/* SVG Donut */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="38" stroke="#f1f5f9" strokeWidth="12" />
                {/* Raised Slice */}
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="38"
                  stroke="#dc2626"
                  strokeWidth="12"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - raisedPct / 100)}
                />
                {/* In Progress Slice */}
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="38"
                  stroke="#d97706"
                  strokeWidth="12"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - inProgressPct / 100)}
                  style={{ transform: `rotate(${(raisedPct / 100) * 360}deg)`, transformOrigin: '50px 50px' }}
                />
                {/* Resolved Slice */}
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="38"
                  stroke="#059669"
                  strokeWidth="12"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - resolvedPct / 100)}
                  style={{
                    transform: `rotate(${((raisedPct + inProgressPct) / 100) * 360}deg)`,
                    transformOrigin: '50px 50px',
                  }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="font-display-hero text-xl text-slate-900 font-bold leading-none">
                  {totalCount}
                </span>
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider">
                  Active
                </span>
              </div>
            </div>

            {/* Legend Progress Items */}
            <div className="flex flex-col gap-2 w-full flex-1 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0"></span>
                  <span className="text-slate-800 font-medium">Raised / Pending</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-rose-600">{pendingCount}</span>
                  <span className="text-slate-400">({raisedPct}%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                  <span className="text-slate-800 font-medium">In Progress</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-amber-600">{inProgressCount}</span>
                  <span className="text-slate-400">({inProgressPct}%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                  <span className="text-slate-800 font-medium">Resolved / Closed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-600">{resolvedCount}</span>
                  <span className="text-slate-400">({resolvedPct}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Algorithm Micro-Meta */}
        <div className="flex flex-col items-center justify-center py-4 text-center space-y-1 font-mono">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <span className="material-symbols-outlined text-[15px]">memory</span>
            <span className="uppercase tracking-tight">Deterministic Priority Algorithm v2.4 • CampusPulse Engine</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            © Campus Resolve Operations • Real-time Campus Sync
          </span>
        </div>
      </div>
    </main>
  );
};
