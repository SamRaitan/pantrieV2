import { useFetchRecipesQuery } from '../../selectors/recipes';
import Loading from '../../components/shared/loader';

function Home() {
    const { data: recipes, isLoading, isError } = useFetchRecipesQuery();

    if (isLoading) return <Loading />;
    if (isError) return <p>Error loading recipe.</p>;

    return (
        <>
            {/* <Container >
        
            </Container> */}


        </>
    );
}

export default Home;
