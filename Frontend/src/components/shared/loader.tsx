import { Loader, Stack } from '@mantine/core';

function Loading() {
    return (
        <Stack
            align="center"
            justify="center"
            style={{ height: '90vh' }}
        >
            <Loader color="teal" size="xl" type="bars" />
        </Stack>
    );
}

export default Loading;