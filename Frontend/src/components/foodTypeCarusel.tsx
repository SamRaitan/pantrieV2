import { Carousel } from '@mantine/carousel';
import { Anchor, Avatar, Stack, Text } from '@mantine/core';
import Flag from 'react-world-flags';
import { cuisinesToFlags } from '../utils/cuisinesToIcons';


function FoodCuisines() {

    return (
        <div style={{ width: '100%', margin: '7px', padding: '8px' }}>

            <Carousel align="start" slideSize="5%" controlSize={1} loop withControls={false}>
                {cuisinesToFlags.map((cuisine, index) => (
                    <Carousel.Slide key={index} mah={70}>
                        <Stack align="center" justify="center" gap="xs" mx={10}>
                            <Anchor href={`/discover/${cuisine.name}`}>
                                <Avatar color="teal" radius="xl">
                                    <Flag code={cuisine.code} style={{ width: 30, height: 20 }} />
                                </Avatar>
                            </Anchor>
                            <Text>{cuisine.name}</Text>
                        </Stack>
                    </Carousel.Slide>
                ))}
            </Carousel>

        </div>
    );
}

export default FoodCuisines;
