import html2pdf from "html2pdf.js";
import { marked } from "marked";
import { jsonToMarkdown } from "./jsonToMarkdown";
import { resume } from "./resumeData";

/**
 * Generate PDF from JSON by converting to Markdown first, then to PDF
 * This approach ensures better formatting and ATS compatibility
 */
export async function generatePDFFromJSONViaMarkdown(): Promise<void> {
  try {
    // Convert JSON to Markdown
    const markdown = jsonToMarkdown();

    // Convert markdown to HTML
    const html = await marked(markdown, {
      breaks: true,
      gfm: true,
    });

    // Create a temporary container - make it visible but off-viewport
    const container = document.createElement("div");
    container.id = "pdf-resume-container";
    container.innerHTML = html;
    container.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 816px;
      min-height: 1056px;
      padding: 72px;
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #000;
      background: white;
      box-sizing: border-box;
      z-index: 99999;
      overflow: visible;
      transform: translateX(-100%);
    `;

    // Add print styles
    const style = document.createElement("style");
    style.id = "pdf-resume-styles";
    style.textContent = `
      #pdf-resume-container {
        font-family: 'Times New Roman', Times, serif;
        color: #000;
        background: white;
      }
      #pdf-resume-container h1 {
        font-size: 24pt;
        font-weight: bold;
        margin: 0 0 0.5rem 0;
        text-align: center;
        border-bottom: 2px solid #000;
        padding-bottom: 0.5rem;
        page-break-after: avoid;
      }
      #pdf-resume-container h2 {
        font-size: 14pt;
        font-weight: bold;
        margin: 1.5rem 0 0.75rem 0;
        text-transform: uppercase;
        border-bottom: 1px solid #000;
        padding-bottom: 0.25rem;
        page-break-after: avoid;
        page-break-inside: avoid;
      }
      #pdf-resume-container h3 {
        font-size: 12pt;
        font-weight: bold;
        margin: 1rem 0 0.5rem 0;
        page-break-after: avoid;
      }
      #pdf-resume-container p {
        margin: 0.5rem 0;
        text-align: justify;
        color: #000;
        orphans: 3;
        widows: 3;
      }
      #pdf-resume-container ul {
        margin: 0.5rem 0;
        padding-left: 1.5rem;
      }
      #pdf-resume-container li {
        margin: 0.25rem 0;
        color: #000;
        page-break-inside: avoid;
      }
      #pdf-resume-container strong {
        font-weight: bold;
        color: #000;
      }
      #pdf-resume-container em {
        font-style: italic;
      }
      @media print {
        #pdf-resume-container {
          page-break-inside: avoid;
        }
        #pdf-resume-container h2, #pdf-resume-container h3 {
          page-break-after: avoid;
        }
      }
    `;

    // Remove existing styles if any
    const existingStyle = document.getElementById("pdf-resume-styles");
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(style);
    document.body.appendChild(container);

    // Wait for content to render and images to load
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Verify content exists
    if (!container.innerHTML || container.innerHTML.trim().length === 0) {
      throw new Error("PDF container is empty. Resume data may not be loaded.");
    }

    console.log("PDF container content length:", container.innerHTML.length);
    console.log("PDF container height:", container.scrollHeight);
    console.log(
      "PDF container innerHTML preview:",
      container.innerHTML.substring(0, 200)
    );

    // Force a reflow to ensure styles are applied
    container.offsetHeight;

    // Configure PDF options for ATS compatibility
    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${resume.personal.name.replace(" ", "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff",
        width: 816,
        height: Math.max(1056, container.scrollHeight),
        windowWidth: 816,
        windowHeight: Math.max(1056, container.scrollHeight),
        x: 0,
        y: 0,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait" as const,
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        avoid: ["h2", "h3"],
      },
    };

    // Generate PDF
    try {
      await html2pdf().set(options).from(container).save();
    } catch (pdfError) {
      console.error("PDF generation error:", pdfError);
      // Try alternative approach - make container visible temporarily
      container.style.transform = "translateX(0)";
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      await new Promise((resolve) => setTimeout(resolve, 500));
      await html2pdf().set(options).from(container).save();
    }

    // Cleanup
    document.body.removeChild(container);
    document.head.removeChild(style);
  } catch (error) {
    console.error("Error generating PDF from JSON via Markdown:", error);
    throw error;
  }
}
