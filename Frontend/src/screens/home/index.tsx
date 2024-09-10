import { Anchor, Button, Container, Divider, Group, Text } from '@mantine/core';
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
            <Group justify='center'>
                <Anchor href={`/discover/${undefined}`}>
                    <Button color={'teal'}>More Recipes</Button>
                </Anchor>
            </Group>
            <Divider my="md" />
            <Trending />
        </Container>
    );
}


export default Home;
