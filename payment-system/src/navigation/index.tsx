import React from "react";
import useAuthStore from "../stores/slices/AuthSlice"
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { NavigationContainer } from "@react-navigation/native";

export const AppNavigation = () => {
    const isLogin = useAuthStore((state: any) => state.isAuthenticated);

    return (
        <NavigationContainer>
            {isLogin ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    )
}