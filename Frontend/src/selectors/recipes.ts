import { baseApi } from '.';
import { createPost, createResponse, GetRecipe, GetRecipes, LikeResponse, Recipe } from '../types/recipe';

export const recipeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        postRecipes: build.mutation<createResponse, createPost>({
            query: (userData) => ({
                url: 'api/create',
                method: 'POST',
                body: userData,
            }),
        }),
        fetchRecipes: build.query<GetRecipes | Recipe[], number | void>({
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
    }),
})

export const {
    usePostRecipesMutation,
    useFetchRecipesQuery,
    useFetchRecipeQuery,
    useLikeARecipeMutation,

} = recipeApi;
