import { Container, Group, Text } from '@mantine/core';
import FoodCuisines from '../../components/foodTypeCarusel';
import { useFetchRecipesQuery } from '../../selectors/recipes';
import CardLayout from '../../components/shared/cardLayout';

function Home() {
    const { data: recipes, isLoading, isError } = useFetchRecipesQuery();
    console.log(recipes);

    return (
        <>
            <Container >
                <Text fw={800}>Cuisines</Text>
                <Group justify="center">
                    <FoodCuisines />
                </Group>
                <CardLayout isLoading={isLoading} isError={isError} recipes={recipes} title='For You' />
            </Container>
        </>
    );
}

export default Home;
