import { Card, Image, Text, Group, Anchor, Rating, Badge, Modal, Button, Menu, Grid } from '@mantine/core';
import { Recipe } from '../../types/recipe';
import { useDisclosure } from '@mantine/hooks';
import EditRecipeModal from './editModal';
import { useLazyDeleteRecipeQuery } from '../../selectors/recipes';
import { notifications } from '@mantine/notifications';
import Loading from './loader';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

type Props = {
    width: number;
    recipe: Recipe;
    zoom: boolean;
};

function MainCard({ width, recipe, zoom }: Props) {
    const user = useSelector((state: RootState) => state.auth?.user);
    const [triggerDeleteRecipe, { isLoading }] = useLazyDeleteRecipeQuery();
    const [opened, { open, close }] = useDisclosure(false);

    const deleteRecipe = async () => {
        try {
            await triggerDeleteRecipe(recipe._id).unwrap();
            notifications.show({
                title: 'Recipe Deleted',
                message: `Recipe "${recipe.title}" was successfully deleted.`,
                color: 'green',
            });
        } catch (error) {
            notifications.show({
                title: 'Delete Failed',
                message: 'Failed to delete the recipe. Please try again.',
                color: 'red',
            });
        }
    };

    if (isLoading) return <Loading />;

    return (
        <>
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

                    {user?._id === recipe.uploader_id && (
                        <div>
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <Button size="xs" variant="subtle" c='teal' color='teal' radius="xl">
                                        •••
                                    </Button>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item onClick={open}>Edit Recipe</Menu.Item>
                                    <Menu.Item color="red" onClick={deleteRecipe}>
                                        {isLoading ? 'Deleting...' : 'Delete Recipe'}
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>

                            <Modal opened={opened} onClose={close} title="Edit Recipe">
                                <EditRecipeModal recipeId={recipe._id} recipe={recipe} />
                            </Modal>
                        </div>
                    )}
                </Group>
            </Card>
        </>
    );
}

export default MainCard;