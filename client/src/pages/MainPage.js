import MetaTags from "react-meta-tags";
import { ReactComponent as Logo } from "../svg-assets/google.svg";
import MainPageCSS from "../styles/MainPage.module.css";
import { useHistory } from "react-router-dom";

const MainPage = () => {
    // const logostyle = { width: "25px", height: "25px", textAlign: "center" };

    let history = useHistory();

    const handleLoginClick = () => {
        history.push("/login");
    };

    const handleSignUpClick = () => {
        history.push("/register");
    };

    return (
        <div className="MainPage">
            <MetaTags>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
                    initial-scale = 1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Document</title>
            </MetaTags>

            <div className={MainPageCSS.scroll}>
                <section
                    className={`${MainPageCSS.first} ${MainPageCSS.block}`}
                >
                    <h1 className={MainPageCSS.front_text}>Lost It</h1>
                </section>
                <section
                    id="middlepage"
                    className={`${MainPageCSS.block} ${MainPageCSS.middle}`}
                >
                    <section className={MainPageCSS.slogan}>
                        <h1
                            className={`${MainPageCSS.first} ${MainPageCSS.line}`}
                        >
                            Can't find something?
                        </h1>
                        <h1
                            className={`${MainPageCSS.second} ${MainPageCSS.line}`}
                        >
                            We're here to help!
                        </h1>
                    </section>
                </section>
                <section
                    id="login_options"
                    className={`${MainPageCSS.block} ${MainPageCSS.end}`}
                >
                    <div className={MainPageCSS.option_body}>
                        <h1 className={MainPageCSS.login_text}>
                            Lost-It - a digitized lost & found, right with you
                        </h1>
                        <section className={MainPageCSS.button_list}>
                            <form> 
                            <button
                                onClick={handleSignUpClick}
                                className={MainPageCSS.btn_main}
                            >
                                Sign Me Up!
                            </button>
                            </form>
                            <form>
                            <button
                                onClick={handleLoginClick}
                                className={MainPageCSS.btn_main}
                            >
                                Log In.
                            </button>
                            </form>

                            {/* <form>
                                <button
                                    formAction="http://stackoverflow.com"
                                    className={MainPageCSS.btn_main}
                                >
                                    <Logo style={logostyle} />
                                    &nbsp;Connect to Google
                                </button>
                            </form> */}
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MainPage;
