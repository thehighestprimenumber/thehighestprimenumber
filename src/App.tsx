import { Box } from "@mui/material";
import ResumeView from "./components/ResumeView";
import Header from "./components/Header";

function App() {
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
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header onScrollToSection={scrollToSection} />

      <Box component="main">
        <ResumeView onScrollToSection={scrollToSection} />
      </Box>
    </Box>
  );
}

export default App;
