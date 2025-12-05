import jsPDF from "jspdf";
import { resume } from "./resumeData";
import { getEmail } from "./emailObfuscation";

/**
 * Generate Cover Letter PDF with bio/summary
 */
export async function generateCoverLetterPDF(): Promise<void> {
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

  const { personal } = resume;

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

  // Cover Letter / Bio Section
  addText("PROFESSIONAL SUMMARY", 12, true);
  yPosition += 0.15;
  addText(personal.summary, 10, false);
  yPosition += 0.2;
  addText(personal.summaryExtended, 10, false);
  yPosition += 0.3;

  // Save PDF
  doc.save(`${personal.name.replace(" ", "_")}_Cover_Letter.pdf`);
}

