import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@mui/material";
import { generateATSPDF } from "../utils/pdfGenerator";

export default function DownloadPdfButton() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownload = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateATSPDF();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<Download size={16} />}
      onClick={handleDownload}
      disabled={isGeneratingPDF}
      sx={{ whiteSpace: "nowrap" }}
    >
      {isGeneratingPDF ? "Generating..." : "Download PDF"}
    </Button>
  );
}

