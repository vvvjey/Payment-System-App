interface UserState {
    user: string | null;
    isLoggedIn: boolean;
  }
  
  interface Action {
    type: string;
    payload?: any;
  }
  
  const initialState: UserState = {
    user: null,
    isLoggedIn: false,
  };
  
  export const userReducer = (state: UserState = initialState, action: Action): UserState => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
          isLoggedIn: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          isLoggedIn: false,
        };
      default:
        return state;
    }
  };
  