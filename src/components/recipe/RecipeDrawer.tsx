import { Container, SwipeableDrawer } from "@mui/material";

interface IRecipeDrawerProps{
    open: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

export function RecipeDrawer({ open, handleClose, children }: IRecipeDrawerProps) {
  return (
    <SwipeableDrawer
      open={open}
      anchor="right"
      onClose={handleClose}
      onOpen={() => {}}
    >
      <Container sx={{ minWidth: "500px" }}>
        {children}
      </Container>
    </SwipeableDrawer>
  );
}
