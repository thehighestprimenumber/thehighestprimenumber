import { generatePDFFromText } from './textToPDF'

/**
 * Generates an ATS-friendly PDF resume from JSON data
 * Uses jsPDF directly with text (most reliable method)
 */
export async function generateATSPDF(): Promise<void> {
  await generatePDFFromText()
}

/**
 * Print-friendly version (most ATS-friendly - uses browser print)
 */
export function printResume(): void {
  window.print()
}

