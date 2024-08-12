import { baseApi } from '.';
import { UserProfileResponse } from '../types/profile';

export const profileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchUserProfile: build.query<UserProfileResponse, string>({
            query: (username) => ({
                url: `api/userProfile/${username}`,
                method: 'GET',
            }),
        }),
    }),
})


export const { useFetchUserProfileQuery } = profileApi;
