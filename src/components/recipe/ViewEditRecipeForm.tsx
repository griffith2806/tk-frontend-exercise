import { useMutation, useQuery } from "@tanstack/react-query";
import { Ingredient, Recipe } from "../../models/recipe";
import { RecipeDrawer } from "./RecipeDrawer";
import { queryClient } from "../../configurations/queryClient";
import { useFormik } from "formik";
import { CreateUpdateRecipeValidationSchema } from "../../validation/recipeValidation";
import {
  Autocomplete,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getRecipe, updateRecipe } from "../../services/recipeService";

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
  const mutationResult = useMutation({
    mutationFn: updateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes", "view-recipe"] });
      handleClose();
    },
    onError: (error) => {
      console.error("Failed to create recipe:", error);
    },
    onSettled: () => {
      handleClose();
    },
  });

  const queryResult = useQuery({
    queryKey: ["view-recipe", recipe.id],
    queryFn: () => getRecipe(recipe.id!),
  });

  const form = useFormik<Recipe>({
    initialValues: {
      id: recipe.id,
      name: recipe.name,
      author_id: recipe.author_id,
      ingredients: queryResult.data?.ingredients ?? [],
    },
    onSubmit: (values) => mutationResult.mutate(values),
    validationSchema: CreateUpdateRecipeValidationSchema,
    enableReinitialize: true,
  });

  const loading = mutationResult.isPending || queryResult.isLoading;

  const handleIngredientsChanged = (
    _: React.SyntheticEvent,
    values: Ingredient[]
  ) => {
    const processedValues = values.map((value) => {
      if (typeof value === 'string') {
        return {
          id: Date.now().toString(),
          name: value,
        } as Ingredient;
      }
      return value;
    });
    form.setFieldValue("ingredients", processedValues);
  };

  return (
    <RecipeDrawer open={open} handleClose={handleClose}>
      <Typography variant="h4" mt={2}>
        Update a Recipe
      </Typography>
      <form onSubmit={form.handleSubmit}>
        <Stack gap={2} mt={1}>
          <TextField
            name="name"
            onChange={form.handleChange}
            value={form.values.name}
            variant="outlined"
            label="Name"
            fullWidth
            helperText={form.errors.name}
            error={form.errors.name !== undefined}
          />
          <Autocomplete
            multiple
            id="ingrediednts-autocomplete"
            options={[]}
            value={form.values.ingredients ?? []}
            onChange={(e, vals) => handleIngredientsChanged(e, vals as unknown as Ingredient[])}
            freeSolo
            isOptionEqualToValue={(option, value) => {
              if (typeof value === 'string') {
                return option.name === value;
              }
              return option.id === value.id;
            }}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              return option.name;
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Ingredients" />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                const label = typeof option === 'string' ? option : option.name;
                return (
                  <Chip
                    variant="outlined"
                    label={label}
                    key={key}
                    {...tagProps}
                  />
                );
              })
            }
          />
        </Stack>
        <Stack mt={2} direction="row" spacing={2}>
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
          <LoadingButton
            loading={loading}
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
