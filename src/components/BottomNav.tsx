import React from 'react';
import { ViewMode } from '../types';

interface BottomNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenRaiseModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenRaiseModal,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-40 bg-white border-t border-slate-200 shadow-lg">
      <div className="flex items-center justify-around h-16 px-2">
        {/* Dashboard */}
        <button
          onClick={() => onNavigate('student-portal')}
          className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] px-2 transition-colors flex-1 ${
            currentView === 'student-portal'
              ? 'text-[#1e3a8a] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">grid_view</span>
          <span className="text-[10px] mt-0.5 tracking-tight uppercase font-medium">Dashboard</span>
        </button>

        {/* Queue */}
        <button
          onClick={() => onNavigate('admin-triage')}
          className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] px-2 transition-colors flex-1 ${
            currentView === 'admin-triage'
              ? 'text-[#1e3a8a] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">inbox</span>
          <span className="text-[10px] mt-0.5 tracking-tight uppercase font-medium">Queue</span>
        </button>

        {/* Raise Complain */}
        <button
          onClick={onOpenRaiseModal}
          className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] px-2 text-[#1e3a8a] hover:text-blue-900 transition-colors flex-1"
        >
          <div className="w-8 h-8 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[20px]">add</span>
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight uppercase font-bold text-[#1e3a8a]">
            Raise
          </span>
        </button>

        {/* Roles */}
        <button
          onClick={() => onNavigate('role-selection')}
          className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] px-2 transition-colors flex-1 ${
            currentView === 'role-selection'
              ? 'text-[#1e3a8a] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
          <span className="text-[10px] mt-0.5 tracking-tight uppercase font-medium">Roles</span>
        </button>
      </div>
    </nav>
  );
};
