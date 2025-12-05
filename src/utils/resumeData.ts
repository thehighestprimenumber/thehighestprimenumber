import resumeData from "../../data/resume.json";

export interface Achievement {
  headline: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string;
  achievements: Achievement[];
  technologies: string[];
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    linkedin: string;
    website: string;
    summary: string;
    summaryExtended: string;
  };
  softSkills: string[];
  languages: Array<{ name: string; level: string }>;
  experience: Experience[];
}

export const resume: ResumeData = resumeData as ResumeData;

export default resume;
