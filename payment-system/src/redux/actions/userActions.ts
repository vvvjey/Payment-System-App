// src/redux/actions/userActions.ts
import { login } from "../../services/apiService";
export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";
import { Dispatch } from 'redux';
import { AppThunk } from "../store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenNavigationProp } from "../../navigation/type";
export const LOGIN = "LOGIN";

export const loginAction = (phoneNumber: string, password: string,navigation: ScreenNavigationProp):AppThunk => async (dispatch: Dispatch) => {
    try {
      // Call the API (or perform your logic)
      const data = {
        phoneNumber,password
      }
      const response = await login(data);
      if(response.data){
        const token = response.data.accessToken.accessToken;
        await AsyncStorage.setItem('jwtToken', JSON.stringify(token));
        navigation.navigate("Home")
      }

      dispatch({
        type: 'LOGIN',
        payload: response.data, 
      });
    } catch (error) {
      console.log('dispatch err',error)
      dispatch({
        type: 'LOGIN',
        payload: null,
      });
    }
  };
  
export const setUser = (user: string) => (
    { type: SET_USER, payload: user }
);
export const logout = () => ({ type: LOGOUT });
