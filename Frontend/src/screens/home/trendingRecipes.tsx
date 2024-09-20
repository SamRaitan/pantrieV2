import { useFetchRecipesQuery } from '../../selectors/recipes';
import { Blockquote, rem, Text } from '@mantine/core';
import Loading from '../../components/shared/loader';
import { Carousel } from '@mantine/carousel';
import MainCard from '../../components/shared/card';
import { FaFireAlt } from "react-icons/fa";


function Trending() {
    const { data: recipes, isLoading, isError } = useFetchRecipesQuery(5);

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading recipes.</p>;

    return (
        <>
            <Text fw={800} p={10}>Trending <FaFireAlt style={{ width: rem(12), height: rem(12) }} /></Text>
            <Blockquote color="teal" mt="xl" my={1}>

                <Carousel
                    slideSize="33.333333%"
                    slideGap="md"
                    loop
                    dragFree
                >
                    {recipes && recipes.data.map((recipe, index) => (
                        <Carousel.Slide><MainCard key={index} recipe={recipe} width={270} zoom={false} isMyProfile={false} /></Carousel.Slide>
                    ))}
                </Carousel>
            </Blockquote>
        </>
    );
}

export default Trending;