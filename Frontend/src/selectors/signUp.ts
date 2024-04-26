import { baseApi } from '.';

export const signUpApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signup: build.mutation<SignUpResponse, SignUpRequest>({
            query: (userData) => ({
                url: 'api/signup',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
})

export const { useSignupMutation } = signUpApi;
