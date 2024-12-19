import { Box, Card, styled } from "@mui/material";
import { FlexBox } from "../global-styles/globalStyles";

export const StyledCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  maxWidth: '500px'
}));

export const RecipeHeaderBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const RecipeHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
}));

export const StyledHeader = styled(FlexBox)(() => ({
    maxWidth: '500px'
}))