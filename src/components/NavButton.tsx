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
        justifyContent: "flex-start",
        color: "text.secondary",
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

