import { useParams } from "react-router-dom";
import { useLazyDiscoverRecipesQuery } from "../../selectors/recipes";
import { useEffect, useState } from 'react';
import { Button, Container, Group, Pagination, rem, Select, Stack, Text } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';
import Loading from '../../components/shared/loader';
import CardLayout from "../../components/shared/cardLayout";

interface RouteParams {
    cuisine: string;
}

function Discover() {
    const [triggerSearch, { data, isError, isLoading }] = useLazyDiscoverRecipesQuery();

    const { cuisine } = useParams<RouteParams>();
    const [searchData, setData] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Update effect to trigger search whenever cuisine or page changes
    useEffect(() => {
        if (cuisine) {
            triggerSearch(buildQuery(cuisine, searchValue));
        }
    }, [cuisine, searchValue]);

    const handleSearchChange = (query: string) => {
        setSearchValue(query);

        if (query.length > 0) {
            const newOptions = [...new Set([query, ...searchData])];
            setData(newOptions);
        } else {
            setData([]);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.currentTarget.value.trim().length > 0) {
            const term = event.currentTarget.value.trim();
            setCurrentPage(1); // Reset to the first page when searching
            triggerSearch(buildQuery(cuisine, term));
        }
    };

    const buildQuery = (cuisine: string, searchTerm: string) => {
        return {
            cuisine: cuisine || '',
            searchQuery: searchTerm || '',
        };
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading recipes</p>;

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data?.data?.slice(startIndex, endIndex); // Get the recipes for the current page

    return (
        <Container>
            <Stack>
                <Text fw={800} pl={10}>Discover</Text>
                <div>
                    <Select
                        placeholder="Start typing..."
                        data={searchData.slice(0, 1)}
                        searchable
                        searchValue={searchValue}
                        onSearchChange={handleSearchChange}
                        rightSection={
                            <Button size="xs" variant="subtle" c="teal" style={{ padding: '0.3rem' }}>
                                <FaSearch style={{ width: rem(16), height: rem(16) }} />
                            </Button>
                        }
                        rightSectionWidth={rem(40)}
                        styles={{
                            input: { paddingRight: rem(50) },
                        }}
                        onKeyDown={handleKeyDown}
                        pb={10}
                    />

                    {paginatedData?.length > 0 ? (
                        <CardLayout recipes={{ data: paginatedData }} title={`${searchValue} Results`} />
                    ) : (
                        <Group justify="center" m={15}>
                            <Text fw={600} mb={220}>No recipes found...</Text>
                        </Group>
                    )}
                </div>

                <Group justify="center" p={10}>
                    <div style={{ marginTop: 'auto' }}>
                        {data?.data?.length > itemsPerPage && (
                            <Pagination
                                total={Math.ceil(data.data.length / itemsPerPage)}
                                value={currentPage}
                                onChange={handlePageChange}
                                color="teal"
                                radius="xl"
                            />
                        )}
                    </div>
                </Group>
            </Stack>
        </Container>
    );
}

export default Discover;