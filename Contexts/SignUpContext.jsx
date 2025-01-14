import React, { createContext, useState } from "react";

export const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
    const [signUpData, setSignUpData] = useState({});

    const updateSignUpData = (newUserData) => {
        setSignUpData((prevUserData) => ({...prevUserData, ...newUserData}))
    };

    return(
    <SignUpContext.Provider value={{signUpData, updateSignUpData}} >
        {children}
    </SignUpContext.Provider>
    );
};