import { useState } from "react";
import { Download } from "lucide-react";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  generateBothPDFs,
  generateATSPDF,
  generateCoverLetter,
} from "../utils/pdfGenerator";

export default function DownloadPdfButton() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadBoth = async () => {
    handleClose();
    setIsGeneratingPDF(true);
    try {
      await generateBothPDFs();
    } catch (error) {
      console.error("Error generating PDFs:", error);
      alert("Error generating PDFs. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadResume = async () => {
    handleClose();
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

  const handleDownloadCoverLetter = async () => {
    handleClose();
    setIsGeneratingPDF(true);
    try {
      await generateCoverLetter();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        startIcon={<Download size={16} />}
        onClick={handleClick}
        disabled={isGeneratingPDF}
        sx={{ whiteSpace: "nowrap" }}
      >
        {isGeneratingPDF ? "Generating..." : "Download PDF"}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleDownloadBoth}>Both (Cover Letter & Resume)</MenuItem>
        <MenuItem onClick={handleDownloadCoverLetter}>Cover Letter Only</MenuItem>
        <MenuItem onClick={handleDownloadResume}>Resume Only</MenuItem>
      </Menu>
    </>
  );
}
