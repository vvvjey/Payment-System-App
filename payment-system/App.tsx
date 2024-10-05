import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { userReducer } from './src/reducers/userReducer';
import AppNavigator from './src/navigators/AppNavigator';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
