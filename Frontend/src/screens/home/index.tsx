import { Anchor, Button, Container, Divider, Group, Space, Text } from '@mantine/core';
import FoodCuisines from '../../components/foodTypeCarusel';
import { useFetchRecipesQuery } from '../../selectors/recipes';
import CardLayout from '../../components/shared/cardLayout';
import Loading from '../../components/shared/loader';
import Trending from './trendingRecipes';


function Home() {
    const { data: recipes, isLoading, isError } = useFetchRecipesQuery();

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading recipes.</p>;

    return (
        <Container>
            <Text fw={800} pl={10}>Cuisines</Text>
            <Group justify="center">
                <FoodCuisines />
            </Group>
            <CardLayout recipes={recipes!} title='For You' />
            <Group justify='center' p={10} m={5}>
                <Anchor href={`/discover/${undefined}`}>
                    <Button color={'teal'}>More Recipes</Button>
                </Anchor>
            </Group>
            <Divider my="md" />
            <Trending />
            <Space h="md" />
            <Text size="lg" mt="lg" px="md">
                Discover a world of culinary inspiration, where you can explore new recipes,
                share your favorite dishes, and connect with food lovers from around the globe.
                Whether you’re a seasoned chef or just starting in the kitchen, Pantrie is your go-to
                place for discovering trending recipes, learning cooking tips, and finding new flavors to try.
            </Text>
        </Container>
    );
}


export default Home;
