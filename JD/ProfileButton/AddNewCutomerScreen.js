import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Colors } from "react-native-paper";

export default class AddNewCutomerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }
  componentDidMount() {}
  getConfig() {
    return {
      primary: Colors.lightBlueA700,
      underlineColor: "transparent",
      background: "transparent",
      placeholder: Colors.grey500,
      text: Colors.grey700
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Add</Text>
        <TextInput
          label="Code"
          style={{
            elevation: 1
          }}
          Type="flat"
          theme={{
            colors: this.getConfig()
          }}
          placeholder="Username/Mobile"
          inputStyle={{ fontSize: 15 }}
          underlineColor={Colors.grey400}
          onChangeText={text => this.setState({ userName: text })}
        />
      </View>
    );
  }
}

AddNewCutomerScreen.navigationOptions = {
  title: "Add New Customer",
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#1287A5",
    fontSize: 40
  },
  headerTitleStyle: {
    textAlign: "center",
    flex: 1
  }
};
const styles = StyleSheet.create({});
