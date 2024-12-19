import { array, object, string } from "yup";

const IngredientValidationSchema = object().shape({
    id: string(),
    name: string().max(255, "Name must not exceed 255 characters")
})

export const CreateUpdateRecipeValidationSchema = object().shape({
  name: string()
    .required("Name must be at least 1 character")
    .max(255, "Name must not exceed 255 characters"),
  ingredients: array()
    .of(IngredientValidationSchema)
    .optional()
});
