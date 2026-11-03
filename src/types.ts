export type CategoryType = 'Wi-Fi' | 'Hostel' | 'Classroom' | 'Laboratory';

export type StatusType = 'Raised' | 'In Progress' | 'Resolved';

export interface Complaint {
  id: string;
  category: CategoryType;
  desc: string;
  location: string;
  hoursPending: number;
  weight: number;
  score: number;
  status: StatusType;
  createdAt: string;
  reportedBy: string;
  assignedTeam?: string;
  priorityTag?: string;
  studentSignOff?: boolean;
}

export type ViewMode = 'role-selection' | 'student-portal' | 'admin-triage';
