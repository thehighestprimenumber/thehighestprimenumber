import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import { resume } from "../utils/resumeData";
import {
  getTechnologiesByExperience,
  formatExperience,
} from "../utils/techExperience";
import JobDetailsModal from "./JobDetailsModal";

interface TechJobsModalProps {
  technology: string;
  onClose: () => void;
}

export default function TechJobsModal({
  technology,
  onClose,
}: TechJobsModalProps) {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const techExperience = getTechnologiesByExperience();
  const techData = techExperience.find(
    (t) => t.technology.toLowerCase() === technology.toLowerCase()
  );

  if (!techData) return null;

  const relatedJobs = resume.experience.filter((exp) =>
    exp.technologies.some((t) => t.toLowerCase() === technology.toLowerCase())
  );

  const selectedJobData = selectedJob
    ? resume.experience.find((j) => j.id === selectedJob)
    : null;

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "#2a2a2a",
            m: { xs: 1, sm: 2 },
            maxHeight: { xs: "90vh", sm: "85vh" },
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {techData.technology}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 0.5 }}
              >
                {formatExperience(techData.years)} experience
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{
                color: "text.secondary",
                "&:hover": { bgcolor: "#1a1a1a" },
              }}
            >
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ maxHeight: "70vh", overflowY: "auto" }}>
          <Stack gap={3}>
            <Paper
              sx={{
                bgcolor: "#1a1a1a",
                p: 2,
                borderRadius: "8px",
                border: "1px solid",
                borderColor: "#2a2a2a",
              }}
            >
              <Stack gap={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight={600}>First Used:</Typography>
                  <Typography color="text.secondary">
                    {techData.firstUsed}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight={600}>Last Used:</Typography>
                  <Typography color="text.secondary">
                    {techData.lastUsed}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight={600}>Companies:</Typography>
                  <Typography color="text.secondary">
                    {techData.companies.join(", ")}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Divider sx={{ borderColor: "#2a2a2a" }} />

            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Used in {relatedJobs.length}{" "}
                {relatedJobs.length === 1 ? "role" : "roles"}
              </Typography>
              <Stack gap={2}>
                {relatedJobs.map((job) => (
                  <Paper
                    key={job.id}
                    sx={{
                      bgcolor: "#1a1a1a",
                      border: "1px solid",
                      borderColor: "#2a2a2a",
                      borderRadius: "8px",
                      p: 2,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "primary.main",
                        transform: "translateY(-2px)",
                        boxShadow: 3,
                      },
                    }}
                    onClick={() => setSelectedJob(job.id)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1.5,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {job.role}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "primary.main" }}
                        >
                          {job.company}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontFamily: "monospace",
                        }}
                      >
                        {job.period}
                      </Typography>
                    </Box>

                    <Stack gap={1} sx={{ mb: 1.5 }}>
                      {job.achievements.slice(0, 2).map((achievement, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          sx={{ fontWeight: 600, color: "text.secondary" }}
                        >
                          {achievement.headline}
                        </Typography>
                      ))}
                      {job.achievements.length > 2 && (
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          +{job.achievements.length - 2} more achievements
                        </Typography>
                      )}
                    </Stack>

                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, display: "block", mb: 1 }}
                      >
                        Technologies:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {job.technologies.slice(0, 5).map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            sx={{
                              bgcolor: "rgba(59, 130, 246, 0.1)",
                              color: "primary.main",
                              fontSize: "0.7rem",
                            }}
                          />
                        ))}
                        {job.technologies.length > 5 && (
                          <Chip
                            label={`+${job.technologies.length - 5}`}
                            size="small"
                            sx={{
                              bgcolor: "rgba(59, 130, 246, 0.1)",
                              color: "primary.main",
                              fontSize: "0.7rem",
                            }}
                          />
                        )}
                      </Box>
                    </Box>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "primary.main",
                        fontStyle: "italic",
                        mt: 1,
                        display: "block",
                      }}
                    >
                      Click to see full details →
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>

      {selectedJobData && (
        <JobDetailsModal
          job={selectedJobData}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
}
