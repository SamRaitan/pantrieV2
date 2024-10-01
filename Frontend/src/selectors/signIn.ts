import { baseApi } from '.';

export const signInApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signin: build.mutation<SignInResponse, SignInRequestBody>({
            query: (userData) => ({
                url: 'api/signin',
                method: 'POST',
                body: userData,
            }),
        }),
        logout: build.mutation<any, void>({
            query: () => ({
                url: 'api/logout',
                method: 'GET',
            }),
        }),

    }),
})


export const { useSigninMutation, useLogoutMutation } = signInApi;
