import { useState } from 'react'
import { Box, Tooltip, Typography, LinearProgress } from '@mui/material'
import { getTechnologiesByExperience, formatExperience } from '../utils/techExperience'

interface TechnologyCloudProps {
  onTechClick: (tech: string) => void
}

export default function TechnologyCloud({ onTechClick }: TechnologyCloudProps) {
  const technologies = getTechnologiesByExperience()
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  // Sort alphabetically
  const sortedTechnologies = [...technologies].sort((a, b) =>
    a.technology.localeCompare(b.technology)
  )

  // Calculate max years for progress bar scaling
  const maxYears = Math.max(...technologies.map(t => t.years))

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 2,
          pt: 2,
          pb: 4,
        }}
      >
        {sortedTechnologies.map((tech) => {
          const progressValue = maxYears > 0 ? (tech.years / maxYears) * 100 : 0
          const isHovered = hoveredTech === tech.technology.toLowerCase()

          return (
            <Box key={tech.technology}>
              <Tooltip
                title={
                  <Box>
                    <Typography fontWeight="bold">{tech.technology}</Typography>
                    <Typography variant="caption">
                      {formatExperience(tech.years)} experience
                    </Typography>
                    <Typography variant="caption" display="block">
                      Used at {tech.companies.length}{' '}
                      {tech.companies.length === 1 ? 'company' : 'companies'}
                    </Typography>
                    <Typography variant="caption" fontStyle="italic" display="block">
                      Click to see details
                    </Typography>
                  </Box>
                }
                placement="right"
                arrow
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    p: 1.5,
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    bgcolor: isHovered ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(59, 130, 246, 0.1)',
                    },
                  }}
                  onMouseEnter={() => setHoveredTech(tech.technology.toLowerCase())}
                  onMouseLeave={() => setHoveredTech(null)}
                  onClick={() => onTechClick(tech.technology)}
                >
                  <Typography
                    sx={{
                      minWidth: { xs: '120px', lg: '150px' },
                      color: 'text.primary',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      flexShrink: 0,
                    }}
                  >
                    {tech.technology}
                  </Typography>
                  <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
                    <LinearProgress
                      variant="determinate"
                      value={progressValue}
                      sx={{
                        width: '100%',
                        height: 8,
                        borderRadius: '4px',
                        bgcolor: 'rgba(59, 130, 246, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: '4px',
                          bgcolor: 'primary.main',
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      minWidth: '80px',
                      textAlign: 'right',
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      fontFamily: 'monospace',
                      flexShrink: 0,
                    }}
                  >
                    {formatExperience(tech.years)}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
