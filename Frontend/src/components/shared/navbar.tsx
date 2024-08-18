import { useDisclosure } from '@mantine/hooks';
import { Drawer, Burger, Group, Image, Text, Stack, Anchor, Space } from '@mantine/core';
import getTimeOfDay from '../../utils/getTime';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FaSignInAlt } from "react-icons/fa";
import { TiInfo } from "react-icons/ti";
import { IoSettingsSharp } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { Menu, Button, rem } from '@mantine/core';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
} from '@tabler/icons-react';





function NavBar() {
    const [opened, { open, close }] = useDisclosure(false);
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <>
            <div className='navbar'>
                <Group>
                    <Image
                        onClick={() => { window.location.href = '/'; }}
                        radius="md"
                        h={50}
                        ms={20}
                        w="auto"
                        fit="contain"
                        src="https://www.logolynx.com/images/logolynx/a0/a0d7b78e1c965d77e4187b4006ce0d12.jpeg"
                    />
                    <Burger p={5} m={5} opened={opened} onClick={open} aria-label="Toggle navigation" />
                </Group>

                <Drawer opened={opened} onClose={close} size={'xs'} zIndex={300}>


                    <Menu shadow="md" width={200}>

                        <Menu.Label>Application</Menu.Label>
                        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                            Settings
                        </Menu.Item>
                        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                            Messages
                        </Menu.Item>
                        <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
                            Gallery
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
                            rightSection={
                                <Text size="xs" c="dimmed">
                                    ⌘K
                                </Text>
                            }
                        >
                            Search
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Item
                            leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
                        >
                            Transfer my data
                        </Menu.Item>
                        <Menu.Item
                            color="red"
                            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                        >
                            Delete my account
                        </Menu.Item>

                    </Menu>


                    {/* <Stack align="center" justify="center" gap="lg">

                        <Text fw={900} size={'xl'} c='teal' tt="capitalize">{getTimeOfDay()} {user?.fullName}</Text>
                        <Space h="xs" />
                        <Anchor href="/" underline="never" c='black'><Group><FaHome style={{ fontSize: '24px' }} /> <Text size='lg' fw={550}>HOME</Text></Group></Anchor>
                        <Anchor href="/create-recipe-post" underline="never" c='black'><Group><IoIosCreate style={{ fontSize: '24px' }} /><Text size='lg' fw={550}>CREATE</Text></Group></Anchor>
                        <Anchor href="/signin" underline="never" c='black'><Group><FaSignInAlt style={{ fontSize: '24px' }} /><Text size='lg' fw={550}>SIGN-IN</Text></Group></Anchor>
                        <Anchor href={`/userProfile/${user?.username}`} underline="never" c='black'><Group><BsPersonCircle style={{ fontSize: '24px' }} /><Text size='lg' fw={550}>PROFILE</Text></Group></Anchor>
                        <Anchor href="/about" underline="never" c='black'><Group><TiInfo style={{ fontSize: '24px' }} /><Text size='lg' fw={550}>ABOUT</Text></Group></Anchor>
                        <Space h="md" />
                        <Anchor href="/" underline="never" c='black'><Group><IoSettingsSharp style={{ fontSize: '24px' }} /><Text size='lg' fw={550}>SETTINGS</Text></Group></Anchor>

                    </Stack> */}

                </Drawer>
            </div>
        </>
    );
}

export default NavBar