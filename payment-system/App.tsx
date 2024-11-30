import React from "react";
import { AppNavigation } from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import 'react-native-get-random-values'
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
  
}
