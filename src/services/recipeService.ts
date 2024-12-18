import { Recipe, Recipes } from "../models/recipe";

const resource = "recipes";

export async function getRecipes(): Promise<Recipes> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/${resource}`);

  if (!response.ok) {
    throw new Error("Failed to get recipes");
  }

  return response.json();
}

export async function getRecipe(id: string) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/${resource}/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to get recipe");
  }

  return response.json();
}

export async function createRecipe(newRecipe: Recipe) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/${resource}/create`,
    {
        method: 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create recipe");
  }

  return response.json();
}
