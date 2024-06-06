import { baseApi } from '.';
import { createPost, createResponse, GetRecipes } from '../types/recipe';

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
    }),
})

export const {
    usePostRecipesMutation,
    useFetchRecipesQuery,
} = recipeApi;
