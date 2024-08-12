import React from 'react';
import { useMediaQuery } from '@mantine/hooks';

type ResponsiveAvatarProps = {
    src: string;
    alt?: string;
};

const ResponsiveAvatar: React.FC<ResponsiveAvatarProps> = ({ src, alt }) => {
    const small = useMediaQuery('(max-width: 600px)');
    const medium = useMediaQuery('(min-width: 601px) and (max-width: 1200px)');
    const large = useMediaQuery('(min-width: 1201px)');

    const size = small ? 100 : medium ? 150 : large ? 200 : 150;

    return (
        <div style={{
            width: `${size}px`,
            height: `${size}px`,
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
    );
};

export default ResponsiveAvatar;