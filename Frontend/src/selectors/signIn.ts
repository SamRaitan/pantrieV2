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

    }),
})


export const { useSigninMutation } = signInApi;
