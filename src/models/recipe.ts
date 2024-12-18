export interface Recipe {
  id?: string;
  name: string;
  ingredients?: string[];
  author_id: string;
  author_name?: string;
}

export interface Recipes {
    recipes: Recipe[]
}