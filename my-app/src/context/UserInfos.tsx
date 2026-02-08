"use client";

import { createContext, useContext, useState } from "react";


type UserInfosContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

export const UserInfosContext = createContext<UserInfosContextType | null>(null);

export const UserInfosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserInfosContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserInfosContext.Provider>
    )
}

export const useUserInfos = () => {
    const context = useContext(UserInfosContext);
    if (!context) {
        throw new Error("useUserInfos must be used within a UserInfosProvider");
    }
    return context;
}