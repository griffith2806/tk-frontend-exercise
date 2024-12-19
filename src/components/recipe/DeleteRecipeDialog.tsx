import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Recipe } from "../../models/recipe";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../configurations/queryClient";
import { deleteRecipe } from "../../services/recipeService";

interface IDeleteDialogProps {
  open: boolean;
  recipe: Recipe;
  handleClose: () => void;
}

export function DeleteRecipeDialog({ open, recipe, handleClose }: IDeleteDialogProps) {
    const mutationResult = useMutation({
        mutationFn: deleteRecipe,
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

      const handleDeletedClick = (id: string) =>{
        mutationResult.mutate(id)
      }

    return (
    <Dialog open={open} maxWidth="sm">
      <DialogTitle>Delete {recipe.name}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete {recipe.name}?
      </DialogContent>
      <DialogActions>
        <Stack mt={2} direction="row" spacing={2}>
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
          <LoadingButton
            loading={mutationResult.isPending}
            variant="contained"
            type="submit"
            color="primary"
            fullWidth={false}
            onClick={() => handleDeletedClick(recipe.id!)}
          >
            Confirm
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
