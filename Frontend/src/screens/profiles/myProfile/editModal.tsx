import {
    Button, TextInput, FileInput, Group, Fieldset, SegmentedControl, LoadingOverlay,
    Textarea, Grid, Text,
    NumberInput,
    Select,
    Mark
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../slice/authSlice';
import { useEditRecipeMutation } from '../../../selectors/recipes';
import { useState } from 'react';

type Props = {
    recipeId: string;
    recipe: any;
};

const EditRecipeModal = ({ recipeId, recipe }: Props) => {
    const [editRecipe, { isLoading }] = useEditRecipeMutation();
    const dispatch = useDispatch();

    const [formCookTime, setFormCookTime] = useState<string>();
    const [formPrepTime, setFormPrepTime] = useState<string>();

    const form = useForm({
        initialValues: {
            title: recipe.title || '',
            image: '',
            ingredients: recipe.ingredients || [],
            steps: recipe.steps || [],
            description: recipe.description || '',
            cookTime: recipe.cookTime || '',
            prepTime: recipe.prepTime || '',
            servings: recipe.servings || '',
            cuisine: recipe.cuisine || '',
            dishType: recipe.dishType || '',
            visibility: recipe.visibility || 'Public',
        },
    });

    const cookTime = (value: number) => {
        const time = value !== undefined ? value : formCookTime?.split(' ')[0] || '';
        const unit = formCookTime ? formCookTime.split(' ')[1] || '' : '';
        const newCookTime = `${time} ${unit}`.trim();
        setFormCookTime(newCookTime);
        form.setFieldValue('cookTime', newCookTime);
    };

    const cookTimeUnit = (unit: string | null) => {
        const time = formCookTime ? formCookTime.split(' ')[0] : '';
        const newCookTime = `${time} ${unit}`
        setFormCookTime(newCookTime);
        form.setFieldValue('cookTime', newCookTime);
    };

    const prepTime = (value: number) => {
        const time = value !== undefined ? value : formPrepTime?.split(' ')[0] || '';
        const unit = formPrepTime ? formPrepTime.split(' ')[1] || '' : '';
        const newPrepTime = `${time} ${unit}`.trim();
        setFormPrepTime(newPrepTime);
        form.setFieldValue('prepTime', newPrepTime);
    };

    const prepTimeUnit = (unit: string | null) => {
        const time = formPrepTime ? formPrepTime.split(' ')[0] : '';
        const newPrepTime = `${time} ${unit}`
        setFormPrepTime(newPrepTime);
        form.setFieldValue('prepTime', newPrepTime);
    };

    const submit = async (values: any) => {
        console.log(values);

        const formData = new FormData();
        formData.append('title', values.title);
        if (values.image) formData.append('image', values.image);
        formData.append('ingredients', JSON.stringify(values.ingredients));
        formData.append('steps', JSON.stringify(values.steps));
        formData.append('description', values.description);
        formData.append('cookTime', values.cookTime);
        formData.append('prepTime', values.prepTime);
        formData.append('servings', values.servings);
        formData.append('cuisine', values.cuisine);
        formData.append('dishType', values.dishType);
        formData.append('visibility', values.visibility);

        try {
            const response = await editRecipe({ id: recipeId, formData }).unwrap();
            if (response?.error?.status === 401) {
                dispatch(clearUser());
                window.location.href = '/signin';
            } else {
                console.log('Recipe updated successfully', response);
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <div>
            {isLoading && <LoadingOverlay visible />}
            <Group justify='center'><Mark color="red">Only The Field You Fill Will Update The Rest Will Stay As They Were!  (no need to update them all)</Mark></Group>
            <Fieldset legend="Recipe Cover" m={15}>
                <TextInput
                    radius="md"
                    label="Recipe Title"
                    withAsterisk
                    placeholder="Enter recipe name"
                    {...form.getInputProps('title')}
                />
                <Textarea
                    radius="md"
                    placeholder="describe the cooking method..."
                    label="Recipe Description"
                    autosize
                    minRows={4}
                    withAsterisk
                    {...form.getInputProps('description')}
                />
                <FileInput
                    p={10}
                    label="Recipe Image"
                    placeholder="Update image"
                    accept=".png,.jpeg,.jpg"
                    onChange={(file: any) => {
                        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
                            form.setFieldValue('image', file);
                        } else {
                            alert('Please upload only PNG or JPEG files.');
                        }
                    }}
                />
            </Fieldset>
            <Fieldset legend="Recipe Details">
                <Group>
                    <Grid>
                        <Grid.Col span={4}>
                            <NumberInput
                                radius="md"
                                withAsterisk
                                label="Cook Time"
                                placeholder="e.g. 1"
                                onChange={(value: any) => cookTime(value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Select
                                radius="md"
                                label="Time Unit"
                                withAsterisk
                                placeholder="enter time unit"
                                data={['Minutes', 'Hours', 'Days', 'Weeks']}
                                onChange={(event) => cookTimeUnit(event)}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <NumberInput
                                radius="md"
                                withAsterisk
                                label="Prep Time"
                                placeholder="e.g. 3"
                                onChange={(value: any) => prepTime(value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Select
                                radius="md"
                                withAsterisk
                                label="Time Unit"
                                placeholder="enter time unit"
                                data={['Minutes', 'Hours', 'Days', 'Weeks']}
                                onChange={(event) => prepTimeUnit(event)}
                            />
                        </Grid.Col>
                        <br />
                        <Grid.Col span={4}>
                            <Group>
                                <Text>Servings: </Text>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <NumberInput
                                radius="md"
                                placeholder="serving count"
                                {...form.getInputProps('servings')}
                            />
                        </Grid.Col>
                    </Grid>
                </Group>
            </Fieldset>
            <br />
            <SegmentedControl
                radius="md"
                fullWidth
                data={['Public', 'Private', 'Unlisted']}
                {...form.getInputProps('visibility')}
            />

            <Group justify="center" mt="md">
                <Button
                    color={'teal'}
                    onClick={() => submit(form.values)}
                >
                    Save Changes
                </Button>
            </Group>
        </div>
    );
};

export default EditRecipeModal;