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
        minHeight: "100vh",
        mx: "auto",
        px: 2,
        scrollMarginTop,
        pt: "70px",
        pb: paddingBottom ?? 0,
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

