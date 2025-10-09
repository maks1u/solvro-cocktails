export type Cocktail = {
  id: number;
  name: string;
  category:
    | "Cocktail"
    | "Ordinary Drink"
    | "Punch / Party Drink"
    | "Shake"
    | "Other / Unknown"
    | "Cocoa"
    | "Shot"
    | "Coffee / Tea"
    | "Homemade Liqueur"
    | "Soft Drink";
  glass?:
    | "Highball glass"
    | "Old-fashioned glass"
    | "Cocktail glass"
    | "Copper Mug"
    | "Whiskey Glass"
    | "Collins glass"
    | "Pousse cafe glass"
    | "Champagne flute"
    | "Whiskey sour glass"
    | "Brandy snifter"
    | "White wine glass"
    | "Nick and Nora Glass"
    | "Hurricane glass"
    | "Coffee mug"
    | "Shot glass"
    | "Jar"
    | "Irish coffee cup"
    | "Punch bowl"
    | "Pitcher"
    | "Pint glass"
    | "Cordial glass"
    | "Beer mug"
    | "Margarita/Coupette glass"
    | "Beer pilsner"
    | "Beer Glass"
    | "Parfait glass"
    | "Wine Glass"
    | "Mason jar"
    | "Margarita glass"
    | "Martini Glass"
    | "Balloon Glass"
    | "Coupe Glass";
  instructions?: string | null;
  imageUrl: string;
  alcoholic: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CocktailsApiMeta = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string;
  previousPageUrl: string | null;
};

export type CocktailsApiResponse = {
  meta: CocktailsApiMeta;
  data: Cocktail[];
};

export type RecipeData = {
  id: number;
  name: string;
}