import User from './user'

type UserProfileRequest = {
    username: string;
};

type UserProfileResponse = {
    data: {
        Recipes: Recipe[];
        User: User;
    };
};

type UserPostsResponse = {
    data: Recipe[];
};

type DeleteProfileImageRequestParams = {
    userId: string;
};

type EditProfileRequestParams = {
    userId: string;
};

type EditProfileRequestBody = {
    username: string;
};

type EditProfileResponse = {
    data: string;
};

type FollowRequestParams = {
    visitedUserId: string;
};

type FollowRequest = {
    userId: string;
};

type FollowResponse = {
    data: {
        currentUser: User;
        visitedUser: User;
        status: string;
    };
};

type UnfollowRequestParams = {
    visitedUserId: string;
};

type UnfollowRequestBody = {
    userId: string;
};

type UnfollowResponse = {
    data: {
        currentUser: User;
        visitedUser: User;
        status: string;
    };
};

type LogoutResponse = {
    data: string;
};
