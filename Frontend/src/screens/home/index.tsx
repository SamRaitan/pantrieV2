import { Center, Group, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import MainCard from '../../components/shared/card';
import FoodCuisines from '../../components/foodTypeCarusel';

function Home() {
    const isPhoneOrSmaller = useMediaQuery('(max-width: 820px)'); // Adjust the width according to your breakpoint

    return (
        <>

            <Group justify="center">
                <FoodCuisines />
            </Group>
            <Group justify="center" m={10}>
                {isPhoneOrSmaller ? (
                    <Center>
                        <SimpleGrid cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 4, xl: 5 }}>
                            <MainCard width={170} />
                            <MainCard width={170} />
                            <MainCard width={170} />
                            <MainCard width={170} />
                            <MainCard width={170} />
                        </SimpleGrid>
                    </Center>
                ) : (
                    <>
                        <SimpleGrid cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 4, xl: 5 }}>
                            <MainCard width={280} />
                            <MainCard width={280} />
                            <MainCard width={280} />
                            <MainCard width={280} />
                            <MainCard width={280} />
                            <MainCard width={280} />
                            <MainCard width={280} />
                        </SimpleGrid>
                    </>
                )
                }
            </Group>
        </>
    );
}

export default Home;
