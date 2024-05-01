import { baseApi } from '.';
import { createPost, createResponse } from '../types/recipe';

export const recipeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getRecipes: build.query<SignInResponse, SignInRequestBody>({
            query: (userData) => ({
                url: 'recipes',
                method: 'GET',
                body: userData,
            }),
        }),
        postRecipes: build.mutation<createResponse, createPost>({
            query: (userData) => ({
                url: 'api/create',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
})


export const {
    usePostRecipesMutation,
    useGetRecipesQuery
} = recipeApi;
