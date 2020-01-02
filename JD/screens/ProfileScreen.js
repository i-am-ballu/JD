import * as WebBrowser from "expo-web-browser";
import React from "react";
import { View, Text } from "react-native";
import { Avatar, Colors, Button } from "react-native-paper";
import { MonoText } from "../components/StyledText";
import { AsyncStorage } from "react-native";

export default class ProfileScreen extends React.Component {
  _LogoutMethod = () => {
    AsyncStorage.removeItem("user_x_token_And_Pin");
    this.props.navigation.navigate("LoadingScreen");
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 8,
            marginTop: 10
          }}
        >
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Button
            mode="contained"
            style={{
              backgroundColor: Colors.lightGreenA100,
              marginRight: 10
            }}
            contentStyle={{
              height: 44
            }}
            labelStyle={{
              fontSize: 18,
              color: Colors.white
            }}
          >
            One
          </Button>

          <Button
            mode="contained"
            style={{ backgroundColor: Colors.lightGreenA100, marginRight: 10 }}
            contentStyle={{
              height: 44
            }}
            labelStyle={{
              fontSize: 18,
              color: Colors.white
            }}
          >
            Two
          </Button>
          <Button
            mode="contained"
            style={{ backgroundColor: Colors.lightGreenA100 }}
            contentStyle={{
              height: 44
            }}
            labelStyle={{
              fontSize: 18,
              color: Colors.white
            }}
            onPress={() => this.props.navigation.navigate("CustomerDetail")}
          >
            Three
          </Button>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Button
            mode="contained"
            style={{
              backgroundColor: Colors.lightBlueA200,
              marginRight: 10
            }}
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
            onPress={this._LogoutMethod}
          >
            Logout
          </Button>
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
