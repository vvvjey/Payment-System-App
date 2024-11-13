// src/redux/actions/userActions.ts
import { login } from "../../services/apiService";
export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";
import { Dispatch } from 'redux';
import { AppThunk } from "../store";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN = "LOGIN";
export const loginAction = (phoneNumber: string, password: string):AppThunk => async (dispatch: Dispatch) => {
    try {
      // Call the API (or perform your logic)
      console.log('hello')
      const data = {
        phoneNumber,password
      }
      console.log(3);
      const response = await login(data);
      console.log(4);
      console.log('res',response.data)
      if(response.data){
        const token = response.data.accessToken.accessToken;
        console.log('token here',token);
        await AsyncStorage.setItem('jwtToken', JSON.stringify(token));

      }
      // Dispatch success action

      dispatch({
        type: 'LOGIN',
        payload: response.data, // or whatever data you need
      });
    } catch (error) {
      // Dispatch error action
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
