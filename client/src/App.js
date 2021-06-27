import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import DataProvider from "./redux/store.js";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import EditUserDetailsPage from "./pages/EditUserDetailsPage";
import LogoutPage from "./pages/LogoutPage";

function App() {
    const auth = useSelector((state) => state.auth);
    console.log(auth);
    const { isLogged, isAdmin } = auth;

    return (
        <DataProvider>
            <Router>
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/register" exact component={RegisterPage} />
                    <Route
                        path="/userdashboard"
                        exact
                        component={isLogged ? UserDashboardPage : NotFound}
                    />
                    
                    <Route
                        path="/edit_user/:id"
                        component={isAdmin ? EditUserDetailsPage : NotFound}
                        exact
                    />
                    <Route path="/logout" exact component={LogoutPage} />
                </Switch>
            </Router>
        </DataProvider>
    );
}

export default App;
