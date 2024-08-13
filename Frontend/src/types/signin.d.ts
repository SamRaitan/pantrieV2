// Types for the signin request body
type SignInRequestBody = {
    userOrEmail: string;
    password: string;
};

// Types for the signin response data
type SignInResponseError = {
    error: {
        status: 401,
        data: {
            error: string
        }
    }
};

// Types for the signin response
type SignInResponse = {
    data: {
        cookie: any
        user: any
    }
};

