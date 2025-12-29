import { resume } from "./resumeData";
import { getTechnologiesByExperience, formatExperience } from "./techExperience";
import { getEmail } from "./emailObfuscation";

/**
 * Convert JSON resume data to Markdown format
 */
export function jsonToMarkdown(): string {
  const { personal, languages, experience } = resume;
  const technologies = getTechnologiesByExperience();

  // Sort alphabetically and generate skills markdown with clear text format
  const sortedTechnologies = [...technologies].sort((a, b) =>
    a.technology.localeCompare(b.technology)
  );
  const skillsList = sortedTechnologies
    .map((tech) => `${tech.technology} (${formatExperience(tech.years)})`)
    .join(", ");

  // Generate languages markdown
  const languagesList = languages
    .map((lang) => `* ${lang.name} (${lang.level})`)
    .join("\n");

  // Generate experience markdown
  const experienceMarkdown = experience
    .map((exp) => {
      const achievementsList = exp.achievements
        .map((ach) => `* ${ach.headline}. ${ach.description}`)
        .join("\n\n");

      const techList =
        exp.technologies.length > 0
          ? `\n\n${exp.technologies.join(" - ")}`
          : "";

      return `**${exp.company}** ${exp.period}
              ### ${exp.role}
              ${achievementsList}${techList}`;
    })
    .join("\n\n\n");

  const contactInfo = `${getEmail()} | ${personal.linkedin} | ${
    personal.website
  }`;

  // Harvard CV Format: Experience first, then Skills, then Languages
  return `# ${personal.name} - ${personal.title}

${contactInfo}

${personal.summary} ${personal.summaryExtended}

## Professional Experience

${experienceMarkdown}

## Technical Skills

${skillsList}

## Languages

${languagesList}
`;
}
