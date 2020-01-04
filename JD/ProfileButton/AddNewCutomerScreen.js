import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class AddNewCutomerScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Add</Text>
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
