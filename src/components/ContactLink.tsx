import { Link, LinkProps } from "@mui/material";
import { ReactNode } from "react";

interface ContactLinkProps extends Omit<LinkProps, "children"> {
  icon: ReactNode;
  children: ReactNode;
}

export default function ContactLink({
  icon,
  children,
  ...linkProps
}: ContactLinkProps) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, sm: 1.5 },
        color: "text.secondary",
        px: { xs: 2, sm: 3 },
        py: { xs: 1, sm: 1.5 },
        borderRadius: "8px",
        border: "1px solid",
        borderColor: "#2a2a2a",
        bgcolor: "background.paper",
        textDecoration: "none",
        fontSize: { xs: "0.875rem", sm: "1rem" },
        "&:hover": {
          color: "text.primary",
          borderColor: "primary.main",
          bgcolor: "#1a1a1a",
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
        transition: "all 0.2s",
        ...linkProps.sx,
      }}
      {...linkProps}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
