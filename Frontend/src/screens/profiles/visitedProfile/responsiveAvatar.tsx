import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Text } from '@mantine/core';
import { RiUserFollowLine } from 'react-icons/ri';

type ResponsiveAvatarProps = {
    src: string;
    alt?: string;
    recipeCount: number | string
};

const ResponsiveAvatar: React.FC<ResponsiveAvatarProps> = ({ src, alt, recipeCount }) => {
    const small = useMediaQuery('(max-width: 450px)');
    const medium = useMediaQuery('(min-width: 451px) and (max-width: 950px)');
    const large = useMediaQuery('(min-width: 951px)');

    const imageSize = small ? 100 : medium ? 150 : large ? 200 : 100;
    const ButtonSize = small ? '100%' : medium ? '60%' : large ? '50%' : '100%';


    return (
        <>
            <div style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>
            <Text size='sm' c="dimmed">Recipes Uploaded: {recipeCount}</Text>
            <Button
                mt={15}
                w={ButtonSize}
                variant="filled"
                color="teal"
                radius="lg"
                rightSection={<RiUserFollowLine size={14} />}
            >
                follow
            </Button>
        </>
    );
};

export default ResponsiveAvatar;