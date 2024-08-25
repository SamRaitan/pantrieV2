import { useFetchRecipesQuery } from '../../selectors/recipes';
import { Text } from '@mantine/core';
import Loading from '../../components/shared/loader';
import { Carousel } from '@mantine/carousel';
import MainCard from '../../components/shared/card';

function Trending() {
    const { data: recipes, isLoading, isError } = useFetchRecipesQuery(5);

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading recipes.</p>;

    return (
        <>
            <Carousel
                withIndicators
                slideSize="33.333333%"
                slideGap="md"
                loop
                align="center"
                slidesToScroll={3}
            >
                {recipes && recipes.data.map((recipe, index) => (
                    <Carousel.Slide><MainCard key={index} recipe={recipe} width={220} /></Carousel.Slide>
                ))}
            </Carousel>
        </>
    );
}

export default Trending;