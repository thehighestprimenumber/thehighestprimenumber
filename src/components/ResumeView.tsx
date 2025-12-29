import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { resume } from "../utils/resumeData";
import Hero from "./Hero";
import TechnologyCloud from "./TechnologyCloud";
import TimelineView from "./TimelineView";
import TechJobsModal from "./TechJobsModal";
import Section from "./Section";
import ContactLink from "./ContactLink";
import ProtectedEmailLink from "./ProtectedEmailLink";
import { LinkedInIcon, GitHubIcon } from "./icons";

const summaryTextStyle = {
  fontSize: "1.125rem",
  lineHeight: 1.8,
  color: "text.secondary",
};

interface ResumeViewProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function ResumeView({ onScrollToSection }: ResumeViewProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <Box>
      {/* Hero Section */}
      <Hero onScrollToSection={onScrollToSection} />

      {/* Main Content */}
      <Box
        sx={{
          minHeight: "calc(100vh - 100px)",
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Stack>
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
          <Section id="technologies" sx={{ pt: { xs: "20px", md: "30px" } }}>
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
            py={24}
            sx={{ minHeight: "auto" }}
          >
            <Stack
              gap={{ xs: 3, md: 4 }}
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, auto)",
                  },
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
              </Box>
            </Stack>
          </Section>
        </Stack>
      </Box>

      {/* Tech Jobs Modal */}
      {selectedTech && (
        <TechJobsModal
          technology={selectedTech}
          onClose={() => setSelectedTech(null)}
        />
      )}
    </Box>
  );
}
