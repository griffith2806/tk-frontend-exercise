import {
  Box,
  CardHeader,
  Container,
  Grid2 as Grid,
  IconButton,
  Typography,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../services/recipeService";
import {
  RecipeHeader,
  RecipeHeaderBox,
  StyledCard,
  StyledHeader,
} from "../components/home/homeStyles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateRecipeDrawer from "../components/recipe/RecipeDrawer";
import { useState } from "react";

export function Home() {
  const [isCreate, setIsCreate] = useState(false);

  const { data } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledHeader alignItems="center" mb={1} justifyContent="space-between">
          <Typography variant="h3" component="h1">
            Recipe Collection
          </Typography>
          <Box>
            <IconButton color="primary" onClick={() => setIsCreate(true)}>
              <AddCircleIcon />
            </IconButton>
          </Box>
        </StyledHeader>

        <Grid container spacing={3}>
          {data?.recipes.map((recipe) => (
            <Grid key={recipe.id} size={{ xs: 12, md: 6 }}>
              <StyledCard>
                <CardHeader
                  title={
                    <RecipeHeaderBox>
                      <RecipeHeader>
                        <Typography variant="h5">{recipe.name}</Typography>
                        <RestaurantIcon />
                      </RecipeHeader>
                      <IconButton aria-label="edit recipe" size="small">
                        <EditIcon />
                      </IconButton>
                    </RecipeHeaderBox>
                  }
                />
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <CreateRecipeDrawer
        open={isCreate}
        handleClose={() => setIsCreate(false)}
      />
    </>
  );
}
