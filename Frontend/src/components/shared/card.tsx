import { Card, Image, Text, Group } from '@mantine/core';

// Define the Props type correctly
type Props = {
    width: number; // Use lowercase 'number' for the type
};

function MainCard({ width }: Props) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={width}>
            <Card.Section component="a" href="https://mantine.dev/">
                <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Norway Fjord Adventures</Text>
            </Group>

            <Text size="sm" c="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
            </Text>
        </Card>
    );
}

export default MainCard;
