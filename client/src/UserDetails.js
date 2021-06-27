import React from "react";
const UserDetails = () => {
    const userName = "Someone";
    const email = "someone@gmail.com";
    return (
        <div className="user-details" id="userinfo">
            <p id="userinfo">
                UserName {userName}
                <br />
                Email Address {email}
            </p>
            <form>
                <button className="btn logout">Logout</button>
            </form>
        </div>
    );
};

export default UserDetails;
