import React, { useEffect, useState } from 'react';
import { Button, TextInput, FileInput, Grid, Text, Fieldset, Stack, Textarea, NumberInput, Group, SegmentedControl, Select } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { FiXCircle } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { cuisines } from '../../../utils/cuisines';
import { dishTypes } from '../../../utils/dishType';
import { createPost } from '../../../types/recipe';
import createSchema from './validation'
import { useDispatch } from 'react-redux';
import { usePostRecipesMutation } from '../../../selectors/recipes';

function CreateForm() {
    const [ingredients, setIngredients] = useState([{ value: '' }]);
    const [steps, setSteps] = useState([{ value: '' }]);
    const [formCookTime, setFormCookTime] = useState<string>();
    const [formPrepTime, setFormPrepTime] = useState<string>();

    const dispatch = useDispatch();
    const [createRecipe, { isLoading }] = usePostRecipesMutation();

    const form = useForm<createPost>({
        initialValues: {
            title: '',
            image: '',
            ingredients: ingredients.map(ingredient => ingredient.value), // Map ingredients to values
            steps: steps.map(step => step.value), // Map steps to values
            description: '',
            cookTime: '',
            prepTime: '',
            servings: '',
            cuisine: '',
            dishType: '',
            visibility: 'Public',

        },
        validate: yupResolver(createSchema)
    });

    // Update form values when ingredients change
    useEffect(() => {
        form.setFieldValue('ingredients', ingredients.map(ingredient => ingredient.value));
    }, [ingredients]);

    // Update form values when steps change
    useEffect(() => {
        form.setFieldValue('steps', steps.map(step => step.value));
    }, [steps]);

    const handleIngredientChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newIngredients = [...ingredients];
        newIngredients[index].value = event.target.value;
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { value: '' }]);
    };

    const handleDeleteIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleStepChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newSteps = [...steps];
        newSteps[index].value = event.target.value;
        setSteps(newSteps);
    };

    const handleAddStep = () => {
        setSteps([...steps, { value: '' }]);
    };

    const handleDeleteStep = (index: number) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    };

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


    const submit = async (data: any) => {
        if (form.validate().hasErrors) {
            return form.values
        } else {
            const response = await createRecipe(data)
            console.log(response);
            console.log(data);


        }


    }

    return (
        <>
            <Fieldset legend="Recipe Cover">
                <TextInput
                    radius="md"
                    label="Recipe Title"
                    withAsterisk
                    placeholder="enter recipe name"
                    {...form.getInputProps('title')}
                />
                <FileInput
                    p={10}
                    withAsterisk
                    variant="filled"
                    label="Recipe Image"
                    placeholder="enter valid image"
                    accept=".png,.jpeg,.jpg"
                    onChange={(file: File | null) => {
                        if (file) {
                            // Check if the file type is PNG or JPEG
                            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                                const fileURL = URL.createObjectURL(file);
                                form.setFieldValue('image', fileURL);
                            } else {
                                // Notify the user about the invalid file type
                                alert('Please upload only PNG or JPEG files.');
                            }
                        }
                    }}
                />
            </Fieldset>

            <Fieldset legend="Recipe Ingredients">
                <Stack m={10} align="stretch" justify="center" gap="md">
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <Text>{`Ingredient ${index + 1}`}</Text>
                            <Grid gutter="3">
                                <Grid.Col span={10}>
                                    <TextInput
                                        withAsterisk
                                        radius="md"
                                        placeholder="e.g. 2 tbs Sugar"
                                        value={ingredient.value}
                                        onChange={(event) => handleIngredientChange(index, event)}
                                    />
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <Button onClick={() => handleDeleteIngredient(index)} variant="subtle" color="red">
                                        <FiXCircle style={{ fontSize: '20px' }} />
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </div>
                    ))}
                    <Button onClick={handleAddIngredient} variant="outline">
                        Add Ingredient
                    </Button>
                </Stack>
            </Fieldset>

            <Fieldset legend="Cooking Method">
                <Stack m={10} align="stretch" justify="center" gap="md">
                    {steps.map((step, index) => (
                        <div key={index}>
                            <Text>{`Step ${index + 1}`}</Text>
                            <Grid gutter="3">
                                <Grid.Col span={10}>
                                    <TextInput
                                        radius="md"
                                        withAsterisk
                                        placeholder="step.."
                                        value={step.value}
                                        onChange={(event) => handleStepChange(index, event)}
                                    />
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <Button onClick={() => handleDeleteStep(index)} variant="subtle" color="red">
                                        <FiXCircle style={{ fontSize: '20px' }} />
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </div>
                    ))}
                    <Button onClick={handleAddStep} variant="outline">
                        Add Step
                    </Button>
                </Stack>

                <Textarea
                    radius="md"
                    placeholder="describe the cooking method..."
                    label="Recipe Description"
                    autosize
                    minRows={4}
                    withAsterisk
                    {...form.getInputProps('description')}
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

            <Fieldset legend="Recipe Origin">
                <Select
                    m={5}
                    radius="md"
                    withAsterisk
                    label="Cuisine"
                    data={cuisines}
                    placeholder="cuisine type"
                    searchable
                    {...form.getInputProps('cuisine')}
                />
                <Select
                    m={5}
                    radius="md"
                    label="Dish Type"
                    withAsterisk
                    placeholder="what type of dish?"
                    data={dishTypes}
                    {...form.getInputProps('dishType')}
                />
            </Fieldset>

            <SegmentedControl
                m={10}
                radius="md"
                fullWidth
                data={['Public', 'Private', 'Unlisted']}
                {...form.getInputProps('visibility')}
            />

            <Group justify="center" mt="md">
                <Button onClick={() => submit(form.values)}>Post it!</Button>
            </Group>
        </>
    );
}

export default CreateForm;
