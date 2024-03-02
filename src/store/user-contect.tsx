import React from "react";


const UserContext = React.createContext({
    user : {
        email : "",
        password: "",
    },
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

export default UserContext;