export interface Recipe {
  id?: string;
  name: string;
  ingredients?: Recipe[];
  author_id: string;
  author_name?: string;
}

export interface Recipes {
    recipes: Recipe[]
}

export interface Ingredient {
  id: string;
  name: string;
}