import { useMutation } from "@tanstack/react-query";
import { Recipe } from "../../models/recipe";
import { RecipeDrawer } from "./RecipeDrawer";
import { queryClient } from "../../configurations/queryClient";
import { useFormik } from "formik";
import { CreateUpdateRecipeValidationSchema } from "../../validation/recipeValidation";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateRecipe } from "../../services/recipeService";

interface IViewEditProps {
  recipe: Recipe;
  open: boolean;
  handleClose: () => void;
}

export function ViewEditRecipeForm({
  recipe,
  handleClose,
  open,
}: IViewEditProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: updateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      handleClose();
    },
    onError: (error) => {
      console.error("Failed to create recipe:", error);
    },
    onSettled: () => {
      handleClose();
    },
  });

  const form = useFormik<Recipe>({
    initialValues: {
      id: recipe.id,
      name: recipe.name,
      author_id: recipe.author_id,
      ingredients: recipe.ingredients ?? [],
    },
    onSubmit: (values) => mutate(values),
    validationSchema: CreateUpdateRecipeValidationSchema,
  });

  return (
    <RecipeDrawer open={open} handleClose={handleClose}>
      <Typography variant="h4" mt={2}>
        Update a Recipe
      </Typography>
      <form onSubmit={form.handleSubmit}>
        <Stack>
          <TextField
            name="name"
            onChange={form.handleChange}
            value={form.values.name}
            variant="outlined"
            fullWidth
            helperText={form.errors.name}
            error={form.errors.name !== undefined}
          />
        </Stack>
        <Stack mt={2} direction="row" spacing={2}>
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
          <LoadingButton
            loading={isPending}
            variant="contained"
            type="submit"
            color="primary"
            fullWidth={false}
          >
            Confirm
          </LoadingButton>
        </Stack>
      </form>
    </RecipeDrawer>
  );
}
