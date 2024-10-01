import React, { useEffect, useState } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Button, Text, Menu, Modal } from '@mantine/core';
import { RiUserFollowFill, RiUserFollowLine } from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store/store';
import { useFollowAUserMutation } from '../../../selectors/profiles';
import { useLogoutMutation } from '../../../selectors/signIn';
import { clearUser } from '../../../slice/authSlice';

type ResponsiveAvatarProps = {
    src: string;
    alt?: string;
    data: User;
    refetch: any;
};

const ResponsiveAvatar: React.FC<ResponsiveAvatarProps> = ({ src, alt, data, refetch }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const [triggerLogout, { isLoading }] = useLogoutMutation();

    const small = useMediaQuery('(max-width: 450px)');
    const medium = useMediaQuery('(min-width: 451px) and (max-width: 950px)');
    const large = useMediaQuery('(min-width: 951px)');

    const imageSize = small ? 100 : medium ? 150 : large ? 200 : 100;
    const ButtonSize = small ? '100%' : medium ? '60%' : large ? '50%' : '100%';

    const [followUser] = useFollowAUserMutation();
    const [follow, setFollower] = useState<boolean>(false);

    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        if (user && data) {
            setFollower(data.followers.includes(user._id));
        }
    }, [user, data]);

    const handleFollowClick = async (action: string) => {
        try {
            await followUser({ vUserId: data._id, action, userId: user?._id }).unwrap();
            refetch();
            setFollower(action === 'follow' ? true : false);
        } catch (error) {
            console.error('Error following/unfollowing the user:', error);
            setFollower(action === 'follow' ? false : true);
        }
    };

    const logout = async () => {
        try {
            await triggerLogout().unwrap();
            dispatch(clearUser());
            console.log("User successfully logged out");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <Text mt={10} size="sm" c="dimmed">
                Recipes Uploaded: {data.RecipeCount}
            </Text>
            {user && (
                <>
                    <Button
                        mt={15}
                        w={ButtonSize}
                        variant="filled"
                        color="teal"
                        radius="lg"
                        size="md"
                        onClick={() =>
                            handleFollowClick(data.followers.includes(user._id) ? 'unfollow' : 'follow')
                        }
                    >
                        {follow ? (
                            <Text fw={500}>
                                Unfollow <RiUserFollowLine style={{ fontSize: '20px' }} />
                            </Text>
                        ) : (
                            <Text fw={500}>
                                Follow <RiUserFollowFill style={{ fontSize: '20px' }} />
                            </Text>
                        )}
                    </Button>

                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Button size="xs" variant="subtle" c="teal" color="teal" radius="xl">
                                •••
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item onClick={open}>Edit Profile</Menu.Item>
                            <Menu.Item color="red" onClick={logout}>
                                {isLoading ? 'Logging out...' : 'Logout'}
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {/* Edit Profile Modal */}
                    <Modal opened={opened} onClose={close} title="Edit Profile">
                        <p>noni</p>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default ResponsiveAvatar;

