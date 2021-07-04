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
// import ListingsPage from "./pages/ListingsPage";
import EmailHasBeenSentForActivationPage from "./pages/EmailHasBeenSentForActivationPage";
import EmailHasBeenSentForResetPage from "./pages/EmailHasBeenSentForResetPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetSuccessfulPage from "./pages/ResetSuccessfulPage";

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

                    {/* <Route path="/listings" exact component={ListingsPage} /> */}

                    <Route
                        path="/emailhasbeensentforactivation"
                        exact
                        component={EmailHasBeenSentForActivationPage}
                    />
                    <Route
                        path="/emailhasbeensentforreset"
                        exact
                        component={EmailHasBeenSentForResetPage}
                    />
                    <Route
                        path="/forgotpassword"
                        exact
                        component={ForgotPasswordPage}
                    />
                    <Route
                        path="/user/reset/:id"
                        exact
                        component={ResetPasswordPage}
                    />
                    <Route
                        path="resetsuccessful"
                        exact
                        component={ResetSuccessfulPage}
                    />

                    <Route
                        path="/edituserdetails"
                        component={EditUserDetailsPage}
                        exact
                    />
                    <Route path="/logout" exact component={LogoutPage} />
                </Switch>
            </Router>
        </DataProvider>
    );
}

export default App;
