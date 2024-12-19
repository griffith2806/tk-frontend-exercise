import { Box, styled, Typography } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  textAlign: "center",
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const ErrorTypography = styled(Typography)(({ theme }) => ({
  fontSize: "6rem",
  fontWeight: "bold",
  color: theme.palette.primary.main,
}));
