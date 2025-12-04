import { X } from 'lucide-react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Paper,
} from '@mui/material'
import { Experience } from '../utils/resumeData'
import {
  getTechnologiesByExperience,
  formatExperience,
} from '../utils/techExperience'

interface JobDetailsModalProps {
  job: Experience
  onClose: () => void
}

export default function JobDetailsModal({ job, onClose }: JobDetailsModalProps) {
  const techExperience = getTechnologiesByExperience()
  const techMap = new Map(techExperience.map(t => [t.technology.toLowerCase(), t]))

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: '#2a2a2a',
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {job.role}
            </Typography>
            <Typography variant="body1" sx={{ color: 'primary.main', mb: 0.5 }}>
              {job.company}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
              {job.period}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'text.secondary',
              '&:hover': { bgcolor: '#1a1a1a' },
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <Stack gap={4}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Achievements
            </Typography>
            <Stack gap={2}>
              {job.achievements.map((achievement, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    bgcolor: '#1a1a1a',
                    p: 2,
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: '#2a2a2a',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    {achievement.headline}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {achievement.description}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Technologies Used
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: 2,
              }}
            >
              {job.technologies.map((tech) => {
                const techData = techMap.get(tech.toLowerCase())
                return (
                  <Paper
                    key={tech}
                    sx={{
                      bgcolor: '#1a1a1a',
                      border: '1px solid',
                      borderColor: '#2a2a2a',
                      borderRadius: '8px',
                      p: 1.5,
                    }}
                  >
                    <Typography fontWeight={600} sx={{ color: 'primary.main', mb: 0.5 }}>
                      {tech}
                    </Typography>
                    {techData && (
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {formatExperience(techData.years)} total experience
                      </Typography>
                    )}
                  </Paper>
                )
              })}
            </Box>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
