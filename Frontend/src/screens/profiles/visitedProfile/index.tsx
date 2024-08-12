import { Container, Group, Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useFetchUserProfileQuery } from '../../../selectors/profiles';

type RouteParams = {
    username: string;
}

function VisitedProfile() {
    const { username } = useParams<RouteParams>();
    console.log(username);

    const { data, isLoading, isError } = useFetchUserProfileQuery(username)
    console.log(data);


    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading recipe.</p>;

    return (
        <Container>
            <Stack>
                <Group justify="space-between">

                </Group>
            </Stack>
        </Container>

    );
};

export default VisitedProfile;