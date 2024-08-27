import { Card, Image, Text, Group, Anchor } from '@mantine/core';
import { Recipe } from '../../types/recipe';

type Props = {
    width: number;
    recipe: Recipe;
};

function MainCard({ width, recipe }: Props) {

    return (
        <Card
            style={{
                width: '300px', // Fixed width
                height: '280px', // Fixed height
                overflow: 'hidden', // Hide overflow content
            }}
            shadow="sm" padding="lg" radius="md" withBorder w={width}>
            <Card.Section component="a" href={`/posts/${recipe._id}`}>
                <Image
                    src={recipe.cloudinary_image}
                    height={160}
                    alt="recipe image"
                />
            </Card.Section>

            <Anchor href={`/userProfile/${recipe.uploader_un}`} size='sm' c='black' target="_blank" underline="never">
                {recipe.uploader_un}
            </Anchor>



            <Group mb="xs">
                <Text lineClamp={1} fw={500}>{recipe.title}</Text>
            </Group>

            <Text lineClamp={2} size="sm" c="dimmed">
                {recipe.description}
            </Text>
        </Card>
    );
}

export default MainCard;
