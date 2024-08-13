import { Badge, Button, Container, Divider, Grid, Group, Stack, Text } from '@mantine/core';
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
    const { data, isLoading, isError, refetch } = useFetchUserProfileQuery(username);


    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading profile.</p>;

    return (
        <Container>
            <Stack>
                <Grid m={20} mt={30}>
                    <Grid.Col span={4}>
                        <Stack align="center" justify="center">
                            <ResponsiveAvatar
                                src={data?.data.User.avatar}
                                alt='noni'
                                data={data?.data.User}
                                refetch={refetch}
                            />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Stack>
                            <div>
                                <Group justify="space-between" gap="xs">
                                    <Text size='xl' tt="capitalize" fw={500}>
                                        {data?.data.User.fullName}
                                    </Text>
                                    <Text fw={500}>
                                        <Badge color="teal">Followers: {data?.data.User.followersCount}</Badge>
                                    </Text>
                                </Group>
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