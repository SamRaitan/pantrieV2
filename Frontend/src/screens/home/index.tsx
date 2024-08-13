import { Container, Group, Text } from '@mantine/core';
import FoodCuisines from '../../components/foodTypeCarusel';
import { useFetchRecipesQuery } from '../../selectors/recipes';
import CardLayout from '../../components/shared/cardLayout';
import Loading from '../../components/shared/loader';

function Home() {
    const { data: recipes, isLoading, isError } = useFetchRecipesQuery();
    console.log(recipes);

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading recipe.</p>;

    return (
        <>
            <Container >
                <Text fw={800}>Cuisines</Text>
                <Group justify="center">
                    <FoodCuisines />
                </Group>
                <CardLayout recipes={recipes} title='For You' />
            </Container>
        </>
    );
}

export default Home;
