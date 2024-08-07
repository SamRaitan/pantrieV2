import { useParams } from 'react-router-dom';

interface RouteParams {
    username: string;
}

function VisitedProfile() {
    const { username } = useParams<RouteParams>(); // Explicitly type the useParams hook

    // You can now use the id to fetch post data or perform other logic
    // For example, fetching post data from a server:
    // useEffect(() => {
    //   fetchPostData(id);
    // }, [id]);

    return (
        <div>
            <h1>profile name </h1>
            <p>profile ID: {username}</p>
            {/* Render the post details here */}
        </div>
    );
};

export default VisitedProfile;