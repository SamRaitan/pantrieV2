import { useParams } from 'react-router-dom';
import { useFetchRecipeQuery, useLikeARecipeMutation, useRateARecipeMutation, } from '../../selectors/recipes';
import { Badge, Checkbox, Divider, Grid, List, Paper, Spoiler, Stack, Text, Image, Container, Group, Button, Anchor, AspectRatio, Rating } from '@mantine/core';
import { useEffect, useState } from 'react';
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Loading from '../../components/shared/loader';
import { notifications } from '@mantine/notifications';

interface RouteParams {
    id: string;
}

function RecipeDetail() {
    const { id } = useParams<RouteParams>();
    const user = useSelector((state: RootState) => state.auth.user);
    const { data: recipes, isLoading, isError, refetch } = useFetchRecipeQuery(id);
    const [likeARecipe] = useLikeARecipeMutation();
    const [rateRecipe] = useRateARecipeMutation();
    const [like, setLike] = useState<boolean>(false);

    useEffect(() => {
        if (user && recipes) {
            setLike(recipes.data.likes.includes(user._id));
        }
    }, [user, recipes]);

    const handleLikeClick = async (action: string) => {
        try {
            await likeARecipe({ postId: id, action, userId: user?._id }).unwrap();
            refetch();
            setLike(action === 'like' ? true : false);
        } catch (error) {
            console.error('Error liking/unliking the recipe:', error);
            setLike(action === 'like' ? false : true);
        }
    };

    const handleRatingChange = async (value: number) => {
        if (user) {
            try {
                await rateRecipe({ postId: id, rating: value, userId: user._id }).unwrap();
                refetch();

                notifications.show({
                    title: 'Rating Success',
                    message: `You have Rated The Recipe ${value} Stars ⭐️`,
                    color: 'green',
                });
            } catch (error) {

                notifications.show({
                    title: 'Error Rating',
                    message: `Rating Recipe Failed`,
                    color: 'red',
                });
            }
        }

    };

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading recipe.</p>;

    return (
        <Container py="xl">
            <Stack gap='lg'>
                <Group justify="space-between" align="center">
                    <Text tt="capitalize" size="2xl" fw={700}>
                        {recipes?.data.title}
                    </Text>
                    <Rating
                        color="teal"
                        defaultValue={recipes?.data.averageRating}
                        onChange={handleRatingChange}
                        size="lg"
                        fractions={2}
                        readOnly={!user}
                    />
                </Group>

                <AspectRatio ratio={16 / 9}>
                    <Image
                        radius="md"
                        src={recipes?.data.cloudinary_image}
                        alt={recipes?.data.title}
                    />
                </AspectRatio>

                <Group justify="space-between" align="center" mt="sm">
                    <Anchor href={`/userProfile/${recipes?.data.uploader_un}`} fw={700} size="lg">
                        {recipes?.data.uploader_un}
                    </Anchor>
                    {user && (
                        <Button
                            variant="subtle"
                            color="teal"
                            size="lg"
                            radius="xl"
                            onClick={() => handleLikeClick(like ? 'unlike' : 'like')}
                            leftSection={like ? <BiSolidLike size={24} /> : <BiLike size={24} />}
                        >
                            {like ? 'Unlike' : 'Like'}
                        </Button>
                    )}
                </Group>

                <Divider />

                <Grid>
                    <Grid.Col span={{ xs: 12, md: 5 }}>
                        <Paper shadow="md" radius="md" p="md" withBorder>
                            <Grid gutter="xs">
                                <Grid.Col span={6}>
                                    <Text fw={600}>Prep Time:</Text>
                                    <Text>{recipes?.data.prepTime}</Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Text fw={600}>Cook Time:</Text>
                                    <Text>{recipes?.data.cookTime}</Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Text fw={600}>Servings:</Text>
                                    <Text>{recipes?.data.servings}</Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Badge color="teal" size="lg">{recipes?.data.cuisine}</Badge>
                                </Grid.Col>
                            </Grid>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ xs: 12, md: 7 }}>
                        <Text fw={700} size="lg">Description</Text>
                        <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                            {recipes?.data.description}
                        </Spoiler>
                    </Grid.Col>
                </Grid>

                <Divider />

                <Grid>
                    <Grid.Col span={{ xs: 12, md: 4 }}>
                        <Text fw={700} size="lg">Ingredients</Text>
                        <Stack mt="xs" gap="xs">
                            {recipes?.data.ingredients.map((ingredient, index) => (
                                <Checkbox
                                    key={index}
                                    label={ingredient}
                                    radius="md"
                                    color="teal"
                                />
                            ))}
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ xs: 12, md: 8 }}>
                        <Text fw={700} size="lg">Cooking Steps</Text>
                        <List type="ordered" mt="xs" spacing="sm">
                            {recipes?.data.steps.map((step, index) => (
                                <List.Item key={index}>{step}</List.Item>
                            ))}
                        </List>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    );
}

export default RecipeDetail;