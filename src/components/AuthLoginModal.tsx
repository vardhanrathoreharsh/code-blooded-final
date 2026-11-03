import React, { useState, useEffect } from 'react';

export type AuthRole = 'student' | 'admin';

interface AuthLoginModalProps {
  isOpen: boolean;
  role: AuthRole | null;
  onClose: () => void;
  onSuccess: (role: AuthRole, userDetails: { id: string; name: string }) => void;
}

export const AuthLoginModal: React.FC<AuthLoginModalProps> = ({
  isOpen,
  role,
  onClose,
  onSuccess,
}) => {
  // Student state: Enrollment No + Password + Display Name
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [studentName, setStudentName] = useState('Alex Chen');

  // Admin state: Staff ID + Password
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setIsLoading(false);
      setShowStudentPassword(false);
      setShowPassword(false);
      if (role === 'student') {
        setEnrollmentNo('');
        setStudentPassword('');
        setStudentName('Alex Chen');
      } else {
        setStaffId('');
        setPassword('');
      }
    }
  }, [isOpen, role]);

  if (!isOpen || !role) return null;

  const isStudent = role === 'student';

  const handleQuickDemoFill = () => {
    setError(null);
    if (isStudent) {
      setEnrollmentNo('ENR-2024-8841');
      setStudentPassword('student@pulse2024');
      setStudentName('Alex Chen');
    } else {
      setStaffId('ADM-8904');
      setPassword('admin@pulse2025');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isStudent) {
      const cleanEnr = enrollmentNo.trim().toUpperCase();
      const cleanPass = studentPassword.trim();

      if (!cleanEnr) {
        setError('Please enter your university Enrollment Number.');
        return;
      }
      if (cleanEnr.length < 4) {
        setError('Enrollment Number must be at least 4 characters.');
        return;
      }
      if (!cleanPass) {
        setError('Please enter your student portal password.');
        return;
      }
      if (cleanPass.length < 4) {
        setError('Student password must be at least 4 characters.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onSuccess('student', {
          id: cleanEnr,
          name: studentName.trim() || 'Student User',
        });
        onClose();
      }, 350);
    } else {
      const cleanStaff = staffId.trim().toUpperCase();
      const cleanPass = password.trim();

      if (!cleanStaff) {
        setError('Please enter your Administrator Staff ID.');
        return;
      }
      if (!cleanPass) {
        setError('Please enter your secure access password.');
        return;
      }
      if (cleanPass.length < 4) {
        setError('Password must contain at least 4 characters.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onSuccess('admin', {
          id: cleanStaff,
          name: 'Facilities Admin Dispatcher',
        });
        onClose();
      }, 350);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl w-full max-w-md overflow-hidden flex flex-col transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Banner */}
        <div
          className={`px-6 py-5 border-b flex items-center justify-between ${
            isStudent
              ? 'bg-slate-900 text-white border-slate-800'
              : 'bg-[#0f1d36] text-white border-slate-800'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm text-white ${
                isStudent ? 'bg-blue-600' : 'bg-rose-600'
              }`}
            >
              {isStudent ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">
                  {isStudent ? 'Student Portal Authentication' : 'Administrator Credentials'}
                </h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                    isStudent ? 'bg-blue-950 text-blue-300 border border-blue-700' : 'bg-rose-950 text-rose-300 border border-rose-700'
                  }`}
                >
                  {isStudent ? 'Tier 01' : 'Tier 02'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono mt-0.5">
                {isStudent
                  ? 'Access Student Facility Desk & Reports'
                  : 'Deterministic Triage & Dispatch Control'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close window"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white text-slate-800">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center space-x-2 text-rose-700 text-xs font-mono">
              <span className="material-symbols-outlined text-[16px] text-rose-600 shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          {isStudent ? (
            /* Student Form: Enrollment No & Password */
            <>
              {/* Enrollment Number Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                  <span>Enrollment Number</span>
                  <span className="text-[10px] text-blue-700 font-bold">Required</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    badge
                  </span>
                  <input
                    type="text"
                    value={enrollmentNo}
                    onChange={(e) => setEnrollmentNo(e.target.value)}
                    placeholder="e.g. ENR-2024-8841 or 2024CSB1042"
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-mono uppercase tracking-wide border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 bg-white"
                    autoFocus
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Your university matriculation or hostel room assigned ID.
                </p>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                  <span>Password</span>
                  <span className="text-[10px] text-blue-700 font-bold">Required</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    lock
                  </span>
                  <input
                    type={showStudentPassword ? 'text' : 'password'}
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    placeholder="Enter student portal password..."
                    className="w-full pl-9 pr-10 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowStudentPassword(!showStudentPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    title={showStudentPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showStudentPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  University account password or default registration PIN.
                </p>
              </div>

              {/* Student Display Name (Optional) */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                  <span>Student Display Name</span>
                  <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    person
                  </span>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 bg-white"
                  />
                </div>
              </div>

              {/* SSO Campus Trust badge */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center space-x-2.5 text-[11px] text-slate-600 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span>SSO Gateway: Campus-Wide Identity Provider Verified</span>
              </div>
            </>
          ) : (
            /* Administrator Form: Staff ID and Password */
            <>
              {/* Administrator Staff ID Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                  <span>Administrator Staff ID</span>
                  <span className="text-[10px] text-rose-600 font-bold">Privileged</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    engineering
                  </span>
                  <input
                    type="text"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    placeholder="e.g. ADM-8904 or FAC-OPS-102"
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-mono uppercase tracking-wide border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 bg-white"
                    autoFocus
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Assigned facilities supervisor or network engineer ID.
                </p>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                  <span>Secure Access Password</span>
                  <span className="text-[10px] text-slate-400 font-normal">Encrypted</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter administrator password..."
                    className="w-full pl-9 pr-10 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* SOC2 Security Badge */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg flex items-center space-x-2.5 text-[11px] text-amber-900 font-mono">
                <span className="material-symbols-outlined text-[16px] text-amber-700 shrink-0">
                  security
                </span>
                <span>SOC2 Compliant • All dispatch and re-scoring actions logged.</span>
              </div>
            </>
          )}

          {/* Quick Demo Autofill Pill */}
          <div className="pt-1 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400 font-mono">Testing sandbox credentials?</span>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[11px] font-mono text-blue-900 hover:text-blue-700 font-semibold underline underline-offset-2 cursor-pointer"
            >
              Fill Demo Credentials
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={`inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                isStudent
                  ? 'bg-[#102a43] hover:bg-[#0c1f33] text-white active:scale-95'
                  : 'bg-blue-900 hover:bg-blue-950 text-white active:scale-95'
              } ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>{isStudent ? 'Continue to Student Desk' : 'Authorize Admin Access'}</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
