// src/redux/actions/userActions.ts
import { login } from "../../services/apiService";
export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";
import { Dispatch } from 'redux';

export const LOGIN = "LOGIN";
export const loginAction = (phoneNumber: string, password: string) => async (dispatch: Dispatch) => {
    try {
      // Call the API (or perform your logic)
      const data = {
        phoneNumber,password
      }
      const response = await login(data);
      
      // Dispatch success action

      dispatch({
        type: 'LOGIN',
        payload: response.data.user, // or whatever data you need
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
