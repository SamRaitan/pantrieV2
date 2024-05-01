import * as yup from 'yup';

const createSchema = yup.object().shape({
    title: yup.string().required('Recipe title is required'),
    image: yup.string().required('Recipe image is required'),
    ingredients: yup.array().of(yup.string().required('Ingredient is required')),
    steps: yup.array().of(yup.string().required('Step is required')),
    description: yup.string().required('Recipe description is required'),
    cookTime: yup.string().required('Cook time is required'),
    prepTime: yup.string().required('Prep time is required'),
    servings: yup.number().required('Servings is required').positive('Servings must be a positive number'),
    cuisine: yup.string().required('Cuisine is required'),
    dishType: yup.string().required('Dish type is required'),
    visibility: yup.string().required('Visibility is required')
});

export default createSchema;
