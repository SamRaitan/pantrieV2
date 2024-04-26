import { baseApi } from '.';

export const recipeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getRecipes: build.query<SignInResponse, SignInRequestBody>({
            query: (userData) => ({
                url: 'recipes',
                method: 'GET',
                body: userData,
            }),
        }),
        recipes: build.mutation<SignInResponse, SignInRequestBody>({
            query: (userData) => ({
                url: 'api/signin',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
})


export const {
    useRecipesMutation,
    useGetRecipesQuery
} = recipeApi;
