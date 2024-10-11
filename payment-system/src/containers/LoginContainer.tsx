import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../theme/styles";

const LoginContainer: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Dispatch login action
    dispatch({ type: "LOGIN_SUCCESS", payload: { username } });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginContainer;
