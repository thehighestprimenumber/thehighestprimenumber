import jsPDF from 'jspdf'
import { resume } from './resumeData'
import { getTechnologiesByExperience } from "./techExperience";
import { getEmail } from "./emailObfuscation";

/**
 * Convert years of experience to star rating (one star per year, rounded up)
 */
const yearsToStars = (years: number): string => "*".repeat(Math.ceil(years));

/**
 * Generate PDF directly from text using jsPDF (more reliable than html2canvas)
 */
export async function generatePDFFromText(): Promise<void> {
  const doc = new jsPDF({
    unit: "in",
    format: "letter",
    orientation: "portrait",
  });

  const pageWidth = 8.5;
  const pageHeight = 11;
  const margin = 0.75;
  const contentWidth = pageWidth - margin * 2;
  let yPosition = margin;

  // Helper to add text with wrapping
  const addText = (
    text: string,
    fontSize: number,
    isBold = false,
    align: "left" | "center" | "right" = "left"
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("times", isBold ? "bold" : "normal");

    const lines = doc.splitTextToSize(text, contentWidth);
    const lineHeight = (fontSize / 72) * 1.4;

    lines.forEach((line: string) => {
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }

      const xPosition =
        align === "center"
          ? pageWidth / 2
          : align === "right"
          ? pageWidth - margin
          : margin;

      doc.text(line, xPosition, yPosition, { align });
      yPosition += lineHeight;
    });
  };

  const { personal, languages, experience } = resume;
  const technologies = getTechnologiesByExperience();

  // Sort alphabetically like the web version
  const sortedTechnologies = [...technologies].sort((a, b) =>
    a.technology.localeCompare(b.technology)
  );

  // Header
  addText(personal.name, 18, true, "center");
  yPosition += 0.15;
  addText(personal.title, 12, false, "center");
  yPosition += 0.15;
  const contactInfo = `${getEmail()} | ${personal.linkedin} | ${personal.website}`;

  addText(contactInfo, 10, false, "center");
  yPosition += 0.3;

  // Horizontal line
  doc.setLineWidth(0.01);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 0.3;

  // Summary
  addText("PROFESSIONAL SUMMARY", 12, true);
  yPosition += 0.15;
  addText(`${personal.summary} ${personal.summaryExtended}`, 10, false);
  yPosition += 0.3;

  // Technical Skills - displayed alphabetically with years of experience in columns
  addText("TECHNICAL SKILLS", 12, true);
  yPosition += 0.15;

  // Calculate column layout (4 columns with spacing)
  const numColumns = 4;
  const columnSpacing = 0.15; // inches between columns
  const columnWidth =
    (contentWidth - columnSpacing * (numColumns - 1)) / numColumns;
  const startX = margin;
  const lineHeight = (10 / 72) * 1.4; // Convert font size to inches with spacing

  // Distribute technologies across columns (fill columns vertically, then move to next column)
  const columns: string[][] = [];
  for (let col = 0; col < numColumns; col++) {
    columns[col] = [];
  }

  const itemsPerColumn = Math.ceil(sortedTechnologies.length / numColumns);

  sortedTechnologies.forEach((tech, index) => {
    const colIndex = Math.floor(index / itemsPerColumn);
    const techEntry = `${tech.technology} ${yearsToStars(tech.years)}`;
    if (colIndex < numColumns) {
      columns[colIndex].push(techEntry);
    }
  });

  // Calculate the maximum number of rows needed
  const maxRows = Math.max(...columns.map((col) => col.length));

  // Set font for technology entries
  doc.setFontSize(10);
  doc.setFont("times", "normal");

  // Render each row across columns
  for (let row = 0; row < maxRows; row++) {
    // Check if we need a new page
    if (yPosition + lineHeight > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }

    // Render each column for this row
    for (let col = 0; col < numColumns; col++) {
      if (columns[col][row]) {
        const xPosition = startX + col * (columnWidth + columnSpacing);
        doc.text(columns[col][row], xPosition, yPosition);
      }
    }

    yPosition += lineHeight;
  }

  yPosition += 0.2; // Extra spacing after skills section

  // Languages
  addText("LANGUAGES", 12, true);
  yPosition += 0.15;
  languages.forEach((lang) => {
    addText(`${lang.name}: ${lang.level}`, 10, false);
  });
  yPosition += 0.3;

  // Experience
  addText("PROFESSIONAL EXPERIENCE", 12, true);
  yPosition += 0.15;

  experience.forEach((exp) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin - 1) {
      doc.addPage();
      yPosition = margin;
    }

    // Role and company
    addText(exp.role, 11, true);
    addText(`${exp.company} | ${exp.period}`, 10, false);
    yPosition += 0.1;

    // Achievements
    exp.achievements.forEach((achievement) => {
      addText(
        `• ${achievement.headline}. ${achievement.description}`,
        10,
        false
      );
    });

    // Technologies
    if (exp.technologies.length > 0) {
      yPosition += 0.05;
      addText(`Technologies: ${exp.technologies.join(", ")}`, 9, false);
    }

    yPosition += 0.3;
  });

  // Save PDF
  doc.save(`${personal.name.replace(" ", "_")}_Resume.pdf`);
}

