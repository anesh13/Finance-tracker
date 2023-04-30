import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { backendUrl } from "../config";
import axios from "axios";

//create new context object for authentication
export const AuthContext = createContext();


// create the component that provides the shared state to its children components via the Context API
export const AuthProvider = ({ children }) => {
    //state that will be shared 
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('token') || null);


    const login = async (token) => {
        localStorage.setItem("token", token);
        setCurrentUser(token);

        // const response = await axios.post(`${backendUrl}/user/login`, {
        //     username,
        //     password
        // });

        // console.log(response.data.token);
        // setCurrentUser(response.data.token)
        console.log("context: " + currentUser);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
    };

    // useEffect(() => {
    //     // const token = localStorage.getItem('token');
    //     // // console.log('Token:', token);
    //     // if (token) {
    //     //     // setLoading(true);
    //     //     setCurrentUser(token);
    //     // }
    //     // else {
    //     //     // setLoading(false); // Set loading to false if there is no token
    //     // }
    //     // setCurrentUser(token);
    //     // setLoading(false); // Set loading to false after checking the token

    //     // console.log(currentUser);

    //     localStorage.setItem('token', currentUser);
    //     // localStorage.setItem('token', JSON.stringify(currentUser));

    // }, [currentUser]);

    // Wrap the AuthProvider children with the context provider 
    // and pass the state as value to all its descendants in the component tree
    return <AuthContext.Provider value={{ currentUser, login, logout }}>
        {children}
    </AuthContext.Provider>;
};
