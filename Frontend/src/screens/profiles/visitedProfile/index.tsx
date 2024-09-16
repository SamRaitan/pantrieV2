import { Badge, Container, Divider, Grid, Group, Stack, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useFetchUserProfileQuery } from '../../../selectors/profiles';
import ResponsiveAvatar from './responsiveAvatar';
import CardLayout from '../../../components/shared/cardLayout';
import Loading from '../../../components/shared/loader';

type RouteParams = {
    username: string;
};

function VisitedProfile() {
    const { username } = useParams<RouteParams>();
    if (username === 'undefined') {
        console.log(username);

        window.location.href = '/signin';
    }
    const { data, isLoading, isError, refetch } = useFetchUserProfileQuery(username);

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading profile.</p>;

    return (
        <Container>
            <Stack>
                {/* Profile Info Section */}
                <Grid>
                    <Grid.Col span={12} m={4}>
                        <Stack align="center" justify="center">
                            <ResponsiveAvatar
                                src={data?.data.User.avatar}
                                alt={data?.data.User.fullName}
                                data={data?.data.User}
                                refetch={refetch}
                            />
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={12} m={8}>
                        <Stack gap="sm">
                            <Group justify="space-between">
                                <Text size="xl" tt="capitalize" fw={600}>
                                    {data?.data.User.fullName}
                                </Text>
                                <Badge color="teal" variant="filled">
                                    Followers: {data?.data.User.followersCount}
                                </Badge>
                            </Group>
                            <Text size="sm" c="dimmed" fs="italic">
                                {data?.data.User.username}
                            </Text>
                            <Text size="md">{data?.data.User.bio || 'No bio available.'}</Text>
                        </Stack>
                    </Grid.Col>
                </Grid>

                {/* Divider */}
                <Divider my="lg" />

                {/* User's Recipes */}
                <CardLayout
                    recipes={{ data: data!.data.Recipes }}
                    title={`${data?.data.User.fullName}'s Recipes`}
                />
            </Stack>
        </Container>
    );
}

export default VisitedProfile;