import { baseApi } from '.';
import { createPost, createResponse, GetRecipe, GetRecipes, LikeResponse, rateResponse } from '../types/recipe';

export const recipeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        postRecipes: build.mutation<createResponse, createPost>({
            query: (userData) => ({
                url: 'api/create',
                method: 'POST',
                body: userData,
            }),
        }),
        fetchRecipes: build.query<GetRecipes, number | void>({
            query: (limit = 20) => ({
                url: `api/posts?limit=${limit}`,
                method: 'GET',
            }),
        }),
        fetchRecipe: build.query<GetRecipe, string>({
            query: (id) => ({
                url: `api/posts/${id}`,
                method: 'GET',
            }),
        }),
        likeARecipe: build.mutation<LikeResponse, any>({
            query: ({ postId, action, userId }) => ({
                url: `api/posts/${postId}/${action}`,
                method: 'POST',
                body: { userId },
            }),
        }),
        rateARecipe: build.mutation<rateResponse, any>({
            query: ({ postId, rating, userId }) => ({
                url: `api/posts/${postId}/rating`,
                method: 'POST',
                body: { userId, rating },
            }),
        }),
        discoverRecipes: build.query<any, { cuisine?: string; searchQuery?: string; from?: number; }>({
            query: ({ cuisine = '', searchQuery = '', from = 0 }) => {
                let queryString = `api/discover?from=${from}`;
                if (searchQuery) {
                    queryString += `&searchQuery=${searchQuery}`;
                }
                if (cuisine) {
                    queryString += `&cuisine=${cuisine}`;
                }

                return {
                    url: queryString,
                    method: 'GET',
                };
            },
        }),
        editRecipe: build.mutation<any, any>({
            query: ({ id, formData }) => ({
                url: `api/posts/${id}/edit`,
                method: 'PUT',
                body: formData,
            }),
        }),
        deleteRecipe: build.query<any, any>({
            query: (recipeId) => ({
                url: `api/posts/${recipeId}/delete`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    usePostRecipesMutation,
    useFetchRecipesQuery,
    useFetchRecipeQuery,
    useLikeARecipeMutation,
    useRateARecipeMutation,
    useLazyDiscoverRecipesQuery,
    useEditRecipeMutation,
    useLazyDeleteRecipeQuery
} = recipeApi;