import React from 'react';
import { Complaint, StatusType } from '../types';

interface TicketDetailModalProps {
  ticket: Complaint | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: StatusType) => void;
  isAdministrator?: boolean;
  onSignOff?: (id: string) => void;
}

export const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  ticket,
  onClose,
  onUpdateStatus,
  isAdministrator = false,
}) => {
  if (!ticket) return null;

  const hoursDays = Math.floor(ticket.hoursPending / 24);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl border border-slate-200/90 shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="font-mono text-xs font-bold text-slate-800 bg-slate-200 border border-slate-300 px-2 py-0.5 rounded">
              {ticket.id}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                  {ticket.category} • +{ticket.weight} Weight
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    ticket.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : ticket.status === 'In Progress'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-600 border border-rose-200'
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              {ticket.desc}
            </h4>
            <div className="flex items-center space-x-3 text-slate-500 font-medium pt-2 text-[11px]">
              <div className="flex items-center space-x-1">
                <span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
                <span>{ticket.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1 font-mono">
                <span className="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
                <span>{ticket.hoursPending}h pending</span>
              </div>
            </div>
          </div>

          {/* Urgency Formula Breakdown */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">
                Deterministic Urgency Score
              </span>
              <span className="text-sm font-extrabold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                Score {ticket.score.toFixed(1)}
              </span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Category Weight ({ticket.category}):</span>
                <span className="font-bold text-slate-800">+{ticket.weight}</span>
              </div>
              <div className="flex justify-between">
                <span>Aging Factor floor({ticket.hoursPending}h / 24):</span>
                <span className="font-bold text-slate-800">+{hoursDays}</span>
              </div>
              <div className="border-t border-slate-200 pt-1 flex justify-between font-bold text-slate-900">
                <span>Total Urgency Metric:</span>
                <span>{ticket.score.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Operational Meta */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block uppercase text-[10px]">Student / Reporter</span>
              <span className="font-semibold text-slate-800">
                {ticket.studentName || ticket.reportedBy}
              </span>
              {ticket.enrollmentNo && (
                <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                  Enr: {ticket.enrollmentNo}
                </span>
              )}
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block uppercase text-[10px]">Category &amp; Dispatch</span>
              <span className="font-semibold text-slate-800">
                {ticket.otherCategory ? `${ticket.category} (${ticket.otherCategory})` : ticket.category}
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                {ticket.assignedTeam || 'Facilities Dispatch'}
              </span>
            </div>
          </div>

          {/* CONDITIONAL ACTION STATUS CONTROL:
              Only visible to Administrators.
              In the Student Portal, students CANNOT mark complaints as completed, in progress, or raised. */}
          {isAdministrator ? (
            <div className="pt-2 border-t border-slate-200">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Administrator Action Status Control
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateStatus(ticket.id, 'Raised')}
                  className={`py-2 px-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider border transition-all cursor-pointer ${
                    ticket.status === 'Raised'
                      ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Mark Raised
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateStatus(ticket.id, 'In Progress')}
                  className={`py-2 px-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider border transition-all cursor-pointer ${
                    ticket.status === 'In Progress'
                      ? 'bg-amber-50 text-amber-700 border-amber-300 ring-2 ring-amber-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  In Progress
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateStatus(ticket.id, 'Resolved')}
                  className={`py-2 px-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider border transition-all cursor-pointer ${
                    ticket.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          ) : (
            /* Student View: Read-Only Incident Tracking Status */
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Live Incident Tracking
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Read-Only • Managed by Dispatch
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-slate-50 border-slate-200/90 flex items-start space-x-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                    ticket.status === 'Resolved'
                      ? 'bg-emerald-600'
                      : ticket.status === 'In Progress'
                      ? 'bg-amber-500 animate-pulse'
                      : 'bg-rose-500 animate-pulse'
                  }`}
                />
                <div className="flex-1">
                  <p className="font-bold text-xs text-slate-800">
                    {ticket.status === 'Raised' && 'Status: Raised (Awaiting Maintenance Dispatch)'}
                    {ticket.status === 'In Progress' &&
                      `Status: In Progress — Assigned to ${ticket.assignedTeam || 'Facilities Team'}`}
                    {ticket.status === 'Resolved' && 'Status: Successfully Resolved by Facilities Team'}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Ticket status updates are authoritative and managed exclusively by Facilities &amp; NOC administrators.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Audit Sign-off info for resolved complaints */}
          {ticket.status === 'Resolved' && (
            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-800">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <div>
                  <p className="font-bold text-[11px]">Audit Sign-off Verified</p>
                  <p className="text-[10px] text-emerald-700">Digital closure signature confirmed by student registry</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                AUDITED
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
