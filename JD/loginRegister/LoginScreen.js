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
    let user = { Name: "Balram", Last: "patidar" };
    let res = AsyncStorage.setItem("user", JSON.stringify(user));
    this.state = {
      userName: "",
      password: "",

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
      return;
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.wrapper}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={styles.loginHeader}>JD</Text>
          </View>
          <View style={{ flex: 2 }}>
            <View style={{ marginLeft: 10 }}>
              {errors.map(error => (
                <Text key={error} style={{ color: "red" }}>
                  Error: {error}
                </Text>
              ))}
            </View>
            <View style={styles.paddingLeftTopRight}>
              <TextInput
                style={{
                  elevation: 1
                }}
                Type="flat"
                theme={{
                  colors: {
                    primary: Colors.white,
                    underlineColor: "transparent",
                    background: "transparent",
                    placeholder: Colors.whitesmoke,
                    text: Colors.white
                  }
                }}
                placeholder="Username/Mobile"
                inputStyle={{ fontSize: 15 }}
                underlineColor={Colors.white}
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
                    primary: Colors.white,
                    underlineColor: "transparent",
                    background: "transparent",
                    placeholder: Colors.whitesmoke,
                    text: Colors.white
                  }
                }}
                placeholder="Password"
                inputStyle={{ fontSize: 15 }}
                underlineColor={Colors.white}
                onChangeText={text => this.setState({ password: text })}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.loginButton}>
              <Button
                style={{
                  borderWidth: 1,
                  borderColor: Colors.white,
                  borderRadius: 3,
                  height: 48,
                  paddingTop: 5
                }}
                onPress={this.handleSubmit}
              >
                Login
              </Button>
            </View>
          </View>
          {/* </form> */}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    padding: 150
  },
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
    color: Colors.white,
    fontWeight: "300"
  },
  paddingLeftTopRight: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5
  }
});
