import React from 'react';
import { ViewMode } from '../types';

interface RoleSelectionViewProps {
  onRequestLogin: (role: 'student' | 'admin') => void;
  totalComplaints: number;
  pendingCount: number;
}

export const RoleSelectionView: React.FC<RoleSelectionViewProps> = ({
  onRequestLogin,
  totalComplaints,
  pendingCount,
}) => {
  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10 w-full flex-grow flex flex-col justify-between">
      {/* Hero Header & Global Metrics */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        {/* Precision Tag Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-[11px] font-mono text-slate-600 mb-4 tracking-wider uppercase">
          <svg className="w-3.5 h-3.5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h8m-8 6h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>Deterministic Urgency Engine • Multi-Tenant Access Control</span>
        </div>

        {/* Main Portal Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          Campus Operations &amp; Triage Portal
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto mb-6">
          Select your authorized role to enter real-time incident reporting, deterministic priority queues, or facilities resolution analytics.
        </p>

        {/* Real-time Metrics Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[12px]">
          <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-900"></span>
            <span>
              <strong>{totalComplaints}</strong> Active Submissions
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-rose-50/80 border border-rose-200/80 text-rose-800 px-3 py-1 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span>
              <strong>{pendingCount}</strong> SLA Escalations
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-900 px-3 py-1 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>
              <strong>94.2%</strong> Resolution Index
            </span>
          </div>
        </div>
      </div>

      {/* Dual Role Access Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 items-stretch">
        {/* Student Access Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                  <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 14l9-5-9-5-9 5 9 5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Portal Tier • 01</p>
                  <h2 className="text-xl font-bold text-slate-900">Student Access</h2>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
                ⚡ FAST-REPORT
              </span>
            </div>

            {/* Preview Banner */}
            <div className="relative rounded-lg overflow-hidden h-40 sm:h-44 mb-5 bg-slate-900 group">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-102 transition-transform duration-500"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQBkkyaWVJMMN0hPAEV9n-ugWqckfoP4XCLSF-ADTv7xkpMXZbr_Id4mKMeji_o641i2pJw8qmzGVnZE86rLAPUcV15kIduxE5bS9MH_ESCrDzj0cAUUPfDPPlYyu4LYcb-xVjQTEiN8DSGn20x3wkOWdozohmglg5-GWtbJoBbi4OKX0CUWVm2lT8AYQ1SF-TjaVrrJENxcAPIATQ7QHGmqVaolokTUI4zJNepJLJ')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-wider text-slate-200 uppercase font-semibold">
                CAMPUS HUB • RESIDENTIAL • LECTURE HALLS
              </div>
            </div>

            {/* Feature Description */}
            <h3 className="text-base font-semibold text-slate-900 mb-1.5">
              Report &amp; Track Campus Facilities
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-5">
              Submit urgent infrastructure tickets across Wi-Fi networks, classroom AV equipment, laboratory instrumentation, and hostel facilities. Get instant deterministic tracking and live status push alerts.
            </p>

            {/* Module Feature Badges */}
            <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-slate-700">
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-md">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>Wi-Fi &amp; Networks</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-md">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>Classroom AV</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-md">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>Lab Instruments</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-md">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>Hostel Amenities</span>
              </div>
            </div>
          </div>

          {/* Action & Metadata Footer */}
          <div>
            <button
              onClick={() => onRequestLogin('student')}
              className="w-full bg-[#11243e] hover:bg-[#0b1728] text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-sm mb-3 group cursor-pointer"
              type="button"
            >
              <span className="tracking-wide text-xs sm:text-sm font-semibold uppercase">LOGIN AS STUDENT</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>SSO via University Portal</span>
              <span>Instant Ticket ID Gen</span>
            </div>
          </div>
        </div>

        {/* Administrator Center Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                  <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-rose-600 font-semibold">Admin Tier • 02</p>
                  <h2 className="text-xl font-bold text-slate-900">Administrator Center</h2>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                • SLA CONTROL
              </span>
            </div>

            {/* Preview Banner */}
            <div className="relative rounded-lg overflow-hidden h-40 sm:h-44 mb-5 bg-slate-900 group">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-102 transition-transform duration-500"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOs0FycvytxJX2qJX8wQXxBJEY4SLHzAJekT6FE95Qsva6SICfI9o71HxbHL3AfRH4WxvLnKrxp29XwRXNYkNlUyZssFi94QvSNDTn18_DSR1hgC4PG8CN9YJJ2frscrntHVsYNThGhFfsgtIO6OAe8j8rBp50hQ7fI_MygQCDg8SZl-9397QCky9c83uRQSfQYQ6rvKUeh_gASMCIcZ7XLBuXfZrG-8S6bl744twX')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-wider text-slate-200 uppercase font-semibold">
                FACILITIES DISPATCH • URGENCY ENGINE • ESCALATION MATRIX
              </div>
            </div>

            {/* Feature Description */}
            <h3 className="text-base font-semibold text-slate-900 mb-1.5">
              Triage Engine &amp; Facility Resolution
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-5">
              Execute deterministic SLA queues, reassign maintenance priority scores via the algorithmic engine, dispatch field engineers, and oversee active campus infrastructure ledgers in real time.
            </p>

            {/* Module Feature Badges */}
            <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-slate-700">
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-md">
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>Urgency Score Calc</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-md">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>SLA 48h Escalations</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-md">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>Engineer Dispatch</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-md">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span>Ledger &amp; Audit Logs</span>
              </div>
            </div>
          </div>

          {/* Action & Metadata Footer */}
          <div>
            <button
              onClick={() => onRequestLogin('admin')}
              className="w-full bg-blue-900 hover:bg-[#0b1728] text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-sm mb-3 group cursor-pointer"
              type="button"
            >
              <span className="tracking-wide text-xs sm:text-sm font-semibold uppercase">LOGIN AS ADMINISTRATOR</span>
              <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Privileged Credentials Required</span>
              <span>Deterministic Matrix v2.4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Equation Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Priority Resolution Formulation</h4>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-bold">
                AUTO-CALC
              </span>
            </div>
            <p className="font-mono text-xs text-slate-600 mt-0.5">
              Score = Category Weight (Lab: 3, Wi-Fi: 2, Hostel: 2, Class: 1) + floor(Hours Pending / 24)
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-[11px] font-mono border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-between md:justify-end">
          <div>
            <span className="text-slate-400 block uppercase text-[9px]">NETWORK SYNC</span>
            <span className="text-slate-700 font-semibold">SYNCHRONIZED (0.04s)</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block uppercase text-[9px]">DATA PERSISTENCE</span>
            <span className="text-rose-600 font-semibold">LOCAL • REAL-TIME</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="border-t border-slate-200 bg-white -mx-4 sm:-mx-6 -mb-8 sm:-mb-10 px-4 sm:px-6 mt-4">
        <div className="max-w-[1400px] mx-auto py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
          <div className="flex items-center space-x-2">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span>For facility emergencies involving life safety, dial Campus Security Dispatch at x4911 immediately.</span>
          </div>
          <div>
            <span>BUILD ID: 2025.04.REC-991 • SOC2 COMPLIANT</span>
          </div>
        </div>
        <div className="border-t border-slate-100 py-3 bg-slate-50/70 text-center text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          © Campus Resolve Operations • Real-time Campus Sync • Deterministic Priority Algorithm v2.4
        </div>
      </footer>
    </main>
  );
};
