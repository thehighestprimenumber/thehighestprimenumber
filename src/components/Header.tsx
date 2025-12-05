import {
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { resume } from "../utils/resumeData";
import DownloadPdfButton from "./DownloadPdfButton";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "#2a2a2a",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: { xs: 1.5, md: 2 },
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            {resume.personal.name} - {resume.personal.title}
          </Typography>

          <DownloadPdfButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

