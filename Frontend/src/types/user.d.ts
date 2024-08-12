type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    avatar?: string | null;
    cloudinary_id?: string | null;
    likedRecipes: string[]; // Assuming this is an array of recipe IDs
    following: string[]; // Assuming this is an array of user IDs
    followingCount: number;
    followers: string[]; // Assuming this is an array of user IDs
    followersCount: number;
    RecipeCount: number;
    blockedUser: string[];
    createdRecipes: string[];
    createdAt: Date;
    updatedAt: Date;
}
