import * as WebBrowser from "expo-web-browser";
import React from "react";
import { View, Text } from "react-native";
import { Avatar, Colors, Button } from "react-native-paper";
import { MonoText } from "../components/StyledText";

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1
          }}
        >
          <View style={{ flex: 0.1 }}></View>
          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <Avatar.Image
              size={180}
              style={{ marginLeft: 10 }}
              source={require("../assets/images/temp.jpg")}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                marginLeft: 20,
                paddingRight: 5
              }}
            >
              <View style={{ flex: 0.3 }}></View>
              <View style={{ flex: 1 }}>
                <Text>999999999</Text>
                <Text>Jain Digital</Text>
                <Text>njain963@gmail.com</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text>Hello1</Text>
                  <Text>Hello2</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <View style={{ flex: 6 }}></View>
          <View style={{ flex: 1 }}>
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
            >
              Submit
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: "Profile",
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