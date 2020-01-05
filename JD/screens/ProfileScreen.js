import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet
} from "react-native";
import { Avatar, Colors, Button, Dialog, Portal } from "react-native-paper";
import { MonoText } from "../components/StyledText";
import { AsyncStorage } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { userService } from "../services/userService";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      visible: false,
      allAreaList: [],
      initialSelectedLocation: 1
    };
    this.getAreaList();
  }
  // componentDidMount() {
  //   this.getPermissionAsync();
  //   console.log("hi");
  // }
  // getPermissionAsync = async () => {
  //   console.log(Constants.platform.ios);

  //   if (Constants.platform.ios) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //     console.log("status", status);

  //     if (status !== "granted") {
  //       alert("Sorry, we need camera roll permissions to make this work!");
  //     }
  //   }
  // };
  _LogoutMethod = () => {
    AsyncStorage.removeItem("user_x_token_And_Pin");
    this.props.navigation.navigate("LoadingScreen");
  };
  // openImagePicker = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     this.setState({ image: result.uri });
  //   }
  // };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  openImagePicker = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false
    });
    this.setState({ result });
  };
  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });
  async getAreaList() {
    let areaId = "10";
    userService.getAllAreaList(areaId).then(
      data => {
        this.setState({ allAreaList: data });
        let Address = data[0].Address;
        this.setState({
          placeholderForSelectCity: Address
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  renderAllLocationsAsRadioButtons() {
    return this.state.allAreaList.map((val, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={this.selectSingleLocation.bind(this, val.Address, index)}
        >
          <View style={styles.radioButton}>
            {val.CustomerId == this.state.initialSelectedLocation ? (
              <View style={styles.radioButtonSelected} />
            ) : null}
          </View>
          <Text
            style={{
              marginLeft: 80,
              marginTop: -40
            }}
          >
            {val.Address}
          </Text>
        </TouchableOpacity>
      );
    });
  }
  selectSingleLocation(Address, CustomerId) {
    this.setState({
      isLoading: true
    });
    this.setState({
      initialSelectedLocation: CustomerId,
      placeholderForSelectCity: Address
    });
    this._hideDialog();
    this.props.navigation.navigate("AddNewCutomer", {
      object: Address
    });
  }
  render() {
    let { image } = this.state;
    const { visible, close } = this.props;
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
            <TouchableOpacity onPress={source => this.openImagePicker()}>
              <Avatar.Image
                size={180}
                style={{ marginLeft: 10 }}
                source={require("../assets/images/temp.jpg")}
                onPress={() => this.openImagePicker()}
              />
            </TouchableOpacity>
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
            onPress={this._showDialog}
          >
            One
          </Button>
          <Portal>
            <Dialog onDismiss={close} visible={this.state.visible}>
              <Dialog.Title>Choose an option</Dialog.Title>
              <Dialog.ScrollArea
                style={{ maxHeight: 450, paddingHorizontal: 0 }}
              >
                <ScrollView>
                  <View style={{ marginLeft: 20, paddingBottom: 20 }}>
                    {this.renderAllLocationsAsRadioButtons()}
                  </View>
                </ScrollView>
              </Dialog.ScrollArea>
              <Dialog.Actions style={{ justifyContent: "center" }}>
                <Button onPress={this._hideDialog}>Cancel</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

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
            onPress={() => this.props.navigation.navigate("AddNewCutomer")}
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
            onPress={() => this.props.navigation.navigate("ManageDistributor")}
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

const styles = StyleSheet.create({
  dataTableText: {
    // justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingRight: 10
  },
  dataTableTitle: {
    fontSize: 15
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    margin: 18
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000"
  }
});
