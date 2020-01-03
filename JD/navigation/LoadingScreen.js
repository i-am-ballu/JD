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
    const user_details = JSON.parse(
      await AsyncStorage.getItem("user_x_token_And_Pin")
    );
    if (user_details && user_details.x_token != null && !user_details.x_pin) {
      //navigate to pin
      this.goToPin(user_details.x_token);
    } else if (
      user_details &&
      user_details.x_token != null &&
      user_details.x_pin != null
    ) {
      //navigate to home
      this.goToHome(user_details.x_pin);
    } else {
      //navigate to login
      this.goToAuth();
    }
  }

  goToHome(user_x_pin) {
    this.props.navigation.navigate("MainTabNavigator", { user_x_pin });
  }

  goToAuth() {
    this.props.navigation.navigate("LoginScreen");
    // this.props.navigation.navigate("PinScreen");
  }
  goToPin(user_x_token) {
    this.props.navigation.navigate("PinScreen", { user_x_token });
  }
}

export default LoadingScreen;
