import { useParams } from 'react-router-dom';

interface RouteParams {
    id: string;
}

function RecipeDetail() {
    const { id } = useParams<RouteParams>(); // Explicitly type the useParams hook

    // You can now use the id to fetch post data or perform other logic
    // For example, fetching post data from a server:
    // useEffect(() => {
    //   fetchPostData(id);
    // }, [id]);

    return (
        <div>
            <h1>Post Detail</h1>
            <p>Post ID: {id}</p>
            {/* Render the post details here */}
        </div>
    );
};

export default RecipeDetail;