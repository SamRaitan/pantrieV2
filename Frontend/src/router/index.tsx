import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../screens/signup/index';
import SignIn from '../screens/signin/index';
import NavBar from '../components/shared/navbar';
import Home from '../screens/home';
import Create from '../screens/create/index';
import ProtectedRoute from './protectedRoute';

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
                        <ProtectedRoute exact path="/create-recipe-post" component={Create} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default AppRouter;
