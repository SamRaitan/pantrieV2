import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Text } from '@mantine/core';
import { RiUserFollowFill, RiUserFollowLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useFollowAUserMutation } from '../../../selectors/profiles';

type ResponsiveAvatarProps = {
    src: string;
    alt?: string;
    data: User;
    refetch: any;
};

const ResponsiveAvatar: React.FC<ResponsiveAvatarProps> = ({ src, alt, data, refetch }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    const small = useMediaQuery('(max-width: 450px)');
    const medium = useMediaQuery('(min-width: 451px) and (max-width: 950px)');
    const large = useMediaQuery('(min-width: 951px)');

    const imageSize = small ? 100 : medium ? 150 : large ? 200 : 100;
    const ButtonSize = small ? '100%' : medium ? '60%' : large ? '50%' : '100%';

    const [followUser] = useFollowAUserMutation();
    const [follow, setFollower] = useState<boolean>(false);

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
            <Text mt={10} size="sm" color="dimmed">
                Recipes Uploaded: {data.RecipeCount}
            </Text>
            {user && (
                <Button
                    mt={15}
                    w={ButtonSize}
                    variant="filled"
                    color="teal"
                    radius="lg"
                    size="md"
                    onClick={() => handleFollowClick(data.followers.includes(user._id) ? 'unfollow' : 'follow')}
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
            )}
        </div>
    );
};

export default ResponsiveAvatar;