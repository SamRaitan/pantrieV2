import { useParams } from 'react-router-dom';
import { useFetchRecipeQuery } from '../../selectors/recipes';
import { AspectRatio, Badge, Checkbox, Divider, Grid, List, Paper, Spoiler, Stack, Text, Image, Center, Container, Group, Button } from '@mantine/core';
import { useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";



interface RouteParams {
    id: string;
}

function RecipeDetail() {
    const { id } = useParams<RouteParams>(); // Explicitly type the useParams hook
    const { data: recipes, isLoading, isError } = useFetchRecipeQuery(id);

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked((prevState) => !prevState);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading recipe.</p>;

    return (
        <Container>
            <Group justify="center" m={30}>
                <Text size='xl' fw={600}>
                    {recipes?.data.title}
                </Text>
            </Group>
            <Image
                p={5}
                radius="lg"
                src={recipes?.data.cloudinary_image}
            />

            <Divider my="md" />

            <Group justify="space-between" m={5}>
                <Stack
                    align="flex-start"
                    justify="center"
                    gap={0}
                >
                    <Text fw={700}>{recipes?.data.uploader_un}</Text>
                    <Text c="dimmed" size="sm">Likes: {recipes?.data.likesCount}</Text>
                </Stack>
                <Button variant="transparent" color='teal' size="md" radius="md" onClick={handleClick}>
                    {isClicked ? <BiSolidLike style={{ fontSize: '24px' }} /> : <BiLike style={{ fontSize: '24px' }} />}
                </Button>
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