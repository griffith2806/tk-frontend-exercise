import { Button, Container,  Stack, SwipeableDrawer, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Recipe } from "../../models/recipe";
import { CreateUpdateRecipeValidationSchema } from "../../validation/recipeValidation";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../configurations/queryClient";
import { createRecipe } from "../../services/recipeService";

interface IRecipeDrawer {
  open: boolean;
  handleClose: () => void;
}

export default function CreateRecipeDrawer({ open, handleClose }: IRecipeDrawer) {
    const {mutate, isPending} = useMutation({
        mutationFn: createRecipe,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['recipes'] });
          handleClose();
        },
        onError: (error) => {
          console.error('Failed to create recipe:', error);
        },
        onSettled: () => {
            handleClose()
        }
      });

    const form = useFormik<Recipe>({
    initialValues: {
      name: "",
      author_id: "57d1a25e-85cf-4182-9f5d-249a17edbd86", //ID hardcoded since there's no auth for the exercise
    },
    onSubmit: (values) => mutate(values),
    validationSchema: CreateUpdateRecipeValidationSchema,
  });

  return (
    <SwipeableDrawer open={open} anchor="right" onClose={handleClose} onOpen={() =>{}}>
      <Container sx={{ minWidth: "500px" }}>
        <Typography variant="h4" mt={2}>
          Create a New Recipe
        </Typography>
        <form onSubmit={form.handleSubmit}>
          <Stack>
            <TextField
              name="name"
              onChange={form.handleChange}
              variant="outlined"
              fullWidth
              helperText={form.errors.name}
              error={form.errors.name !== undefined}
            />
          </Stack>
          <Stack mt={2} direction="row" spacing={2}>
            <Button onClick={handleClose} variant="outlined">
                Cancel
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
      </Container>
    </SwipeableDrawer>
  );
}
