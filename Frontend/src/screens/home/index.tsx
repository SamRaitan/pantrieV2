import { Center, Container, Group, SimpleGrid, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import MainCard from '../../components/shared/card';
import FoodCuisines from '../../components/foodTypeCarusel';
import { useFetchRecipesQuery } from '../../selectors/recipes';

function Home() {
    const { data: recipes, isLoading, isError } = useFetchRecipesQuery();
    const isPhoneOrSmaller = useMediaQuery('(max-width: 820px)'); // Adjust the width according to your breakpoint

    return (
        <>
            <Container size={'lg'}>
                <Text fw={800}>Cuisines</Text>
                <Group justify="center">
                    <FoodCuisines />
                </Group>
                <Text fw={800} m={10} p={10}>For You</Text>
                <Group justify="center" m={10}>
                    {isLoading && <Text>Loading...</Text>}
                    {isError && <Text>Error loading recipes</Text>}
                    {recipes && (
                        isPhoneOrSmaller ? (
                            <Center>
                                <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}>
                                    {recipes.data.map((recipe) => (
                                        <MainCard recipe={recipe} width={170} />
                                    ))}
                                </SimpleGrid>
                            </Center>
                        ) : (
                            <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}>
                                {recipes.data.map((recipe) => (
                                    <MainCard recipe={recipe} width={260} />
                                ))}
                            </SimpleGrid>
                        )
                    )}
                </Group>
            </Container>
        </>
    );
}

export default Home;
