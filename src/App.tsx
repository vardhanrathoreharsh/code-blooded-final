/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Complaint, StatusType, ViewMode } from './types';
import { INITIAL_COMPLAINTS, calculateUrgencyScore } from './data/initialData';
import { Navbar } from './components/Navbar';
import { RoleSelectionView } from './components/RoleSelectionView';
import { StudentPortalView } from './components/StudentPortalView';
import { AdminTriageView } from './components/AdminTriageView';
import { RaiseComplaintModal } from './components/RaiseComplaintModal';
import { TicketDetailModal } from './components/TicketDetailModal';
import { BottomNav } from './components/BottomNav';

const STORAGE_KEY = 'campuspulse_facility_complaints_v2';

export default function App() {
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_COMPLAINTS;
  });

  const [currentView, setCurrentView] = useState<ViewMode>('student-portal');
  const [activeRole, setActiveRole] = useState<'student' | 'admin'>('student');
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Complaint | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    } catch {
      // Handle storage quota if any
    }
  }, [complaints]);

  // Compute next ticket ID: format "C" + 2 digits (e.g. C29)
  const nextId = React.useMemo(() => {
    let maxIdNum = 0;
    complaints.forEach((c) => {
      const match = c.id.match(/^C(\d+)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxIdNum) maxIdNum = num;
      }
    });
    const nextNum = maxIdNum + 1;
    return `C${nextNum < 10 ? '0' + nextNum : nextNum}`;
  }, [complaints]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleCreateComplaint = (newTicket: Complaint) => {
    setComplaints((prev) => [newTicket, ...prev]);
    showToast(`Ticket ${newTicket.id} logged with Urgency Score ${newTicket.score.toFixed(1)}`);
  };

  const handleUpdateStatus = (id: string, newStatus: StatusType) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updatedScore =
            newStatus === 'Resolved' ? c.score : calculateUrgencyScore(c.category, c.hoursPending);
          return {
            ...c,
            status: newStatus,
            score: updatedScore,
            studentSignOff: newStatus === 'Resolved' ? true : c.studentSignOff,
          };
        }
        return c;
      })
    );

    // Also update selectedTicket if currently viewing
    setSelectedTicket((prev) => {
      if (prev && prev.id === id) {
        return {
          ...prev,
          status: newStatus,
          studentSignOff: newStatus === 'Resolved' ? true : prev.studentSignOff,
        };
      }
      return prev;
    });

    showToast(`Ticket ${id} status updated to ${newStatus}`);
  };

  const handleRoleSelection = (role: 'student' | 'admin', view: ViewMode) => {
    setActiveRole(role);
    setCurrentView(view);
  };

  const pendingComplaintsCount = complaints.filter((c) => c.status === 'Raised').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenRaiseModal={() => setIsRaiseModalOpen(true)}
        activeRole={activeRole}
        onSwitchRole={setActiveRole}
      />

      {/* Main View Router */}
      <div className="flex-1 flex flex-col">
        {currentView === 'role-selection' && (
          <RoleSelectionView
            onSelectRole={handleRoleSelection}
            totalComplaints={complaints.length}
            pendingCount={pendingComplaintsCount}
          />
        )}

        {currentView === 'student-portal' && (
          <StudentPortalView
            complaints={complaints}
            onOpenRaiseModal={() => setIsRaiseModalOpen(true)}
            onSelectTicket={(ticket) => setSelectedTicket(ticket)}
          />
        )}

        {currentView === 'admin-triage' && (
          <AdminTriageView
            complaints={complaints}
            onOpenRaiseModal={() => setIsRaiseModalOpen(true)}
            onUpdateStatus={handleUpdateStatus}
            onSelectTicket={(ticket) => setSelectedTicket(ticket)}
          />
        )}
      </div>

      {/* Mobile Floating Bottom Bar */}
      <BottomNav
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenRaiseModal={() => setIsRaiseModalOpen(true)}
      />

      {/* Modal: Raise Complaint */}
      <RaiseComplaintModal
        isOpen={isRaiseModalOpen}
        onClose={() => setIsRaiseModalOpen(false)}
        onSubmit={handleCreateComplaint}
        nextId={nextId}
      />

      {/* Modal: Ticket Details & Timeline */}
      <TicketDetailModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 bg-[#0f2744] text-white px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 flex items-center space-x-2.5 text-xs font-mono animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
