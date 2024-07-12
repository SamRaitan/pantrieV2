import { Card, Image, Text, Group } from '@mantine/core';
import { Recipe } from '../../types/recipe';

// Define the Props type correctly
type Props = {
    width: number;
    recipe: Recipe;
};

function MainCard({ width, recipe }: Props) {

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={width}>
            <Card.Section component="a" href="/create-recipe-post">
                <Image
                    src={recipe.cloudinary_image}
                    height={160}
                    alt="recipe image"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{recipe.title}</Text>
            </Group>

            <Text size="sm" c="dimmed">
                {recipe.description}
            </Text>
        </Card>
    );
}

export default MainCard;
