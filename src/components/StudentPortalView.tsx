import React, { useState, useMemo } from 'react';
import { CategoryType, Complaint } from '../types';

export type StudentLedgerTab = 'my-submissions' | 'all-complaints' | 'most-voted';

interface StudentPortalViewProps {
  complaints: Complaint[];
  onOpenRaiseModal: () => void;
  onSelectTicket: (ticket: Complaint) => void;
  onToggleVote: (ticketId: string) => void;
  votedTicketIds: string[];
  currentUser?: { id: string; name: string } | null;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  complaints,
  onOpenRaiseModal,
  onSelectTicket,
  onToggleVote,
  votedTicketIds,
  currentUser,
}) => {
  const [activeTab, setActiveTab] = useState<StudentLedgerTab>('my-submissions');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. My Submissions: complaints submitted by the current student
  const studentTickets = useMemo(() => {
    return complaints.filter((c) => {
      if (currentUser) {
        if (c.enrollmentNo && c.enrollmentNo.toUpperCase() === currentUser.id.toUpperCase()) return true;
        if (c.reportedBy && c.reportedBy.includes(currentUser.id)) return true;
        if (c.reportedBy && c.reportedBy.includes(currentUser.name)) return true;
      }
      return (
        ['C01', 'C02', 'C03', 'C04', 'C05'].includes(c.id) ||
        c.reportedBy.includes('Student') ||
        c.reportedBy.includes('Alex Chen')
      );
    });
  }, [complaints, currentUser]);

  // Source list depending on activeTab
  const currentTabBaseList = useMemo(() => {
    if (activeTab === 'my-submissions') {
      return studentTickets;
    }
    if (activeTab === 'most-voted') {
      // All complaints sorted by upvotes descending
      return [...complaints].sort((a, b) => {
        const vA = a.upvotes ?? 0;
        const vB = b.upvotes ?? 0;
        if (vB !== vA) return vB - vA;
        return b.score - a.score;
      });
    }
    // 'all-complaints': all complaints, active first, score descending
    return [...complaints].sort((a, b) => {
      if (a.status === 'Resolved' && b.status !== 'Resolved') return 1;
      if (b.status === 'Resolved' && a.status !== 'Resolved') return -1;
      return b.score - a.score;
    });
  }, [activeTab, studentTickets, complaints]);

  // Filtered by category & search query
  const filteredTickets = useMemo(() => {
    return currentTabBaseList.filter((c) => {
      const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.otherCategory && c.otherCategory.toLowerCase().includes(q)) ||
        (c.studentName && c.studentName.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [currentTabBaseList, selectedCategory, searchQuery]);

  // Overall metric stats (based on student submissions)
  const totalCount = studentTickets.length;
  const pendingCount = studentTickets.filter((c) => c.status === 'Raised').length;
  const inProgressCount = studentTickets.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = studentTickets.filter((c) => c.status === 'Resolved').length;

  // Max votes across campus for progress bars
  const maxVotesAcrossCampus = useMemo(() => {
    return Math.max(1, ...complaints.map((c) => c.upvotes ?? 0));
  }, [complaints]);

  // Top 3 most voted complaints for the podium
  const top3MostVoted = useMemo(() => {
    return [...complaints]
      .sort((a, b) => (b.upvotes ?? 0) - (a.upvotes ?? 0))
      .slice(0, 3);
  }, [complaints]);

  const getCategoryCount = (cat: CategoryType | 'All') => {
    const list = activeTab === 'my-submissions' ? studentTickets : complaints;
    if (cat === 'All') return list.length;
    return list.filter((c) => c.category === cat).length;
  };

  return (
    <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* HeaderTitleSection */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase font-mono">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>CAMPUS RESOLVE</span>
            <span>•</span>
            <span>REAL-TIME CAMPUS SYNC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2744] tracking-tight mt-1">
            STUDENT FACILITY DESK
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-500 uppercase mt-0.5">
            MY SUBMITTED REPORTS &amp; INCIDENT TRACKER
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={onOpenRaiseModal}
            className="inline-flex items-center px-4 py-2.5 rounded-md bg-[#102a43] hover:bg-[#0c1f33] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-xs active:scale-95 cursor-pointer"
            type="button"
          >
            <span className="mr-1 text-sm font-light">+</span> + RAISE COMPLAINT
          </button>
        </div>
      </section>

      {/* StatsGrid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Complaints */}
        <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              TOTAL COMPLAINTS
            </span>
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect height="7" width="7" x="3" y="3"></rect>
              <rect height="7" width="7" x="14" y="3"></rect>
              <rect height="7" width="7" x="14" y="14"></rect>
              <rect height="7" width="7" x="3" y="14"></rect>
            </svg>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {totalCount}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200/60 font-mono">
              +2 this week
            </span>
          </div>
        </div>

        {/* Card 2: Pending Unresolved */}
        <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-rose-600 uppercase">
              PENDING UNRESOLVED
            </span>
            <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" x2="12" y1="9" y2="13"></line>
              <line x1="12" x2="12.01" y1="17" y2="17"></line>
            </svg>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-extrabold text-rose-600 tracking-tight">
              {pendingCount}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-rose-50 text-rose-600 border border-rose-200/60 font-mono">
              SLA ACTIVE
            </span>
          </div>
        </div>

        {/* Card 3: In Progress */}
        <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-amber-600 uppercase">
              IN PROGRESS
            </span>
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-extrabold text-amber-500 tracking-tight">
              {inProgressCount}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200/60 font-mono">
              ~2.4h cycle
            </span>
          </div>
        </div>

        {/* Card 4: Resolved */}
        <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-700 uppercase">
              RESOLVED
            </span>
            <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {resolvedCount}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono">
              98% satisfaction
            </span>
          </div>
        </div>
      </section>

      {/* TriageMeshBanner */}
      <section className="bg-white rounded-lg p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-700 border border-slate-200">
            <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Campus Infrastructure Triage Mesh</h2>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              Deterministic urgency score = Category Weight (Lab: 3, Wi-Fi: 2, Hostel: 2, Class: 1) + floor(Hours / 24)
            </p>
          </div>
        </div>

        {/* Latency Curve Graph */}
        <div className="flex items-center space-x-3 self-end md:self-center pr-2">
          <svg className="w-32 h-8 overflow-visible" fill="none" viewBox="0 0 120 30">
            <path
              d="M 2 24 C 20 24, 25 18, 45 22 C 65 26, 75 14, 90 8 C 98 5, 106 14, 115 17"
              fill="none"
              stroke="#0f172a"
              strokeLinecap="round"
              strokeWidth="2"
            ></path>
            <circle cx="115" cy="17" fill="#e11d48" r="2.5"></circle>
          </svg>
          <span className="text-xs font-mono font-medium text-slate-600 whitespace-nowrap">
            LATENCY <strong className="text-slate-800">42ms</strong>
          </span>
        </div>
      </section>

      {/* STUDENT PORTAL TABS: My Submissions | All Complaints | Most Voted */}
      <section className="space-y-4">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-2">
          <div className="flex items-center space-x-2">
            {/* Tab 1: My Submissions */}
            <button
              onClick={() => setActiveTab('my-submissions')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'my-submissions'
                  ? 'bg-[#102a43] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span>My Submissions</span>
              <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'my-submissions' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {studentTickets.length}
              </span>
            </button>

            {/* Tab 2: All Complaints */}
            <button
              onClick={() => setActiveTab('all-complaints')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'all-complaints'
                  ? 'bg-[#102a43] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">apps</span>
              <span>All Complaints</span>
              <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'all-complaints' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {complaints.length}
              </span>
            </button>

            {/* Tab 3: Most Voted Leaderboard */}
            <button
              onClick={() => setActiveTab('most-voted')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'most-voted'
                  ? 'bg-[#102a43] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-amber-500">trending_up</span>
              <span>Most Voted</span>
              <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'most-voted' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900 font-bold'}`}>
                Top
              </span>
            </button>
          </div>

          {/* Quick Context Pill */}
          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>
              {activeTab === 'my-submissions' && 'Showing your private reported incident tickets'}
              {activeTab === 'all-complaints' && 'Community feed: Tap Vote on issues affecting you'}
              {activeTab === 'most-voted' && 'Campus Consensus: Ranked by total student votes'}
            </span>
          </div>
        </div>

        {/* MOST VOTED SPOTLIGHT PODIUM: Rendered when activeTab === 'most-voted' */}
        {activeTab === 'most-voted' && (
          <div className="bg-gradient-to-r from-slate-900 to-[#0f2744] text-white rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">emoji_events</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide">
                    Campus High-Impact Consensus Podium
                  </h3>
                  <p className="text-xs text-slate-300 font-mono">
                    Prioritizing infrastructure resolutions backed by student community upvotes
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2.5 py-1 rounded-full font-bold">
                Live Community Ranking
              </span>
            </div>

            {/* Top 3 Podium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {top3MostVoted.map((topItem, index) => {
                const votes = topItem.upvotes ?? 0;
                const isVoted = votedTicketIds.includes(topItem.id);
                const rankLabels = ['🥇 #1 TOP IMPACT', '🥈 #2 PRIORITY', '🥉 #3 PRIORITY'];
                const rankColor = index === 0 ? 'text-amber-300 border-amber-400/50 bg-amber-400/10' : index === 1 ? 'text-slate-200 border-slate-300/40 bg-white/10' : 'text-amber-500 border-amber-500/40 bg-white/5';

                return (
                  <div
                    key={topItem.id}
                    onClick={() => onSelectTicket(topItem)}
                    className="p-3.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15 flex flex-col justify-between space-y-2.5 hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${rankColor}`}>
                        {rankLabels[index]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleVote(topItem.id);
                        }}
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          isVoted
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'bg-white/20 hover:bg-white/30 text-white'
                        }`}
                        title={isVoted ? 'Remove your vote' : 'Vote for this issue'}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {isVoted ? 'thumb_up' : 'thumb_up_off_alt'}
                        </span>
                        <span>{votes}</span>
                      </button>
                    </div>

                    <p className="text-xs font-semibold leading-snug line-clamp-2 text-white">
                      {topItem.desc}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-1 border-t border-white/10">
                      <span>{topItem.category}</span>
                      <span>Score {topItem.score.toFixed(1)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, location, or ID..."
              className="w-full pl-9 pr-8 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-mono">
            {(['All', 'Wi-Fi', 'Hostel', 'Classroom', 'Laboratory', 'Other'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#102a43] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat} ({getCategoryCount(cat)})
              </button>
            ))}
          </div>
        </div>

        {/* Section Sub-Header */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
          <span className="font-bold uppercase tracking-wider text-slate-800">
            {activeTab === 'my-submissions' && 'MY SUBMISSION LEDGER'}
            {activeTab === 'all-complaints' && 'ALL CAMPUS INCIDENT REPORTS'}
            {activeTab === 'most-voted' && 'CAMPUS-WIDE CONSENSUS RANKINGS'}
            {' '}({filteredTickets.length} COMPLAINTS)
          </span>
          <span className="text-slate-400">
            {activeTab === 'most-voted' ? 'Sorted by Upvotes ↓' : 'Sorted by Urgency Score ↓'}
          </span>
        </div>

        {/* Ticket List Container */}
        <div className="space-y-3">
          {filteredTickets.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-slate-500 font-mono text-xs space-y-2">
              <span className="material-symbols-outlined text-[28px] text-slate-400 block mx-auto">inbox</span>
              <p>No complaints match your query or category selection in this tab.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-blue-900 font-bold underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredTickets.map((ticket, idx) => {
              const votes = ticket.upvotes ?? 0;
              const isVoted = votedTicketIds.includes(ticket.id);
              const votePct = Math.min(100, Math.round((votes / maxVotesAcrossCampus) * 100));

              return (
                <article
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className="bg-white rounded-lg border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2 font-mono">
                        {/* Rank Badge for Most Voted tab */}
                        {activeTab === 'most-voted' && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            idx === 0 ? 'bg-amber-400 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-900' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            #{idx + 1}
                          </span>
                        )}

                        <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                          {ticket.id}
                        </span>

                        <span className="text-[11px] font-semibold tracking-wider text-slate-600 uppercase">
                          {ticket.category.toUpperCase()} • +{ticket.weight}
                        </span>

                        {ticket.status === 'Resolved' ? (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                            CLOSED
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200 uppercase">
                            {ticket.hoursPending}H PENDING
                          </span>
                        )}

                        <span className="text-xs text-slate-500 font-bold">
                          Score {ticket.score.toFixed(1)}
                        </span>
                      </div>

                      <h3 className={`text-sm font-semibold text-slate-900 leading-snug ${ticket.status === 'Resolved' ? 'text-slate-600 line-through' : ''}`}>
                        {ticket.desc}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium pt-0.5">
                        <div className="flex items-center space-x-1">
                          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></path>
                            <path
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></path>
                          </svg>
                          <span>{ticket.location}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-1 font-mono">
                          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                            <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                          </svg>
                          <span>{ticket.createdAt}</span>
                        </div>
                        {ticket.reportedBy && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[11px] text-slate-400 truncate max-w-[200px]">
                              {ticket.studentName || ticket.reportedBy}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Vote consensus progress bar for Most Voted tab */}
                      {activeTab === 'most-voted' && (
                        <div className="pt-1.5 max-w-md">
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                            <span>Community Consensus Impact</span>
                            <span className="font-bold text-blue-900">{votes} student endorsements</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full transition-all duration-500"
                              style={{ width: `${votePct}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Action Stack: Voting Button & Status Badge */}
                    <div className="sm:self-center flex sm:flex-col items-center sm:items-end gap-2.5 shrink-0">
                      {/* Voting Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleVote(ticket.id);
                        }}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                          isVoted
                            ? 'bg-[#102a43] text-white border-[#102a43] shadow-xs'
                            : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border-slate-200'
                        }`}
                        title={isVoted ? 'Click to remove your vote' : 'Vote: This issue affects me too'}
                      >
                        <span className="material-symbols-outlined text-[16px] leading-none">
                          {isVoted ? 'thumb_up' : 'thumb_up_off_alt'}
                        </span>
                        <span>{votes}</span>
                        <span className="text-[10px] font-normal uppercase opacity-85">
                          {isVoted ? 'Voted' : 'Vote'}
                        </span>
                      </button>

                      {/* Status Badge */}
                      {ticket.status === 'Raised' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-1.5 animate-pulse"></span>
                          RAISED
                        </span>
                      )}
                      {ticket.status === 'In Progress' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-1.5"></span>
                          IN PROGRESS
                        </span>
                      )}
                      {ticket.status === 'Resolved' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5"></span>
                          RESOLVED
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      {/* FeatureCardsRow */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* Card 1 */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="flex items-center space-x-2.5 text-slate-900">
            <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path>
            </svg>
            <h3 className="text-sm font-bold text-slate-900">Electricians on Duty</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Shift Alpha covering South Campus &amp; Residence Halls. Standard response SLA is within 4 hours.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="flex items-center space-x-2.5 text-slate-900">
            <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect height="8" rx="2" ry="2" width="20" x="2" y="2"></rect>
              <rect height="8" rx="2" ry="2" width="20" x="2" y="14"></rect>
              <line x1="6" x2="6.01" y1="6" y2="6"></line>
              <line x1="6" x2="6.01" y1="18" y2="18"></line>
            </svg>
            <h3 className="text-sm font-bold text-slate-900">Network NOC Ops</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Central NOC monitoring 28 campus AP controllers. High packet drop escalations are prioritized.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="flex items-center space-x-2.5 text-slate-900">
            <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
            <h3 className="text-sm font-bold text-slate-900">Audit Verification</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every completed ticket prompts a digital sign-off from student before ticket ledger locks.
          </p>
        </div>
      </section>

      {/* PageFooter */}
      <footer className="w-full bg-[#f8fafc] border-t border-slate-200/70 py-6 mt-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[11px] font-semibold tracking-wider text-slate-600 uppercase font-mono">
            © CAMPUS RESOLVE OPERATIONS • REAL-TIME CAMPUS SYNC • DETERMINISTIC PRIORITY ALGORITHM V2.4
          </p>
        </div>
      </footer>
    </main>
  );
};
