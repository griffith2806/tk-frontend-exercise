import { array, object, string } from "yup";

export const CreateUpdateRecipeValidationSchema = object().shape({
  name: string()
    .required("Name must be at least 1 character")
    .max(255, "Name must not exceed 255 characters"),
  ingredients: array()
    .of(string().min(1, "Ingredient must not be empty"))
    .optional()
    .min(
      1,
      "At least one ingredient is required when ingredients are provided"
    ),
});
