import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../screens/signup/index';
import SignIn from '../screens/signin/index';
import Discover from '../screens/discover/index'
import NavBar from '../components/shared/navbar';
import Home from '../screens/home';
import Create from '../screens/create/index';
import ProtectedRoute from './protectedRoute';
import RecipeDetail from '../screens/recipeDetails';
import VisitedProfile from '../screens/profiles/visitedProfile';

const AppRouter = () => {
    return (
        <Router>
            <div className="router">
                <NavBar />
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/signup">
                            <SignUp />
                        </Route>
                        <Route exact path="/signin">
                            <SignIn />
                        </Route>
                        <Route exact path="/posts/:id">
                            <RecipeDetail />
                        </Route>
                        <Route exact path="/discover">
                            <Discover />
                        </Route>
                        <Route exact path="/userProfile/:username">
                            <VisitedProfile />
                        </Route>
                        <ProtectedRoute exact path="/create-recipe-post" component={Create} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default AppRouter;
