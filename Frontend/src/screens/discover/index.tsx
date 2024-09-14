import { useParams } from "react-router-dom";
import { useLazyDiscoverRecipesQuery } from "../../selectors/recipes";
import { useEffect, useState } from 'react';
import { Button, rem, Select } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';
import Loading from '../../components/shared/loader';

interface RouteParams {
    cuisine: string;
}

function Discover() {
    const [triggerSearch, { data, isError, isLoading }] = useLazyDiscoverRecipesQuery();

    const { cuisine } = useParams<RouteParams>();
    const [searchData, setData] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState('');

    // Update effect to trigger search whenever cuisine changes
    useEffect(() => {
        if (cuisine) {
            triggerSearch(buildQuery(cuisine, ''));
        }
    }, [cuisine]); // Listen for changes in cuisine

    // Handle search input change
    const handleSearchChange = (query: string) => {
        setSearchValue(query);

        if (query.length > 0) {
            // Ensure the query is added to the data list dynamically
            const newOptions = [...new Set([query, ...searchData])]; // Add query to options, ensuring uniqueness
            setData(newOptions);
        } else {
            setData([]);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.currentTarget.value.trim().length > 0) {
            const term = event.currentTarget.value.trim();
            console.log('Enter key pressed, searching for:', term);
            triggerSearch(buildQuery(cuisine, term)); // Trigger the search manually
        }
    };

    // Fixed buildQuery logic to check for both undefined and non-empty values correctly
    const buildQuery = (cuisine: string, searchTerm: string) => {
        let query = { cuisine: '', searchQuery: '', from: 0, to: 30 };

        if (cuisine && cuisine !== '') {
            query.cuisine = cuisine;
        }
        if (searchTerm && searchTerm !== '') {
            query.searchQuery = searchTerm;
        }
        return query;
    };

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading recipes</p>;

    return (
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
                rightSectionWidth={rem(40)} // Adjust to fit the button
                styles={{
                    input: { paddingRight: rem(50) }, // Adjust the padding to make space for the button
                }}
                onKeyDown={handleKeyDown} // Listen for the 'Enter' key press
            />
            {/* Render recipes */}
            {data?.data?.length > 0 ? (
                data.data.map((recipe: any) => (
                    <div key={recipe._id}>
                        <h2>{recipe.title}</h2>
                    </div>
                ))
            ) : (
                <p>No recipes found</p>
            )}
        </div>
    );
}

export default Discover;