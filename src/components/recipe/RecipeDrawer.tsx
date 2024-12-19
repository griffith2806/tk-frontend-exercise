import { Container, styled, SwipeableDrawer } from "@mui/material";

interface IRecipeDrawerProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export const StyledContainer = styled(Container)(({ theme }) => ({
    width: '500px',

    [theme.breakpoints.down("sm")]:{
        width: '350px'    
    }
}))

export function RecipeDrawer({
  open,
  handleClose,
  children,
}: IRecipeDrawerProps) {
  return (
    <SwipeableDrawer
      open={open}
      anchor="right"
      onClose={handleClose}
      onOpen={() => {}}
    >
      <StyledContainer>
        {children}
      </StyledContainer>
    </SwipeableDrawer>
  );
}
