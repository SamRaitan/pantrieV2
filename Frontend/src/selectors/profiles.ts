import { baseApi } from '.';
import { FollowRequest, UserProfileResponse } from '../types/profile';

export const profileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchUserProfile: build.query<UserProfileResponse, string>({
            query: (username) => ({
                url: `api/userProfile/${username}`,
                method: 'GET',
            }),
        }),
        followAUser: build.mutation<FollowRequest, any>({
            query: ({ vUserId, action, userId }) => ({
                url: `api/user/${vUserId}/${action}`,
                method: 'POST',
                body: { userId },
            }),
        }),
    }),
})


export const {
    useFetchUserProfileQuery,
    useFollowAUserMutation
} = profileApi;
