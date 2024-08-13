import MainCard from "./card"
import { Center, Group, SimpleGrid, Text } from '@mantine/core';
import { Recipe } from "../../types/recipe";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
    recipes: any;
    title: string;
};

function CardLayout({ recipes, title }: Props) {
    console.log(recipes);

    const isPhoneOrSmaller = useMediaQuery('(max-width: 820px)');



    return (
        <>
            <Text fw={800} m={10} p={10}>{title}</Text>
            <Group justify="center" m={10}>
                {recipes && (
                    isPhoneOrSmaller ? (
                        <Center>
                            <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}>
                                {recipes.data.map((recipe: Recipe) => (
                                    <MainCard recipe={recipe} width={170} />
                                ))}
                            </SimpleGrid>
                        </Center>
                    ) : (
                        <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
                            {recipes.data.map((recipe: Recipe) => (
                                <MainCard recipe={recipe} width={260} />
                            ))}
                        </SimpleGrid>
                    )
                )}
            </Group>
        </>
    )
}

export default CardLayout