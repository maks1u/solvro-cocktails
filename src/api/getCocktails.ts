import type { CocktailsApiResponse, Cocktail } from '~/schemas/api'

export async function getCocktails(pageNumber: number, cocktailName: string): Promise<{ apiMeta: CocktailsApiResponse['meta']; cocktailsData: Cocktail[] }> {
  const response = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails?page=${pageNumber}&name=%${cocktailName}%&perPage=15`);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json() as CocktailsApiResponse;
  return {
    apiMeta: data.meta,
    cocktailsData: data.data
  };
}
