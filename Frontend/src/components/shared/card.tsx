import { Card, Image, Text, Group, Anchor, Rating, Badge } from '@mantine/core';
import { Recipe } from '../../types/recipe';

type Props = {
    width: number;
    recipe: Recipe;
    isRegular: boolean;
};

function MainCard({ width, recipe, isRegular }: Props) {

    return (
        <Card
            style={{
                width: '320px',
                height: '320px',
                overflow: 'hidden',
                transition: 'transform 0.2s ease',
            }}
            shadow="lg" padding="md" radius="lg" withBorder w={width}
            onMouseEnter={(e) => isRegular ? e.currentTarget.style.transform = 'scale(1.05)' : null}
            onMouseLeave={(e) => isRegular ? e.currentTarget.style.transform = 'scale(1)' : null}>
            <Card.Section component="a" href={`/posts/${recipe._id}`} style={{ position: 'relative' }}>
                <Image
                    src={recipe.cloudinary_image}
                    height={180}
                    alt="recipe image"
                    fit="cover"
                />
                <Badge
                    color="teal"
                    size="sm"
                    style={{ position: 'absolute', top: 10, left: 10 }}>
                    {recipe.cuisine}
                </Badge>
            </Card.Section>

            <Group justify="space-between" mt="sm">
                <Anchor href={`/userProfile/${recipe.uploader_un}`} size="xs" color="dimmed" target="_blank" underline="hover">
                    {recipe.uploader_un}
                </Anchor>
                <Text size="xs" c="dimmed">{recipe.cookTime}</Text>
            </Group>

            <Text lineClamp={1} fw={600} mt={4} size="md">
                {recipe.title}
            </Text>

            <Text lineClamp={2} size="xs" mt={2} color="dimmed">
                {recipe.description}
            </Text>

            <Group justify="space-between" mt="md" align="center" gap="xs">
                <Rating value={recipe.averageRating} readOnly size="xs" />
                <Text size="xs" color="dimmed">({recipe.ratings.length})</Text>
            </Group>
        </Card>
    );
}

export default MainCard;