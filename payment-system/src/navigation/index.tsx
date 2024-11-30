import React, { useEffect } from "react";
import useAuthStore from "../stores/slices/AuthSlice"
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";

export const AppNavigation = () => {
    const isLogin = useAuthStore((state: any) => state.isAuthenticated);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user); // Truyền rootState vào để lấy user từ redux
    return (
        <NavigationContainer>
            {user?.user !== null ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    )
}