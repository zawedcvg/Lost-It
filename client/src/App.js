import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import EditUserDetailsPage from "./pages/EditUserDetailsPage";
import LogoutPage from "./pages/LogoutPage";
import ListingsPage from "./pages/ListingsPage";
import EmailHasBeenSentForActivationPage from "./pages/EmailHasBeenSentForActivationPage";
import EmailHasBeenSentForResetPage from "./pages/EmailHasBeenSentForResetPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetSuccessfulPage from "./pages/ResetSuccessfulPage";
import ReportItem from "./pages/ReportItem";
import PostInfoPage from "./pages/PostInfoPage";
import MyPosts from "./pages/MyPosts";
import SavedPosts from "./pages/SavedPosts";
import UpdatePost from "./pages/UpdatePost";
import ActivationSucessfulPage from "./pages/ActivationSuccessfulPage";

function App() {
    let isLogged = false;

    if (localStorage.getItem("firstLogin")) {
        isLogged = true;
    }

    return (
            <Router>
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/register" exact component={RegisterPage} />
                    <Route
                        path="/userdashboard"
                        exact
                        component={isLogged ? UserDashboardPage : LoginPage}
                    />

                    <Route path="/listings" exact component={isLogged ? ListingsPage : LoginPage} />

                    <Route path="/reportitem" exact component={isLogged ? ReportItem : LoginPage} />

                    <Route
                        path="/emailhasbeensentforactivation"
                        exact
                        component={EmailHasBeenSentForActivationPage}
                    />

                    <Route path="/user/activation/:activation_token" 
                    exact 
                    component={ActivationSucessfulPage} />

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
                        path="/resetsuccessful"
                        exact
                        component={ResetSuccessfulPage}
                    />

                    <Route 
                        path="/updatepost/:id"
                        exact
                        component={UpdatePost}
                    />

                    <Route
                        path="/edituserdetails"
                        component={isLogged ? EditUserDetailsPage : LoginPage}
                        exact
                    />

                    <Route path="/savedposts" exact component={SavedPosts} />

                    <Route path="/myposts" exact component={MyPosts} />

                    <Route path="/post/:id" exact component={PostInfoPage} />

                    <Route path="/logout" exact component={LogoutPage} />
                </Switch>
            </Router>
    );
}

export default App;
