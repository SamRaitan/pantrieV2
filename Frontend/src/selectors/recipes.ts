import { baseApi } from '.';
import { createPost, createResponse, GetRecipe, GetRecipes } from '../types/recipe';

export const recipeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        postRecipes: build.mutation<createResponse, createPost>({
            query: (userData) => ({
                url: 'api/create',
                method: 'POST',
                body: userData,
            }),
        }),
        fetchRecipes: build.query<GetRecipes, void>({
            query: () => ({
                url: 'api/posts',
                method: 'GET',
            }),
        }),
        fetchRecipe: build.query<GetRecipe, string>({
            query: (id) => ({
                url: `api/posts/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    usePostRecipesMutation,
    useFetchRecipesQuery,
    useFetchRecipeQuery,

} = recipeApi;
