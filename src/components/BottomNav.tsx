import { Paper, Box, Button } from "@mui/material";
import { User, Code, Clock, Mail } from "lucide-react";

const navigationItems = [
  { id: "summary", label: "Summary", icon: User },
  { id: "technologies", label: "Technologies", icon: Code },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

interface BottomNavProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function BottomNav({ onScrollToSection }: BottomNavProps) {
  return (
    <Paper
      component="nav"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", md: "none" },
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "#2a2a2a",
        borderRadius: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          py: 1,
        }}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              onClick={() => onScrollToSection(item.id)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                color: "text.secondary",
                minWidth: "auto",
                px: 1,
                py: 0.5,
                fontSize: "0.7rem",
                "&:hover": {
                  bgcolor: "transparent",
                  color: "text.primary",
                },
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </Box>
    </Paper>
  );
}

