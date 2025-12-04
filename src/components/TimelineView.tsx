import { Box, Typography, Stack, Chip, Divider } from "@mui/material";
import { resume } from "../utils/resumeData";
import { formatExperience } from "../utils/techExperience";
import { getTechnologiesByExperience } from "../utils/techExperience";

interface TimelineViewProps {
  onTechClick: (tech: string) => void;
}

export default function TimelineView({ onTechClick }: TimelineViewProps) {
  const techExperience = getTechnologiesByExperience();
  const techMap = new Map(
    techExperience.map((t) => [t.technology.toLowerCase(), t])
  );

  // Sort experiences chronologically (newest first)
  const sortedExperiences = [...resume.experience].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <Stack gap={4} sx={{ width: "100%" }}>
      {sortedExperiences.map((exp) => {
        return (
          <Box
            key={exp.id}
            sx={{
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "#2a2a2a",
              borderRadius: "12px",
              p: 4,
              transition: "all 0.3s",
              "&:hover": {
                borderColor: "primary.main",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.1)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 4,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {exp.role}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "primary.main", fontWeight: 500 }}
                >
                  {exp.company}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                }}
              >
                {exp.period}
              </Typography>
            </Box>

            <Stack gap={3} sx={{ mb: 4 }}>
              {exp.achievements.map((achievement, achIdx) => (
                <Box
                  key={achIdx}
                  sx={{
                    pl: 3,
                    borderLeft: "3px solid",
                    borderColor: "primary.main",
                    pb: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                    {achievement.headline}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.7 }}
                  >
                    {achievement.description}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ borderColor: "#2a2a2a", mb: 2 }} />

            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "block",
                  mb: 2,
                }}
              >
                Technologies:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {exp.technologies.map((tech) => {
                  const techData = techMap.get(tech.toLowerCase());
                  return (
                    <Box
                      key={tech}
                      onClick={() => onTechClick(tech)}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: "rgba(59, 130, 246, 0.1)",
                        border: "1px solid",
                        borderColor: "rgba(59, 130, 246, 0.2)",
                        color: "primary.main",
                        px: 1.5,
                        py: 0.75,
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: "rgba(59, 130, 246, 0.2)",
                          borderColor: "primary.main",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(59, 130, 246, 0.2)",
                        },
                      }}
                      title={
                        techData
                          ? `${formatExperience(
                              techData.years
                            )} experience - Click to see details`
                          : "Click to see details"
                      }
                    >
                      <span>{tech}</span>
                      {techData && (
                        <Chip
                          label={formatExperience(techData.years)}
                          size="small"
                          sx={{
                            bgcolor: "secondary.main",
                            color: "white",
                            height: "20px",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            fontFamily: "monospace",
                          }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
