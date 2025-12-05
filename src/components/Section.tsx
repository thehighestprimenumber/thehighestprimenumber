import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface SectionProps extends Omit<BoxProps, "id"> {
  id: string;
  children: ReactNode;
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
  textAlign?: "left" | "center" | "right";
  scrollMarginTop?: string;
  paddingBottom?: number;
}

export default function Section({
  id,
  children,
  alignItems = "flex-start",
  justifyContent = "center",
  textAlign = "left",
  scrollMarginTop = "70px",
  paddingBottom,
  ...boxProps
}: SectionProps) {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        width: "100%",
        maxWidth: "1000px",
        minHeight: { xs: "auto", md: "100vh" },
        mx: "auto",
        px: { xs: 1.5, sm: 2 },
        scrollMarginTop,
        pt: { xs: "60px", md: "70px" },
        pb: paddingBottom ?? { xs: 3, md: 0 },
        display: "flex",
        flexDirection: textAlign === "center" ? "column" : "row",
        alignItems,
        justifyContent,
        textAlign,
        ...boxProps.sx,
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

