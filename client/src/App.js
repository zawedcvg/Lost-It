import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import DataProvider from "./redux/store.js";
// import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
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
    const auth = useSelector((state) => state.auth);
    // console.log(auth);
    const { isLogged, isAdmin } = auth;

    return (
        <DataProvider>
            <Router>
                <Switch>
                    <Route path="https://lostit.netlify.app/" exact component={MainPage} />
                    <Route path="https://lostit.netlify.app/login" exact component={LoginPage} />
                    <Route path="https://lostit.netlify.app/register" exact component={RegisterPage} />
                    <Route
                        path="https://lostit.netlify.app/userdashboard"
                        exact
                        component={isLogged ? UserDashboardPage : LoginPage}
                    />

                    <Route path="https://lostit.netlify.app/listings" exact component={isLogged ? ListingsPage : LoginPage} />

                    <Route path="https://lostit.netlify.app/reportitem" exact component={isLogged ? ReportItem : LoginPage} />

                    <Route
                        path="https://lostit.netlify.app/emailhasbeensentforactivation"
                        exact
                        component={EmailHasBeenSentForActivationPage}
                    />

                    <Route path="https://lostit.netlify.app/user/activation/:activation_token" 
                    exact 
                    component={ActivationSucessfulPage} />

                    <Route
                        path="https://lostit.netlify.app/emailhasbeensentforreset"
                        exact
                        component={EmailHasBeenSentForResetPage}
                    />
                    <Route
                        path="https://lostit.netlify.app/forgotpassword"
                        exact
                        component={ForgotPasswordPage}
                    />
                    <Route
                        path="https://lostit.netlify.app/user/reset/:id"
                        exact
                        component={ResetPasswordPage}
                    />
                    <Route
                        path="https://lostit.netlify.app/resetsuccessful"
                        exact
                        component={ResetSuccessfulPage}
                    />

                    <Route
                        path="https://lostit.netlify.app/edituserdetails"
                        component={isLogged ? EditUserDetailsPage : LoginPage}
                        exact
                    />

                    <Route path="https://lostit.netlify.app/savedposts" exact component={SavedPosts} />

                    <Route path="https://lostit.netlify.app/myposts" exact component={MyPosts} />

                    <Route path="https://lostit.netlify.app/post/:id" exact component={PostInfoPage} />

                    <Route path="https://lostit.netlify.app/updatepost/:id" exact component={UpdatePost} />

                    <Route path="https://lostit.netlify.app/logout" exact component={LogoutPage} />
                </Switch>
            </Router>
        </DataProvider>
    );
}

export default App;
