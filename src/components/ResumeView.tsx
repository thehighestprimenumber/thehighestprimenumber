import { useState } from "react";
import { Box, Paper, List, ListItem, Typography, Stack } from "@mui/material";
import { User, Code, Clock, Mail, Globe } from "lucide-react";
import { resume } from "../utils/resumeData";
import TechnologyCloud from "./TechnologyCloud";
import TimelineView from "./TimelineView";
import TechJobsModal from "./TechJobsModal";
import Section from "./Section";
import NavButton from "./NavButton";
import BottomNav from "./BottomNav";
import ContactLink from "./ContactLink";
import ProtectedEmailLink from "./ProtectedEmailLink";
import { LinkedInIcon, GitHubIcon } from "./icons";

const navigationItems = [
  { id: "summary", label: "Summary", icon: User },
  { id: "technologies", label: "Technologies", icon: Code },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

const summaryTextStyle = {
  fontSize: "1.125rem",
  lineHeight: 1.8,
  color: "text.secondary",
};

export default function ResumeView() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector(".MuiAppBar-root");
      const headerHeight = header ? header.getBoundingClientRect().height : 70;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 4 },
        minHeight: "calc(100vh - 100px)",
        p: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 10, md: 4 }, // Add padding bottom on mobile for bottom nav
      }}
    >
      {/* Left Navigation Sidebar */}
      <Paper
        component="nav"
        sx={{
          position: { xs: "static", md: "sticky" },
          top: { md: 100 },
          alignSelf: { md: "flex-start" },
          width: { xs: "100%", md: 220 },
          flexShrink: 0,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "#2a2a2a",
          borderRadius: "12px",
          p: { xs: 2, md: 3 },
          height: "fit-content",
          display: { xs: "none", md: "block" },
        }}
      >
        <List sx={{ p: 0 }}>
          {navigationItems.map((item, index) => (
            <ListItem
              key={item.id}
              sx={{ p: 0, mb: index < navigationItems.length - 1 ? 1 : 0 }}
            >
              <NavButton
                icon={item.icon}
                sectionId={item.id}
                onScrollToSection={scrollToSection}
              >
                {item.label}
              </NavButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Main Content */}
      <Stack flex={1}>
        {/* Professional Summary Section */}
        <Section id="summary" paddingBottom={4}>
          <Stack gap={3} sx={{ width: "100%", maxWidth: "800px" }}>
            <Typography variant="body1" sx={summaryTextStyle}>
              {resume.personal.summary}
            </Typography>
            <Typography variant="body1" sx={summaryTextStyle}>
              {resume.personal.summaryExtended}
            </Typography>
          </Stack>
        </Section>

        {/* Technologies Section */}
        <Section id="technologies">
          <Box sx={{ width: "100%" }}>
            <TechnologyCloud onTechClick={setSelectedTech} />
          </Box>
        </Section>

        {/* Timeline Section */}
        <Section id="timeline" alignItems="center" scrollMarginTop="80px">
          <Box sx={{ width: "100%" }}>
            <TimelineView onTechClick={setSelectedTech} />
          </Box>
        </Section>

        {/* Contact Section */}
        <Section
          id="contact"
          textAlign="center"
          alignItems="center"
          justifyContent="flex-start"
          paddingBottom={4}
        >
          <Stack gap={{ xs: 3, md: 4 }} alignItems="center" sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, auto)" },
                gap: { xs: 2, sm: 3, md: 4 },
                width: "100%",
                maxWidth: { xs: "100%", md: "800px" },
              }}
            >
              <ProtectedEmailLink />
              <ContactLink
                href={`https://${resume.personal.linkedin}`}
                icon={<LinkedInIcon sx={{ width: 20, height: 20 }} />}
              >
                LinkedIn
              </ContactLink>
              <ContactLink
                href="https://github.com/thehighestprimenumber"
                icon={<GitHubIcon sx={{ width: 20, height: 20 }} />}
              >
                GitHub
              </ContactLink>
              <ContactLink
                href={resume.personal.website}
                icon={<Globe size={20} />}
              >
                Website
              </ContactLink>
            </Box>
          </Stack>
        </Section>
      </Stack>

      {/* Tech Jobs Modal */}
      {selectedTech && (
        <TechJobsModal
          technology={selectedTech}
          onClose={() => setSelectedTech(null)}
        />
      )}

      {/* Bottom Navigation (Mobile Only) */}
      <BottomNav onScrollToSection={scrollToSection} />
    </Box>
  );
}
