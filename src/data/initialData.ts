import { CategoryType, Complaint } from '../types';

export const CATEGORY_WEIGHTS: Record<CategoryType, number> = {
  Laboratory: 3,
  'Wi-Fi': 2,
  Hostel: 2,
  Classroom: 1,
  Other: 1,
};

export function calculateUrgencyScore(category: CategoryType, hoursPending: number): number {
  const weight = CATEGORY_WEIGHTS[category] || 1;
  const hoursFactor = Math.floor(hoursPending / 24);
  return weight + hoursFactor;
}

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'C03',
    category: 'Classroom',
    desc: 'Overhead projector lamp flickering and ballast failing in Hall 102',
    location: 'Hall 102, West Wing',
    hoursPending: 72,
    weight: 1,
    score: 4.0, // 1 + floor(72/24) = 4
    status: 'Raised',
    createdAt: '72h ago',
    reportedBy: 'Alex Chen (Student)',
    assignedTeam: 'Classroom AV Ops',
    priorityTag: 'Oldest Submission Priority',
    upvotes: 52
  },
  {
    id: 'C01',
    category: 'Wi-Fi',
    desc: '5GHz AP drops constantly in Block B 3rd floor corridor',
    location: 'Block B 3rd Floor Corridor',
    hoursPending: 48,
    weight: 2,
    score: 4.0, // 2 + floor(48/24) = 4
    status: 'Raised',
    createdAt: '48h ago',
    reportedBy: 'Devon Vance (Student)',
    assignedTeam: 'Network NOC',
    priorityTag: 'High Impact',
    upvotes: 68
  },
  {
    id: 'C02',
    category: 'Hostel',
    desc: 'Water heater tripping main breaker in Wing C 2nd floor bathroom',
    location: 'Wing C 2nd Floor',
    hoursPending: 8,
    weight: 2,
    score: 2.0, // 2 + floor(8/24) = 2
    status: 'In Progress',
    createdAt: '8h ago',
    reportedBy: 'Sara Lin (Student)',
    assignedTeam: 'Electricians Alpha',
    priorityTag: 'Normal Escalation',
    upvotes: 34
  },
  {
    id: 'C05',
    category: 'Hostel',
    desc: 'Window latch stuck open in Room 304 North block during heavy rainfall',
    location: 'North Block, Room 304',
    hoursPending: 4,
    weight: 2,
    score: 2.0, // 2 + floor(4/24) = 2
    status: 'Raised',
    createdAt: '4h ago',
    reportedBy: 'Marcus Brody (Student)',
    assignedTeam: 'Facilities Maintenance',
    priorityTag: 'Normal Escalation',
    upvotes: 27
  },
  {
    id: 'C04',
    category: 'Laboratory',
    desc: 'Centrifuge unit 4 displaying recurring error code E-12',
    location: 'Biotech Lab 3',
    hoursPending: 96,
    weight: 3,
    score: 7.0, // 3 + floor(96/24) = 7
    status: 'Resolved',
    createdAt: '96h ago (Closed)',
    reportedBy: 'Dr. Anita Ray (Faculty/Lab)',
    assignedTeam: 'Precision Tech Field Services',
    priorityTag: 'Resolved',
    upvotes: 19
  },
  // Additional system complaints across campus to populate the 28 total tickets
  {
    id: 'C06',
    category: 'Wi-Fi',
    desc: 'Core gateway packet loss in Science Library quiet reading hall',
    location: 'Science Library Level 2',
    hoursPending: 40,
    weight: 2,
    score: 3.0,
    status: 'Raised',
    createdAt: '40h ago',
    reportedBy: 'Priya Patel',
    assignedTeam: 'Network NOC'
  },
  {
    id: 'C07',
    category: 'Wi-Fi',
    desc: 'DNS timeout loop affecting student union dining access point',
    location: 'Student Union Ground Floor',
    hoursPending: 28,
    weight: 2,
    score: 3.0,
    status: 'Raised',
    createdAt: '28h ago',
    reportedBy: 'Jordan Hayes',
    assignedTeam: 'Network NOC'
  },
  {
    id: 'C08',
    category: 'Wi-Fi',
    desc: 'Roaming authentication failure when switching between East Quad nodes',
    location: 'East Quad Walkway',
    hoursPending: 16,
    weight: 2,
    score: 2.0,
    status: 'Raised',
    createdAt: '16h ago',
    reportedBy: 'Samira Gomez',
    assignedTeam: 'Network NOC'
  },
  {
    id: 'C09',
    category: 'Wi-Fi',
    desc: 'High interference on 2.4GHz channel 6 in Engineering Lab annex',
    location: 'Engineering Building Annex 1',
    hoursPending: 12,
    weight: 2,
    score: 2.0,
    status: 'In Progress',
    createdAt: '12h ago',
    reportedBy: 'Liam O’Connor',
    assignedTeam: 'Network NOC'
  },
  {
    id: 'C10',
    category: 'Wi-Fi',
    desc: 'SSID broadcast intermittent in Graduate Residence Hall South',
    location: 'Grad Residence South',
    hoursPending: 6,
    weight: 2,
    score: 2.0,
    status: 'Raised',
    createdAt: '6h ago',
    reportedBy: 'Chloe Martin',
    assignedTeam: 'Network NOC'
  },
  {
    id: 'C11',
    category: 'Wi-Fi',
    desc: 'PoE injector power cycle needed for outdoor sports quad repeater',
    location: 'Sports Field Stadium Deck',
    hoursPending: 52,
    weight: 2,
    score: 4.0,
    status: 'Raised',
    createdAt: '52h ago',
    reportedBy: 'Coach Davis',
    assignedTeam: 'Network NOC'
  },
  {
    id: 'C12',
    category: 'Wi-Fi',
    desc: 'Portal captive login redirect fails on iOS Safari devices',
    location: 'Campus Wide',
    hoursPending: 74,
    weight: 2,
    score: 5.0,
    status: 'Raised',
    createdAt: '74h ago',
    reportedBy: 'Student Council',
    assignedTeam: 'Network NOC'
  },
  {
    id: 'C13',
    category: 'Wi-Fi',
    desc: 'Switch port link speed downgraded to 100Mbps in Arts Studio',
    location: 'Fine Arts Studio 4',
    hoursPending: 80,
    weight: 2,
    score: 5.0,
    status: 'Resolved',
    createdAt: '80h ago',
    reportedBy: 'Prof. Miller',
    assignedTeam: 'Network NOC'
  },
  {
    id: 'C14',
    category: 'Wi-Fi',
    desc: 'Cable crimp loose on ceiling mount AP in Math Department',
    location: 'Math Building 2nd Floor',
    hoursPending: 88,
    weight: 2,
    score: 5.0,
    status: 'Resolved',
    createdAt: '88h ago',
    reportedBy: 'Kavita Rao',
    assignedTeam: 'Network NOC'
  },
  {
    id: 'C15',
    category: 'Wi-Fi',
    desc: 'Bandwidth throttling threshold triggered incorrectly on floor 3',
    location: 'Dorm Block C',
    hoursPending: 60,
    weight: 2,
    score: 4.0,
    status: 'Resolved',
    createdAt: '60h ago',
    reportedBy: 'NOC Automated Telemetry',
    assignedTeam: 'Network NOC'
  },
  // Hostel (7 total: C02, C05 + 5 more)
  {
    id: 'C16',
    category: 'Hostel',
    desc: 'HVAC radiator clanking loudly during overnight heating cycles',
    location: 'Residence Hall Block D, Room 210',
    hoursPending: 30,
    weight: 2,
    score: 3.0,
    status: 'Raised',
    createdAt: '30h ago',
    reportedBy: 'Noah Scott',
    assignedTeam: 'HVAC Services'
  },
  {
    id: 'C17',
    category: 'Hostel',
    desc: 'Bathroom drain backup on Wing B 1st floor common washrooms',
    location: 'Wing B 1st Floor Washroom',
    hoursPending: 14,
    weight: 2,
    score: 2.0,
    status: 'Raised',
    createdAt: '14h ago',
    reportedBy: 'Hannah Schmidt',
    assignedTeam: 'Plumbing Services'
  },
  {
    id: 'C18',
    category: 'Hostel',
    desc: 'Electronic smart door lock battery dead on Room 418',
    location: 'North Block Room 418',
    hoursPending: 2,
    weight: 2,
    score: 2.0,
    status: 'In Progress',
    createdAt: '2h ago',
    reportedBy: 'Lucas Bennett',
    assignedTeam: 'Campus Security & Access'
  },
  {
    id: 'C19',
    category: 'Hostel',
    desc: 'Common laundry machine #3 leaking during rinse cycle',
    location: 'Basement Laundry Room 1',
    hoursPending: 46,
    weight: 2,
    score: 3.0,
    status: 'Raised',
    createdAt: '46h ago',
    reportedBy: 'Maya Robinson',
    assignedTeam: 'Appliance Maintenance'
  },
  {
    id: 'C20',
    category: 'Hostel',
    desc: 'Main entryway automatic door glass sensor recalibration',
    location: 'Hostel West Entrance',
    hoursPending: 90,
    weight: 2,
    score: 5.0,
    status: 'Resolved',
    createdAt: '90h ago',
    reportedBy: 'Hostel Warden',
    assignedTeam: 'Facilities Maintenance'
  },
  // Classroom (5 total: C03 + 4 more)
  {
    id: 'C21',
    category: 'Classroom',
    desc: 'Motorized projection screen stuck half-way in Lecture Theater 3',
    location: 'Lecture Theater 3, Central Quad',
    hoursPending: 50,
    weight: 1,
    score: 3.0,
    status: 'Raised',
    createdAt: '50h ago',
    reportedBy: 'Prof. Alistair Finch',
    assignedTeam: 'Classroom AV Ops'
  },
  {
    id: 'C22',
    category: 'Classroom',
    desc: 'HDMI audio lag on instructor lectern matrix switcher',
    location: 'Humanities Seminar Room 204',
    hoursPending: 22,
    weight: 1,
    score: 1.0,
    status: 'In Progress',
    createdAt: '22h ago',
    reportedBy: 'Zack Taylor',
    assignedTeam: 'Classroom AV Ops'
  },
  {
    id: 'C23',
    category: 'Classroom',
    desc: 'Wireless lapel microphone buzzing with RF feedback',
    location: 'Auditorium Hall B',
    hoursPending: 10,
    weight: 1,
    score: 1.0,
    status: 'Raised',
    createdAt: '10h ago',
    reportedBy: 'Guest Lecturer Support',
    assignedTeam: 'Classroom AV Ops'
  },
  {
    id: 'C24',
    category: 'Classroom',
    desc: 'Acoustic wall panel detached near rear emergency exit',
    location: 'Hall 105',
    hoursPending: 70,
    weight: 1,
    score: 3.0,
    status: 'Resolved',
    createdAt: '70h ago',
    reportedBy: 'Building Inspector',
    assignedTeam: 'Carpentry Services'
  },
  // Laboratory (5 total: C04 + 4 more)
  {
    id: 'C25',
    category: 'Laboratory',
    desc: 'Fume hood #2 face velocity sensor alarming below 100 FPM',
    location: 'Organic Chemistry Lab 4B',
    hoursPending: 26,
    weight: 3,
    score: 4.0,
    status: 'Raised',
    createdAt: '26h ago',
    reportedBy: 'Lab Manager Harris',
    assignedTeam: 'Lab Safety & Ventilation'
  },
  {
    id: 'C26',
    category: 'Laboratory',
    desc: 'Ultra-low temperature -80C freezer high temperature alarm',
    location: 'Cryogenics Storage Room C',
    hoursPending: 6,
    weight: 3,
    score: 3.0,
    status: 'In Progress',
    createdAt: '6h ago',
    reportedBy: 'Bio-Bank Curator',
    assignedTeam: 'Refrigeration Tech'
  },
  {
    id: 'C27',
    category: 'Laboratory',
    desc: 'Deionized water filtration loop pressure drop below 40 PSI',
    location: 'Analytical Chemistry Wing',
    hoursPending: 18,
    weight: 3,
    score: 3.0,
    status: 'Raised',
    createdAt: '18h ago',
    reportedBy: 'Researcher Kim',
    assignedTeam: 'Water Filtration Tech'
  },
  {
    id: 'C28',
    category: 'Laboratory',
    desc: 'Autoclave steam pressure relief valve gasket replacement',
    location: 'Microbiology Prep Room 1',
    hoursPending: 100,
    weight: 3,
    score: 7.0,
    status: 'Resolved',
    createdAt: '100h ago',
    reportedBy: 'Sterilization Officer',
    assignedTeam: 'Precision Tech Field Services'
  }
];
