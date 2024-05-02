import { User } from './user';

type Recipe = {
    _id: string;
    uploader: string;
    title: string;
    image?: string | null;
    ingredients: string[];
    steps: string[];
    description: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    foodType: 'Main' | 'Appetizer' | 'Side' | 'Dessert' | 'Beverage' | 'Kids';
    cuisine: 'Japanese' | 'Italian' | 'French' | 'Israeli' | 'American' | 'Chinese' | 'Moroccan';
    visibility: 'Public' | 'Private' | 'Unlisted';
    likesCount: number;
    likes: string[];
    createdAt: Date;
    updatedAt: Date;
}

type createPost = {
    title: string;
    image: any;
    ingredients: string[];
    steps: string[];
    description: string;
    cookTime: string | undefined;
    prepTime?: string | undefined;
    servings: string | number;
    cuisine: string;
    dishType: string;
    visibility: string;
}

type createPostError = {
    data: string;
    status: number;
}

type createResponse = {
    data: string;
}

type IsLoggedInResponse = {
    data: 'success';
}

// Request to get all posts
type GetAllPostsResponse = {
    data: Recipe[];
}

// Request to create a new post
type CreatePostRequestBody = {
    title: string;
    ingredient: string[];
    steps: string[];
    description: string;
    prepNumber: string;
    prepTime: string;
    cookNumber: string;
    cookTime: string;
    servings: string;
    type: string;
    cuisine: string;
    visibility: string;
    image: File;
}

type CreatePostResponse = {
    data: string;
}

// Request to get post details
type GetPostDetailsResponse = {
    data: {
        post: Recipe;
        visitedUser: User;
    };
}

// Request to delete a post
type DeletePostRequestParams = {
    postId: string;
}

type LikePostRequestParams = {
    postId: string;
}

type LikePostRequestBody = {
    userId: string;
}

type LikePostResponse = {
    data: {
        post: Recipe;
        user: User;
        status: 'like' | 'unlike';
    };
}
