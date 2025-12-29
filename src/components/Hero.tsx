import { Box, Typography, Stack, Button, Container } from "@mui/material";
import { ArrowDown } from "lucide-react";
import { resume } from "../utils/resumeData";
import DownloadPdfButton from "./DownloadPdfButton";
import heroImage from "../assets/hero.jpg";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: "calc(100vh - 64px)",
          sm: "calc(100vh - 72px)",
          md: "calc(100vh - 80px)",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3, md: 4 },
        borderBottom: "1px solid",
        borderColor: "#2a2a2a",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "120%",
          height: "120%",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          animation: "kenBurns 30s ease-in-out infinite",
          "@keyframes kenBurns": {
            "0%": {
              transform: "scale(1) translate(0, 0)",
            },
            "25%": {
              transform: "scale(1.15) translate(-3%, -2%)",
            },
            "50%": {
              transform: "scale(1.2) translate(2%, 3%)",
            },
            "75%": {
              transform: "scale(1.1) translate(-2%, 1%)",
            },
            "100%": {
              transform: "scale(1) translate(0, 0)",
            },
          },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(18, 18, 18, 0.85) 0%, rgba(26, 26, 26, 0.75) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
          alignItems="center"
          textAlign="center"
          sx={{ maxWidth: "900px", mx: "auto", width: "100%" }}
        >
          {/* Name */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "4.5rem" },
              fontWeight: 800,
              background: "linear-gradient(135deg, #ffffff 0%, #b0b0b0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {resume.personal.name}
          </Typography>

          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.25rem",
                md: "1.5rem",
                lg: "1.75rem",
              },
              fontWeight: 400,
              color: "text.secondary",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {resume.personal.title}
          </Typography>

          {/* Tagline */}
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
              fontWeight: 300,
              color: "text.secondary",
              maxWidth: "700px",
              lineHeight: 1.5,
              px: { xs: 2, sm: 0 },
            }}
          >
            Building scalable systems and impactful digital products with
            thoughtful engineering
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowDown size={20} />}
              onClick={() => onScrollToSection("summary")}
              sx={{
                px: { xs: 4, sm: 5 },
                py: { xs: 1.5, sm: 1.75 },
                fontSize: { xs: "0.9375rem", sm: "1rem" },
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0 4px 14px 0 rgba(76, 175, 80, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px 0 rgba(76, 175, 80, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
                minHeight: { xs: "48px", sm: "52px" },
              }}
            >
              Explore My Work
            </Button>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiButton-root": {
                  px: { xs: 4, sm: 5 },
                  py: { xs: 1.5, sm: 1.75 },
                  fontSize: { xs: "0.9375rem", sm: "1rem" },
                  fontWeight: 600,
                  borderRadius: "8px",
                  textTransform: "none",
                  minHeight: { xs: "48px", sm: "52px" },
                  boxShadow: "0 4px 14px 0 rgba(76, 175, 80, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 20px 0 rgba(76, 175, 80, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                },
              }}
            >
              <DownloadPdfButton />
            </Box>
          </Stack>

          {/* Scroll Indicator */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              pt: { md: 1 },
              animation: "bounce 2s infinite",
              "@keyframes bounce": {
                "0%, 100%": {
                  transform: "translateY(0)",
                },
                "50%": {
                  transform: "translateY(10px)",
                },
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Scroll to explore
            </Typography>
            <ArrowDown
              size={20}
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

