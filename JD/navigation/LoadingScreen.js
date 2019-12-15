import React, { Component } from "react";
import { Text, View, TextInput, ActivityIndicator } from "react-native";
import { AsyncStorage } from "react-native";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedInOrLogOut();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#586776",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator size="large" color="#019031" />
      </View>
    );
  }

  async checkIfLoggedInOrLogOut() {
    // AsyncStorage.removeItem("user_x_token");
    const user_x_token = JSON.parse(await AsyncStorage.getItem("user_x_token"));
    if (user_x_token != null) {
      //navigate to home screen
      this.goToHome(user_x_token);
    } else {
      //navigate to login screen
      this.goToAuth();
    }
  }

  goToHome(user_x_token) {
    this.props.navigation.navigate("MainTabNavigator", { user_x_token });
  }

  goToAuth() {
    this.props.navigation.navigate("LoginScreen");
    // this.props.navigation.navigate("PinScreen");
  }
}

export default LoadingScreen;
