import { Card, Image, Text, Group, Anchor, Rating, Badge, Menu, Modal, Button, Grid } from '@mantine/core';
import { Recipe } from '../../types/recipe';
import { useDisclosure } from '@mantine/hooks';

type Props = {
    width: number;
    recipe: Recipe;
    zoom: boolean;
};

function MainCard({ width, recipe, zoom }: Props) {
    const [opened, { open, close }] = useDisclosure(false);


    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication">
                momo
            </Modal>

            <Card
                style={{
                    width: '320px',
                    height: '320px',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease',
                }}
                shadow="lg" padding="md" radius="lg" withBorder w={width}
                onMouseEnter={(e) => zoom ? e.currentTarget.style.transform = 'scale(1.05)' : null}
                onMouseLeave={(e) => zoom ? e.currentTarget.style.transform = 'scale(1)' : null}>
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
                    <Grid>
                        <Rating value={recipe.averageRating} readOnly size="xs" p={2} />
                        <Text size="xs" c="dimmed">({recipe.ratings.length})</Text>
                    </Grid>

                    <Button size="xs" variant="subtle" c='teal' color='teal' radius="xl" onClick={open}>
                        •••
                    </Button>

                </Group>
            </Card>
        </>
    );
}

export default MainCard;