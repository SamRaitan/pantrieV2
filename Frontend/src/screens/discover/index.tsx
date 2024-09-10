import { useParams } from "react-router-dom";
import { useDiscoverRecipesQuery } from "../../selectors/recipes";

interface RouteParams {
    cuisine: string;
}

type noni = {
    text: string | undefined
}

function Discover() {
    let query = { cuisine: '', from: 0, to: 30 }
    const { cuisine } = useParams<RouteParams>();
    if (cuisine != undefined || cuisine != '') {
        query.cuisine = cuisine
    }
    const { data, isError, isLoading } = useDiscoverRecipesQuery(query);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching recipes</div>;

    return (
        <div>
            {data?.data.map((recipe: any) => (
                <div key={recipe._id}>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Discover;