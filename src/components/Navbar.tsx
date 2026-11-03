import React from 'react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenRaiseModal: () => void;
  activeRole: 'student' | 'admin';
  onSwitchRole: (role: 'student' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenRaiseModal,
  activeRole,
  onSwitchRole,
}) => {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Main Nav */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Logo */}
          <button
            onClick={() => onNavigate('role-selection')}
            className="flex items-center space-x-2.5 text-slate-900 group focus:outline-none"
            title="CampusPulse Gateway"
          >
            <div className="w-7 h-7 rounded-md bg-[#0f2744] flex items-center justify-center text-white shadow-xs">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-[#0f2744]">CampusPulse</span>
              <span className="text-[10px] bg-[#eef2ff] text-[#1e3a8a] border border-[#cbd5e1] rounded px-1.5 py-0.2 font-bold uppercase tracking-wider">
                Ops
              </span>
            </div>
          </button>

          {/* Main Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 text-sm font-medium">
            <button
              onClick={() => onNavigate('role-selection')}
              className={`px-3.5 py-1.5 rounded-md transition-colors ${
                currentView === 'role-selection'
                  ? 'bg-[#102a43] text-white font-medium text-xs tracking-wide shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-semibold'
              }`}
            >
              Role Selection / Access
            </button>
            <button
              onClick={() => {
                onSwitchRole('student');
                onNavigate('student-portal');
              }}
              className={`px-3.5 py-1.5 rounded-md transition-colors ${
                currentView === 'student-portal'
                  ? 'bg-[#172c47] text-white font-medium text-xs tracking-wide shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-semibold'
              }`}
            >
              Student Portal
            </button>
            <button
              onClick={() => {
                onSwitchRole('admin');
                onNavigate('admin-triage');
              }}
              className={`px-3.5 py-1.5 rounded-md transition-colors ${
                currentView === 'admin-triage'
                  ? 'bg-[#172c47] text-white font-medium text-xs tracking-wide shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-semibold'
              }`}
            >
              Administrator Triage &amp; Analytics
            </button>
          </nav>
        </div>

        {/* Right Sync Status & User Avatar */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Quick Raise Button on Desktop */}
          <button
            onClick={onOpenRaiseModal}
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md bg-[#102a43] hover:bg-[#0c1f33] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-xs"
          >
            <span className="mr-1 text-sm font-light">+</span> + Raise Complaint
          </button>

          {/* Live Sync Pill */}
          <div className="hidden min-[480px]:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600 font-medium font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden lg:inline">Local Persistence Active</span>
            <span className="lg:hidden">Local Active</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">Auto-synced</span>
          </div>

          {/* User Profile Avatar with Role Switch Tooltip */}
          <div className="relative group">
            <button
              onClick={() => {
                const nextRole = activeRole === 'student' ? 'admin' : 'student';
                onSwitchRole(nextRole);
                onNavigate(nextRole === 'student' ? 'student-portal' : 'admin-triage');
              }}
              className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-300 ring-2 ring-slate-100 flex-shrink-0 cursor-pointer block hover:ring-indigo-300 transition-all"
              title={`Logged in as ${activeRole === 'student' ? 'Alex Chen (Student)' : 'Campus Facilities Admin'}. Click to toggle role.`}
            >
              <img
                alt="User Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBUQWQH7exGu5WCRtDbJYQh_Cu34NhLn5a5IOF6Wl9S2fL1hL5YBkXol9foLkjTPRsX8GH_tPmDlXduJfbWMfktevw-Hlb5uH0iBerlQR2z7Oki30oyv4owAYVpSdrLDs4LhYbBBop3j4wyl80p13SYMpZecc22B8PBt0e7E1wbI-JpNNBkWOl__y2l_JKWZY35aJID_RHgd08yrS9ptWZYtzOWj17-oobbjF6KdCo"
              />
            </button>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-600 border-2 border-white rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Sub-status Bar for Technical Grounding */}
      <div className="border-t border-slate-100 bg-slate-50/70 text-[11px] font-mono text-slate-500 px-4 sm:px-6 lg:px-8 py-1.5 hidden md:block">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>GATEWAY NODE: CAMPUS-CORE-A1</span>
            <span className="text-slate-300">/</span>
            <span>DETERMINISTIC PRIORITY ENGINE v2.4</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 font-semibold uppercase">ACTIVE ROLE: {activeRole.toUpperCase()}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <span>SECURE INSTANCE: UNIVERSITY-WIDE SSO</span>
            <svg className="w-3.5 h-3.5 text-slate-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};
