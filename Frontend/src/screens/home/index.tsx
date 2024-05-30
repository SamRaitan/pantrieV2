import { Center, Container, Group, SimpleGrid, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import MainCard from '../../components/shared/card';
import FoodCuisines from '../../components/foodTypeCarusel';

function Home() {
    const isPhoneOrSmaller = useMediaQuery('(max-width: 820px)'); // Adjust the width according to your breakpoint

    return (
        <>
            <Container size={'lg'}>
                <Text fw={800}>Cuisines</Text>
                <Group justify="center">
                    <FoodCuisines />
                </Group>
                <Text fw={800} m={10} p={10}>For You</Text>
                <Group justify="center" m={10}>
                    {isPhoneOrSmaller ? (
                        <Center>
                            <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}>
                                <MainCard width={170} />
                                <MainCard width={170} />
                                <MainCard width={170} />
                                <MainCard width={170} />
                                <MainCard width={170} />
                            </SimpleGrid>
                        </Center>
                    ) : (
                        <>
                            <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}>
                                <MainCard width={260} />
                                <MainCard width={260} />
                                <MainCard width={260} />
                                <MainCard width={260} />
                                <MainCard width={260} />
                                <MainCard width={260} />
                                <MainCard width={260} />
                            </SimpleGrid>
                        </>
                    )
                    }
                </Group>
            </Container>
        </>
    );
}

export default Home;
