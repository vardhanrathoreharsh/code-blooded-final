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
import { AuthLoginModal, AuthRole } from './components/AuthLoginModal';

const STORAGE_KEY = 'campuspulse_facility_complaints_v2';
const USER_KEY = 'campuspulse_auth_user_v2';

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

  // Current logged in user info
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string } | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedUser) return JSON.parse(savedUser);
    } catch {
      // Ignore
    }
    return { id: 'ENR-2024-8841', name: 'Alex Chen' };
  });

  const [currentView, setCurrentView] = useState<ViewMode>('student-portal');
  const [activeRole, setActiveRole] = useState<'student' | 'admin'>('student');
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<AuthRole | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Complaint | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync complaints to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    } catch {
      // Handle storage quota if any
    }
  }, [complaints]);

  // Sync user to local storage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch {
      // Ignore
    }
  }, [currentUser]);

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
    }, 3400);
  };

  const handleCreateComplaint = (newTicket: Complaint) => {
    const personalizedTicket: Complaint = {
      ...newTicket,
      reportedBy: newTicket.studentName
        ? `${newTicket.studentName} (${newTicket.enrollmentNo || 'Student'})`
        : currentUser
        ? `${currentUser.name} (${currentUser.id})`
        : 'Student User',
    };
    setComplaints((prev) => [personalizedTicket, ...prev]);
    showToast(`Ticket ${personalizedTicket.id} logged with Urgency Score ${personalizedTicket.score.toFixed(1)}`);
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

  // Called when user clicks "LOGIN AS STUDENT" or "LOGIN AS ADMINISTRATOR" in Role Selection
  const handleRequestLogin = (role: AuthRole) => {
    setAuthModalRole(role);
  };

  // Called when login is successfully completed in AuthLoginModal
  const handleLoginSuccess = (role: AuthRole, userDetails: { id: string; name: string }) => {
    setCurrentUser(userDetails);
    setActiveRole(role);
    if (role === 'student') {
      setCurrentView('student-portal');
      showToast(`Welcome ${userDetails.name}! Authenticated with Enrollment No: ${userDetails.id}`);
    } else {
      setCurrentView('admin-triage');
      showToast(`Welcome Administrator! Authenticated with Staff ID: ${userDetails.id}`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('role-selection');
    showToast('Signed out of campus session. Select your role to login.');
  };

  const pendingComplaintsCount = complaints.filter((c) => c.status === 'Raised').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onRequestLogin={handleRequestLogin}
        onOpenRaiseModal={() => setIsRaiseModalOpen(true)}
        activeRole={activeRole}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSwitchRole={(role) => {
          setActiveRole(role);
          setCurrentView(role === 'student' ? 'student-portal' : 'admin-triage');
        }}
      />

      {/* Main View Router */}
      <div className="flex-1 flex flex-col">
        {currentView === 'role-selection' && (
          <RoleSelectionView
            onRequestLogin={handleRequestLogin}
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
        onRequestLogin={handleRequestLogin}
        onOpenRaiseModal={() => setIsRaiseModalOpen(true)}
      />

      {/* Modal: Student & Administrator Authentication */}
      <AuthLoginModal
        isOpen={authModalRole !== null}
        role={authModalRole}
        onClose={() => setAuthModalRole(null)}
        onSuccess={handleLoginSuccess}
      />

      {/* Modal: Raise Complaint */}
      <RaiseComplaintModal
        isOpen={isRaiseModalOpen}
        onClose={() => setIsRaiseModalOpen(false)}
        onSubmit={handleCreateComplaint}
        nextId={nextId}
        currentStudent={currentUser}
      />

      {/* Modal: Ticket Details & Timeline */}
      <TicketDetailModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onUpdateStatus={handleUpdateStatus}
        isAdministrator={currentView === 'admin-triage' || activeRole === 'admin'}
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
