
import { Achievement, Experience, Skill, Reference } from './types';

export const ACHIEVEMENTS: Achievement[] = [
  { title: "Gold medalist - The World Scholars Cup Regional Round", year: "2024" },
  { title: "Finalist of Aspiration (2)", year: "2023" },
  { title: "Featured in media for Cloud Seeding Research", year: "2023" },
  { title: "Certificate of Achievement – AMC", year: "Recent" },
  { title: "Certificate of Achievement – IYF", year: "2024" },
  { title: "Certificate of Achievement – Fiso MATH", year: "Recent" },
  { title: "Passed National State Exam (Grade C) – Bacii", year: "2025" },
];

export const VOLUNTEER_EXP: Experience[] = [
  {
    role: "Youth Leadership Participant",
    organization: "International Youth Fellowship",
    location: "Phnom Penh",
    period: "2024",
    description: [
      "Participate in youth leadership and personal development programs.",
      "Joined workshops in improve communication, teamwork and problem solving skills.",
      "Gained confidence, responsibility, and teamwork."
    ]
  },
  {
    role: "Event Organizer & Supervisor",
    organization: "Preah Sisowath New Generation School",
    period: "2023-2024",
    description: [
      "Helped organized and managed school event for student’s achievement fair.",
      "Helped supervising school entrance exam."
    ]
  }
];

export const INTERNSHIP_EXP: Experience[] = [
  {
    role: "Intern",
    organization: "Spring Education Center",
    location: "Phnom Penh",
    period: "2025",
    description: [
      "Improved teamwork and communication skills.",
      "Did simple office work.",
      "Built confidence and time-management."
    ]
  }
];

export const SCHOOL_CLUBS: Experience[] = [
  {
    role: "Physic Club Member",
    organization: "Preah Sisowath NGS",
    period: "2023",
    description: [
      "Hardware Assembly: Built a 4-wheel drive robot from part using an Arduino.",
      "Wireless Control: Integrated a Bluetooth module for smartphone control.",
      "Problem Solving: Wired power systems and wrote custom code."
    ]
  },
  {
    role: "Chemistry Club Member",
    organization: "Preah Sisowath NGS",
    period: "2024",
    description: [
      "Solution Mixing: Formulated sanitizing alcohol with specific scents.",
      "Variety Development: Produced line of 5 scents (Jasmine, Lavender, Apple).",
      "Product Safety: Managed bottling and quality check processes."
    ]
  }
];

export const CORE_SKILLS: Skill[] = [
  { name: "Management", level: 90 },
  { name: "Creativity", level: 95 },
  { name: "Digital Marketing", level: 85 },
  { name: "Negotiation", level: 80 },
  { name: "Critical Thinking", level: 90 },
  { name: "Leadership", level: 95 }
];

export const COMPUTER_SKILLS = ["AutoCAD", "Adobe Photoshop", "Microsoft Application", "Capcut", "Camtasia", "Canva"];

export const REFERENCES: Reference[] = [
  {
    name: "Ms. Phuong Uongnay",
    title: "Business Development Manager",
    org: "Spring Education Center",
    phone: "011 75 72 74",
    email: "uongnayphuong@gmail.com"
  },
  {
    name: "Mr. Sam Kamsann",
    title: "Head of NGS",
    org: "Preah Sisowath",
    phone: "089 899 632",
    email: "info@preahsisowath.edu.kh"
  }
];
