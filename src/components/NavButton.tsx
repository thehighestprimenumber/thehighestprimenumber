import { Button } from "@mui/material";
import { LucideIcon } from "lucide-react";

interface NavButtonProps {
  icon: LucideIcon;
  sectionId: string;
  onScrollToSection: (sectionId: string) => void;
  children: React.ReactNode;
}

export default function NavButton({
  icon: Icon,
  sectionId,
  onScrollToSection,
  children,
}: NavButtonProps) {
  return (
    <Button
      fullWidth
      onClick={() => onScrollToSection(sectionId)}
      startIcon={<Icon size={20} />}
      sx={{
        justifyContent: { xs: "center", md: "flex-start" },
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 0.5, md: 1 },
        color: "text.secondary",
        minWidth: { xs: "auto", md: "100%" },
        px: { xs: 1, md: 2 },
        py: { xs: 1, md: 1.5 },
        fontSize: { xs: "0.75rem", md: "1rem" },
        "&:hover": {
          bgcolor: "#1a1a1a",
          color: "text.primary",
        },
      }}
    >
      {children}
    </Button>
  );
}

