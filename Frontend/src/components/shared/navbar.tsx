import { useDisclosure } from '@mantine/hooks';
import { Drawer, Burger, Group, Image } from '@mantine/core';

function NavBar() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Group>
                <Image
                    radius="md"
                    h={50}
                    ms={20}
                    w="auto"
                    fit="contain"
                    src="https://www.logolynx.com/images/logolynx/a0/a0d7b78e1c965d77e4187b4006ce0d12.jpeg"
                />
                <Burger p={5} m={5} opened={opened} onClick={open} aria-label="Toggle navigation" />
            </Group>

            <Drawer opened={opened} onClose={close} title="Authentication">
                {/* Drawer content */}
            </Drawer>
        </>
    );
}

export default NavBar