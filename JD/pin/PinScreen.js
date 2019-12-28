import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { TextInput, Colors, Button, Avatar } from "react-native-paper";
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

function validate(pin) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];

  if (pin.length === 0) {
    errors.push("pin can't be empty");
  }

  return errors;
}

export default class PinScreen extends Component {
  constructor(props) {
    super(props);
    let user = { Name: "Balram", Last: "patidar" };
    let res = AsyncStorage.setItem("user", JSON.stringify(user));
    this.state = {
      pinChange: "",
      isLoading: false,
      errors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //function for handle the submitted form
  handleSubmit(e) {
    e.preventDefault();
    const { pinChange } = this.state;
    //for get the validation message
    const errors = validate(pinChange);
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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 6,
              marginBottom: -50,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Avatar.Image
              size={100}
              source={require("../assets/images/temp.jpg")}
            />
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.pinHeader}>Jain Digital</Text>
          </View>
          <View style={{ flex: 2 }}>
            <View style={styles.paddingLeftTopRight}>
              <TextInput
                style={{
                  elevation: 1,
                  height: 50
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
                placeholder="Enter Pin"
                inputStyle={{ fontSize: 15 }}
                underlineColor={Colors.grey400}
                onChangeText={text => this.setState({ pinChange: text })}
              />
            </View>
          </View>
          <View style={{ flex: 0.5, marginLeft: 15, marginBottom: 5 }}>
            {errors.map(error => (
              <Text key={error} style={{ color: "red" }}>
                Error: {error}
              </Text>
            ))}
          </View>
          <View
            style={{
              flex: 1,
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
              Submit
            </Button>
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pinHeader: {
    fontSize: 28,
    color: Colors.black,
    fontWeight: "300"
  },
  paddingLeftTopRight: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10
  }
});
