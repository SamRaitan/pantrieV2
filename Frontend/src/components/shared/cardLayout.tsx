import MainCard from "./card";
import { Center, Group, SimpleGrid, Text } from '@mantine/core';
import { GetRecipes, Recipe } from "../../types/recipe";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
    recipes: GetRecipes | undefined; // Expecting recipes to be an array of Recipe objects
    title: string;
};

function CardLayout({ recipes, title }: Props) {
    const isPhoneOrSmaller = useMediaQuery('(max-width: 820px)');

    return (
        <>
            <Text fw={800} m={10} p={0}>{title}</Text>
            <Group justify="center" m={10}>
                {recipes && recipes.data.length > 0 && ( // Ensure recipes is not empty
                    isPhoneOrSmaller ? (
                        <Center>
                            <SimpleGrid cols={2}>
                                {recipes.data.map((recipe, index) => (
                                    <MainCard key={index} recipe={recipe} width={170} />
                                ))}
                            </SimpleGrid>
                        </Center>
                    ) : (
                        <SimpleGrid cols={4}>
                            {recipes.data.map((recipe, index) => (
                                <MainCard key={index} recipe={recipe} width={220} />
                            ))}
                        </SimpleGrid>
                    )
                )}
            </Group>
        </>
    );
}

export default CardLayout;