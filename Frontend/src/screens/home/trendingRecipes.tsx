import { useFetchRecipesQuery } from '../../selectors/recipes';
import { Blockquote, Container, Group, Text } from '@mantine/core';
import Loading from '../../components/shared/loader';
import { Carousel } from '@mantine/carousel';
import MainCard from '../../components/shared/card';

function Trending() {
    const { data: recipes, isLoading, isError } = useFetchRecipesQuery(5);

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading recipes.</p>;

    return (
        <>
            <Text fw={800} p={10}>Trending</Text>
            <Blockquote color="teal" mt="xl" my={5}>

                <Carousel
                    slideSize="33.333333%"
                    slideGap="md"
                    loop
                    dragFree
                >
                    {recipes && recipes.data.map((recipe, index) => (
                        <Carousel.Slide><MainCard key={index} recipe={recipe} width={220} /></Carousel.Slide>
                    ))}
                </Carousel>
            </Blockquote>
        </>
    );
}

export default Trending;