import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Mail } from "lucide-react";
import ContactLink from "./ContactLink";
import { getEmail } from "../utils/emailObfuscation";
import { Button } from "@mui/material";

export default function ProtectedEmailLink() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleRevealEmail = async () => {
    if (!executeRecaptcha) {
      console.error("reCAPTCHA not loaded");
      return;
    }

    setIsVerifying(true);
    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha("reveal_email");

      // Verify token (in a real app, you'd send this to your backend)
      // For now, we'll just reveal the email after successful captcha
      // In production, you should verify the token server-side
      console.log("reCAPTCHA token:", token);

      setEmailRevealed(true);
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      alert("Failed to verify. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (emailRevealed) {
    return (
      <ContactLink href={`mailto:${getEmail()}`} icon={<Mail size={20} />}>
        {getEmail()}
      </ContactLink>
    );
  }

  return (
    <Button
      onClick={handleRevealEmail}
      disabled={isVerifying}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
        gap: { xs: 1, sm: 1.5 },
        color: "text.secondary",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 1.25, sm: 1.5 },
        borderRadius: "8px",
        border: "1px solid",
        borderColor: "#2a2a2a",
        bgcolor: "background.paper",
        fontSize: { xs: "0.875rem", sm: "1rem" },
        width: { xs: "100%", md: "auto" },
        "&:hover": {
          color: "text.primary",
          borderColor: "primary.main",
          bgcolor: "#1a1a1a",
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
        transition: "all 0.2s",
      }}
    >
      <Mail size={20} />
      <span>{isVerifying ? "Verifying..." : "Reveal Email"}</span>
    </Button>
  );
}
