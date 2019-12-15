import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { TextInput, Colors, Button } from "react-native-paper";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  form
} from "react-native";
import { WorldAlignment } from "expo/build/AR";
import ReactDOM from "react-dom";

function validate(name, password) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];

  if (name.length === 0) {
    errors.push("Name can't be empty");
  }
  if (password.length === 0) {
    errors.push("Password can't be empty");
  }

  return errors;
}

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    // let user = { Name: "Balram", Last: "patidar" };
    // let res = AsyncStorage.setItem("user", JSON.stringify(user));
    this.state = {
      userName: "",
      password: "",
      isLoading: false,
      errors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //function for handle the submitted form
  handleSubmit(e) {
    e.preventDefault();
    const { userName, password } = this.state;
    //for get the validation message
    const errors = validate(userName, password);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      this.setState({ errors });
      this.getCustomersAsync(userName, password);
      return;
    }
  }
  async getCustomersAsync(userName, password) {
    console.log(userName);
    console.log(password);
    this.setState({ isLoading: true });
    try {
      const response = await fetch("https://jddev.herokuapp.com/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Username: userName,
          Password: password
        })
      });
      if (response) {
        const json = await response.json();
        AsyncStorage.setItem("user_x_token", JSON.stringify(json["x-token"]));
        this.props.navigation.navigate("MainTabNavigator");
      } else {
        console.log("Error nikhil");
      }
    } catch (error) {
      console.log("Error catch", error);
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <View
            style={{
              flex: 5,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={styles.loginHeader}>Jain Digital</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            {errors.map(error => (
              <Text key={error} style={{ color: "red" }}>
                Error: {error}
              </Text>
            ))}
          </View>
          <View style={{ flex: 5 }}>
            <View style={styles.paddingLeftTopRight}>
              <TextInput
                style={{
                  elevation: 1
                }}
                Type="flat"
                theme={{
                  colors: {
                    primary: Colors.lightBlueA700,
                    underlineColor: "transparent",
                    background: "transparent",
                    placeholder: Colors.grey500,
                    text: Colors.grey700
                  }
                }}
                placeholder="Username/Mobile"
                inputStyle={{ fontSize: 15 }}
                underlineColor={Colors.grey400}
                onChangeText={text => this.setState({ userName: text })}
              />
            </View>
            <View style={styles.paddingLeftTopRight}>
              <TextInput
                style={{
                  elevation: 1
                }}
                Type="flat"
                theme={{
                  colors: {
                    primary: Colors.lightBlueA700,
                    underlineColor: "transparent",
                    background: "transparent",
                    placeholder: Colors.grey500,
                    text: Colors.grey700
                  }
                }}
                placeholder="Password"
                inputStyle={{ fontSize: 15 }}
                underlineColor={Colors.grey400}
                onChangeText={text => this.setState({ password: text })}
              />
            </View>
          </View>
          <View
            style={{
              flex: 2.5,
              alignItems: "center"
            }}
          >
            <Button
              mode="contained"
              style={{ backgroundColor: Colors.lightBlueA200 }}
              contentStyle={{
                height: 44
              }}
              labelStyle={{
                fontSize: 18,
                color: Colors.white
              }}
              onPress={this.handleSubmit}
            >
              Login
            </Button>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            alignItems: "center"
          }}
        >
          <Text>Imgae with logo</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    backgroundColor: Colors.green100
  },
  label: { fontWeight: "700", marginBottom: 10 },
  inputFiled: {
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5
  },
  avoidView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1
  },
  loginHeader: {
    fontSize: 28,
    color: Colors.black,
    fontWeight: "300",
    marginTop: 80
  },
  paddingLeftTopRight: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10
  }
});
