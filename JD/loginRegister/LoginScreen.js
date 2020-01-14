import React, { Component } from "react";
import { AsyncStorage, ImageBackground } from "react-native";
import { TextInput, Colors, Button } from "react-native-paper";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  form
} from "react-native";
import { WorldAlignment } from "expo/build/AR";
import ReactDOM from "react-dom";
import Loader from "../loader/LoaderScreen";

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
    this.setState({
      isLoading: true
    });
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
        await AsyncStorage.setItem(
          "user_x_token_And_Pin",
          JSON.stringify({
            x_token: json["x-token"]
          })
        );
        this.props.navigation.navigate("LoadingScreen");
      } else {
        this.setState({ isLoading: false });
        console.log("Error nikhil");
      }
    } catch (error) {
      this.setState({ isLoading: false });
      console.log("Error catch", error);
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/images/back.png")}
        >
          <Loader loading={this.state.isLoading} />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20
            }}
          >
            <Text style={styles.loginHeader}>Jain Digital</Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            {errors.map(error => (
              <Text key={error} style={{ color: "red" }}>
                Error: {error}
              </Text>
            ))}
          </View>
          <View>
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
                    placeholder: "#626262",
                    text: "#3498db"
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
                    placeholder: "#626262",
                    text: "#3498db"
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
              alignItems: "center"
            }}
          >
            <Button
              mode="contained"
              style={styles.loginButtonContainer}
              contentStyle={{
                height: 40
              }}
              labelStyle={{
                fontSize: 13,
                color: Colors.white
              }}
              onPress={this.handleSubmit}
            >
              Login
            </Button>
          </View>
        </ImageBackground>
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
  },
  loginButtonContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 30,
    backgroundColor: "#1287A5",
    marginRight: 1,
    marginTop: 15
  }
});
