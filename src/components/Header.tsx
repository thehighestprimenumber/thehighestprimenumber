import { useState } from "react";
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { User, Code, Clock, Mail, Menu as MenuIcon } from "lucide-react";
import { resume } from "../utils/resumeData";
import DownloadPdfButton from "./DownloadPdfButton";

const navigationItems = [
  { id: "summary", label: "Summary", icon: User },
  { id: "technologies", label: "Technologies", icon: Code },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onScrollToSection, activeSection }: HeaderProps) {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const mobileMenuOpen = Boolean(mobileMenuAnchor);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleMobileNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    handleMobileMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "#2a2a2a",
        boxShadow: "none",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            py: { xs: 1, sm: 1.25, md: 1.5 },
            px: { xs: 1, sm: 2 },
            gap: { xs: 1, sm: 1.5, md: 2 },
            flexWrap: "wrap",
            minHeight: { xs: "56px", sm: "64px" },
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {resume.personal.name} - {resume.personal.title}
          </Typography>

          {/* Desktop/Tablet Navigation */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: { sm: 0.5, md: 1 },
              alignItems: "center",
              flexWrap: "wrap",
              flex: { sm: "0 1 auto", md: "0 1 auto" },
              justifyContent: "flex-end",
              minWidth: 0,
            }}
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  onClick={() => onScrollToSection(item.id)}
                  startIcon={<Icon size={18} />}
                  sx={{
                    color: isActive ? "text.primary" : "text.secondary",
                    fontSize: { sm: "0.8125rem", md: "0.9375rem" },
                    px: { sm: 1, md: 1.5 },
                    py: { sm: 0.5, md: 0.75 },
                    minWidth: "auto",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    fontWeight: isActive ? 600 : 400,
                    bgcolor: isActive ? "rgba(76, 175, 80, 0.1)" : "transparent",
                    borderBottom: isActive ? "2px solid" : "2px solid transparent",
                    borderColor: isActive ? "primary.main" : "transparent",
                    "&:hover": {
                      bgcolor: isActive ? "rgba(76, 175, 80, 0.15)" : "#1a1a1a",
                      color: "text.primary",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
            <Box sx={{ flexShrink: 0 }}>
              <DownloadPdfButton />
            </Box>
          </Box>

          {/* Mobile Navigation (hamburger menu) */}
          <IconButton
            onClick={handleMobileMenuOpen}
            sx={{
              display: { xs: "flex", sm: "none" },
              color: "text.secondary",
              flexShrink: 0,
              "&:hover": {
                bgcolor: "#1a1a1a",
                color: "text.primary",
              },
            }}
            aria-label="navigation menu"
          >
            <MenuIcon size={20} />
          </IconButton>

          {/* Mobile Menu */}
          <Menu
            anchorEl={mobileMenuAnchor}
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPaper-root": {
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "#2a2a2a",
                mt: 1,
                minWidth: 180,
              },
            }}
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <MenuItem
                  key={item.id}
                  onClick={() => handleMobileNavClick(item.id)}
                  sx={{
                    color: isActive ? "text.primary" : "text.secondary",
                    bgcolor: isActive ? "rgba(76, 175, 80, 0.1)" : "transparent",
                    fontWeight: isActive ? 600 : 400,
                    "&:hover": {
                      bgcolor: isActive ? "rgba(76, 175, 80, 0.15)" : "#1a1a1a",
                      color: "text.primary",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Box>
                </MenuItem>
              );
            })}
            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: "#2a2a2a",
                pt: 1.5,
                mt: 0.5,
                px: 1.5,
                py: 1,
              }}
            >
              <DownloadPdfButton />
            </Box>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
