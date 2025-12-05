import { resume } from "./resumeData";

export interface TechExperience {
  technology: string;
  years: number;
  companies: string[];
  firstUsed: string;
  lastUsed: string;
  experiences: string[];
}

/**
 * Calculate years of experience for each technology
 * TODO: use a library to manage dates and calculate years of experience
 */
export function calculateTechExperience(): Map<string, TechExperience> {
  const techMap = new Map<string, TechExperience>();

  const parseDate = (dateStr: string): Date => {
    const [year, month] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, 1);
  };

  const monthsBetween = (start: Date, end: Date): number => {
    return (
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth())
    );
  };

  resume.experience.forEach((exp) => {
    const startDate = parseDate(exp.startDate);
    const endDate = exp.endDate ? parseDate(exp.endDate) : new Date();

    const months = Math.max(0, monthsBetween(startDate, endDate));
    const years = months / 12;

    exp.technologies.forEach((tech) => {
      const normalizedTech = tech.toLowerCase().trim();

      if (!techMap.has(normalizedTech)) {
        techMap.set(normalizedTech, {
          technology: tech,
          years: 0,
          companies: [],
          firstUsed: exp.period.split(" - ")[0],
          lastUsed: exp.period.split(" - ")[1] || "Present",
          experiences: [],
        });
      }

      const techExp = techMap.get(normalizedTech)!;
      techExp.years += years;
      if (!techExp.companies.includes(exp.company)) {
        techExp.companies.push(exp.company);
      }
      if (!techExp.experiences.includes(exp.id)) {
        techExp.experiences.push(exp.id);
      }

      // Update first/last used
      const firstDate = parseDate(exp.startDate);
      const lastDate = exp.endDate ? parseDate(exp.endDate) : new Date();
      const currentFirst = parseDate(
        techExp.firstUsed.split(" ")[1] +
          "-" +
          getMonthNumber(techExp.firstUsed.split(" ")[0])
      );
      const currentLast =
        techExp.lastUsed === "Present"
          ? new Date()
          : parseDate(
              techExp.lastUsed.split(" ")[1] +
                "-" +
                getMonthNumber(techExp.lastUsed.split(" ")[0])
            );

      if (firstDate < currentFirst) {
        techExp.firstUsed = exp.period.split(" - ")[0];
      }
      if (lastDate > currentLast) {
        techExp.lastUsed = exp.period.split(" - ")[1] || "Present";
      }
    });
  });

  return techMap;
}

function getMonthNumber(month: string): string {
  const months: Record<string, string> = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  return months[month] || "01";
}

export function formatExperience(years: number): string {
  if (years < 1) {
    const months = Math.round(years * 12);
    return months === 1 ? "1 month" : `${months} months`;
  }
  const wholeYears = Math.floor(years);
  const months = Math.round((years - wholeYears) * 12);
  if (months === 0) {
    return `${wholeYears} year${wholeYears !== 1 ? "s" : ""}`;
  }
  return `${wholeYears}.${Math.floor((months / 12) * 10)} years`;
}

export function getTechnologiesByExperience(): TechExperience[] {
  const techMap = calculateTechExperience();
  return Array.from(techMap.values()).sort((a, b) => b.years - a.years);
}
