import { generatePDFFromText } from "./textToPDF";
import { generateCoverLetterPDF } from "./coverLetterPDF";

/**
 * Generates both Cover Letter and Resume PDFs
 * Cover Letter contains bio/summary
 * Resume contains experience, skills, languages
 */
export async function generateBothPDFs(): Promise<void> {
  // Generate cover letter first
  await generateCoverLetterPDF();
  
  // Small delay to ensure first PDF is saved
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Generate resume
  await generatePDFFromText();
}

/**
 * Generates an ATS-friendly PDF resume from JSON data (without bio)
 * Uses jsPDF directly with text (most reliable method)
 */
export async function generateATSPDF(): Promise<void> {
  await generatePDFFromText();
}

/**
 * Generates Cover Letter PDF with bio/summary
 */
export async function generateCoverLetter(): Promise<void> {
  await generateCoverLetterPDF();
}

/**
 * Print-friendly version (most ATS-friendly - uses browser print)
 */
export function printResume(): void {
  window.print();
}
