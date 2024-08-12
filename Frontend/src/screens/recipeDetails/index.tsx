import { useParams } from 'react-router-dom';
import { useFetchRecipeQuery, useLikeARecipeMutation } from '../../selectors/recipes';
import { AspectRatio, Badge, Checkbox, Divider, Grid, List, Paper, Spoiler, Stack, Text, Image, Center, Container, Group, Button, Anchor } from '@mantine/core';
import { useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';



interface RouteParams {
    id: string;
}

function RecipeDetail() {
    const { id } = useParams<RouteParams>();
    const user = useSelector((state: RootState) => state.auth.user);
    const { data: recipes, isLoading, isError } = useFetchRecipeQuery(id);
    const [likeARecipe] = useLikeARecipeMutation();

    const [isClicked, setIsClicked] = useState(false);



    const handleClick = async (action: string) => {
        try {
            const { data } = await likeARecipe({ postId: id, action, userId: user }).unwrap();
            console.log(data);
            setIsClicked((prevState) => !prevState);
        } catch (error) {
            console.error('Error liking/unliking the recipe:', error);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading recipe.</p>;

    return (
        <Container>
            <Group justify="center" m={15}>
                <Text tt="capitalize" size='xl' fw={600}>
                    {recipes?.data.title}
                </Text>
            </Group>
            <Image
                p={5}
                radius="lg"
                src={recipes?.data.cloudinary_image}
            />

            <Divider my="md" />

            <Group justify="space-between" m={5} mt={10}>
                <Stack
                    align="flex-start"
                    justify="center"
                    gap={0}
                >
                    <Anchor href={`/userProfile/${recipes?.data.uploader_un}`} fw={700} size='md' c='black' underline="never">
                        {recipes?.data.uploader_un}
                    </Anchor>
                    <Text c="dimmed" size="sm">Likes: {recipes?.data.likesCount}</Text>
                </Stack>
                {user && (
                    <Button
                        variant="transparent"
                        color="teal"
                        size="md"
                        radius="md"
                        onClick={() => handleClick(recipes?.data.likes.includes(user._id) ? 'unlike' : 'like')}
                    >
                        {recipes?.data.likes.includes(user._id) ? (
                            <BiSolidLike style={{ fontSize: '24px' }} />
                        ) : (
                            <BiLike style={{ fontSize: '24px' }} />
                        )}
                    </Button>
                )}
            </Group>

            <Stack miw={50}>
                <Grid>
                    <Grid.Col span={{ xs: 12, md: 5 }}>
                        <Paper shadow="xl" radius="lg" p="lg">
                            <Grid>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <Text fw={500}>
                                        Prep Time: {recipes?.data.prepTime}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <Text fw={500}>
                                        Cook Time: {recipes?.data.cookTime}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <Text fw={500}>
                                        Servings: {recipes?.data.servings}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <Badge color="teal">
                                        {recipes?.data.cuisine}
                                    </Badge>
                                </Grid.Col>
                            </Grid>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={{ xs: 12, md: 6 }} m={7}>
                        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                            {recipes?.data.description}
                        </Spoiler>
                    </Grid.Col>
                </Grid>

                <Divider my="md" />

                <Grid>
                    <Grid.Col span={{ xs: 12, md: 4 }}>
                        {recipes?.data.ingredients.map((ingredient, index) => (
                            <Checkbox
                                m={5}
                                key={index}
                                defaultChecked
                                label={ingredient}
                                radius="md"
                                color="teal"
                            />
                        ))}
                    </Grid.Col>
                    <Grid.Col span={{ xs: 12, md: 8 }}>
                        <List type="ordered">
                            {recipes?.data.steps.map((step, index) => (
                                <List.Item key={index}>
                                    {step}
                                </List.Item>
                            ))}
                        </List>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    );
};

export default RecipeDetail;