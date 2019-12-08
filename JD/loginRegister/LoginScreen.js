import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    let user = { Name: "Balram", Last: "patidar" };
    let res = AsyncStorage.setItem("user", JSON.stringify(user));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: "red" }}>
          <Text>JD</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "" }}></View>
        <View style={{ flex: 2, backgroundColor: "green" }}></View>
        <View style={{ flex: 3, backgroundColor: "blue" }}>
          <Text>Hello</Text>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
