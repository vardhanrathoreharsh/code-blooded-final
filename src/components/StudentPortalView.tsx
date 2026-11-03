import React, { useState } from 'react';
import { CategoryType, Complaint } from '../types';

interface StudentPortalViewProps {
  complaints: Complaint[];
  onOpenRaiseModal: () => void;
  onSelectTicket: (ticket: Complaint) => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  complaints,
  onOpenRaiseModal,
  onSelectTicket,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');

  // Student portal focuses on tickets submitted by student (or the student view of active tickets)
  const studentTickets = complaints.filter(
    (c) =>
      ['C01', 'C02', 'C03', 'C04', 'C05'].includes(c.id) ||
      c.reportedBy.includes('Student') ||
      c.reportedBy.includes('Alex Chen')
  );

  const filteredTickets = studentTickets.filter((c) => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  const totalCount = studentTickets.length;
  const pendingCount = studentTickets.filter((c) => c.status === 'Raised').length;
  const inProgressCount = studentTickets.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = studentTickets.filter((c) => c.status === 'Resolved').length;

  const getCategoryCount = (cat: CategoryType | 'All') => {
    if (cat === 'All') return studentTickets.length;
    return studentTickets.filter((c) => c.category === cat).length;
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
            className="inline-flex items-center px-4 py-2.5 rounded-md bg-[#102a43] hover:bg-[#0c1f33] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-xs active:scale-95"
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

      {/* SubmissionLedgerSection */}
      <section className="space-y-4">
        {/* Filter Bar & Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2.5">
            <h2 className="text-base font-bold text-slate-900 tracking-tight uppercase">
              MY SUBMISSION LEDGER
            </h2>
            <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-200/70 text-slate-600 font-mono">
              {filteredTickets.length} COMPLAINTS
            </span>
          </div>

          {/* Filter Tags */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-mono">
            {(['All', 'Wi-Fi', 'Hostel', 'Classroom', 'Laboratory'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap ${
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

        {/* Ticket List Container */}
        <div className="space-y-3">
          {filteredTickets.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-slate-500 font-mono text-xs">
              No complaints in this category ledger.
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <article
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className="bg-white rounded-lg border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 font-mono">
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

                    <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium pt-0.5">
                      <div className="flex items-center space-x-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                          <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                        <span>{ticket.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge Right */}
                  <div className="sm:self-center flex-shrink-0">
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
            ))
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
