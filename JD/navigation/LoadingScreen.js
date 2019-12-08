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
    AsyncStorage.removeItem("user");
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    if (user !== null) {
      //navigate to home screen
      this.goToHome(user);
    } else {
      //navigate to login screen
      this.goToAuth();
    }
  }

  goToHome(user) {
    this.props.navigation.navigate("MainTabNavigator", { user });
  }

  goToAuth() {
    this.props.navigation.navigate("LoginScreen");
  }
}

export default LoadingScreen;
