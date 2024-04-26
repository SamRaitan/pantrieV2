// Request body interface
type SignUpRequest = {
    username: string;
    email: string;
    password: string;
    fullName: string;
    bio: string | null | undefined;
    region: string;
    dateOfBirth: string;
    image: any | null | undefined;
};


// Response data interface
type SignUpResponse = {
    data: string;
}