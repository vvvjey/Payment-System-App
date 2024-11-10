// src/redux/reducers/userReducer.ts
import { SET_USER, LOGOUT,LOGIN } from "../actions/userActions";

interface UserState {
  user: string | null;
}

const initialState: UserState = { user: null };

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case LOGOUT:
      return { user: null };
    case LOGIN:
      console.log("success",action.payload)
      return {
        user: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;
