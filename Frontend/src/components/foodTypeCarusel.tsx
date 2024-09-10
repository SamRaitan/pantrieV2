import { Carousel } from '@mantine/carousel';
import { cuisines } from '../utils/cuisines';
import { Anchor, Avatar, Stack, Text } from '@mantine/core';


function FoodCuisines() {

    return (
        <div style={{ width: '100%', margin: '7px', padding: '8px' }}>

            <Carousel align="start" slideSize="5%" controlSize={1} loop withControls={false}>
                {cuisines.map((cuisine, index) => (
                    <Carousel.Slide key={index} mah={70}>
                        <Stack align="center" justify="center" gap="xs" mx={10}>
                            <Anchor href={`/discover/${cuisine}`}>
                                <Avatar color="teal" radius="xl">
                                    {cuisine}
                                </Avatar>
                            </Anchor>
                            <Text>{cuisine}</Text>
                        </Stack>
                    </Carousel.Slide>
                ))}
            </Carousel>

        </div>
    );
}

export default FoodCuisines;
