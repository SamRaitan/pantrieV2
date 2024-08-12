import { Button, Container, Divider, Grid, Group, Stack, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useFetchUserProfileQuery } from '../../../selectors/profiles';
import ResponsiveAvatar from './responsiveAvatar';
import CardLayout from '../../../components/shared/cardLayout';


type RouteParams = {
    username: string;
}

function VisitedProfile() {
    const { username } = useParams<RouteParams>();
    console.log(username);

    const { data, isLoading, isError } = useFetchUserProfileQuery(username);
    console.log(data);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading profile.</p>;

    return (
        <Container>
            <Stack>
                <Grid m={20} mt={30}>
                    <Grid.Col span={4}>
                        <Stack align="center" justify="center">
                            <ResponsiveAvatar src={data?.data.User.avatar} recipeCount={data?.data.User.RecipeCount} />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Stack>
                            <div>
                                <Text size='xl' tt="capitalize" fw={500}>{data?.data.User.fullName}</Text>
                                <Text c="dimmed" fs="italic">{data?.data.User.username}</Text>
                                <Text>{data?.data.User.bio}</Text>
                            </div>
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Divider my="md" />

                <CardLayout isLoading={isLoading} isError={isError} recipes={{ data: data?.data.Recipes }} title={`${data?.data.User.fullName}'s Recipes`} />
            </Stack>
        </Container>
    );
}

export default VisitedProfile;