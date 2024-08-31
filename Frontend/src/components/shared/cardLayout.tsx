import MainCard from "./card";
import { Center, Group, SimpleGrid, Text } from '@mantine/core';
import { GetRecipes } from "../../types/recipe";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
    recipes: GetRecipes
    title: string;
};

function CardLayout({ recipes, title }: Props) {
    const isPhoneOrSmaller = useMediaQuery('(max-width: 745px)');

    return (
        <>
            <Text fw={800} m={10} p={0}>{title}</Text>
            <Group justify="center" m={10}>
                {recipes.data && recipes.data.length > 0 && ( // Ensure recipes.data is defined
                    isPhoneOrSmaller ? (
                        <Center>
                            <SimpleGrid cols={2}>
                                {recipes.data.map((recipe, index) => (
                                    <MainCard key={index} recipe={recipe} width={170} />
                                ))}
                            </SimpleGrid>
                        </Center>
                    ) : (
                        <SimpleGrid cols={{ xs: 3, md: 4 }}>
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