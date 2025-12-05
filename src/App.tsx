import { Box } from "@mui/material";
import ResumeView from "./components/ResumeView";
import Header from "./components/Header";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header />

      <Box component="main">
        <ResumeView />
      </Box>
    </Box>
  );
}

export default App;
