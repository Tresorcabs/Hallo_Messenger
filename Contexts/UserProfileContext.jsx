import React, { createContext, useState } from "react";

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
    const [userProfileData, setUserProfileData] = useState(null);

    const updateUserProfileData = (newUserData) => {
        setUserProfileData(newUserData)
    };

    return (
        <UserProfileContext.Provider value={{ userProfileData, updateUserProfileData }} >
            {children}
        </UserProfileContext.Provider>
    );
}