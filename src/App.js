import React from "react";
import ReactDOM from "react-dom";
import UserDetails from "./UserDetails";

const App = () => {
    return (
        <div>
            <UserDetails />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
