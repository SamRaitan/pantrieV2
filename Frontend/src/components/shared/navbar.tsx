import { useDisclosure } from '@mantine/hooks';
import { Drawer, Burger, Group, Image, Text, Anchor } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FaSignInAlt } from "react-icons/fa";
import { TiInfo } from "react-icons/ti";
import { IoSettingsSharp } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { Menu, rem } from '@mantine/core';


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

                <Drawer opened={opened} onClose={close} size={'xs'} title={<Text size='lg' fw={700}>Menu</Text>} zIndex={300}>
                    <Menu shadow="md" width={200}>

                        <Menu.Label>Application</Menu.Label>
                        <Menu.Item leftSection={<FaHome style={{ width: rem(18), height: rem(18) }} />}>
                            <Anchor href="/" underline="never" c='black'><Text size='md' fw={550}>Home</Text></Anchor>
                        </Menu.Item>
                        <Menu.Item leftSection={<IoIosCreate style={{ width: rem(18), height: rem(18) }} />}>
                            <Anchor href="/create-recipe-post" underline="never" c='black'><Text size='md' fw={550}>Create</Text></Anchor>
                        </Menu.Item>
                        <Menu.Item leftSection={<BsPersonCircle style={{ width: rem(18), height: rem(18) }} />}>
                            <Anchor href={`/userProfile/${user?.username}`} underline="never" c='black'><Text size='md' fw={550}>Profile</Text></Anchor>
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>General</Menu.Label>
                        <Menu.Item leftSection={<FaSignInAlt style={{ width: rem(18), height: rem(18) }} />}>
                            <Anchor href="/signin" underline="never" c='black'><Text size='md' fw={550}>Sign-in</Text></Anchor>
                        </Menu.Item>
                        <Menu.Item leftSection={<TiInfo style={{ width: rem(18), height: rem(18) }} />}>
                            <Anchor href="/about" underline="never" c='black'><Text size='md' fw={550}>About</Text></Anchor>
                        </Menu.Item>
                        <Menu.Item color='teal' leftSection={<IoSettingsSharp style={{ width: rem(18), height: rem(18) }} />}>
                            <Anchor href="https://pantrie.onrender.com/" underline="never" c='black'><Text size='md' fw={550}>Settings</Text></Anchor>
                        </Menu.Item>

                    </Menu>
                </Drawer>
            </div>
        </>
    );
}

export default NavBar