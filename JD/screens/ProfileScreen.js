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
import {
  Avatar,
  Colors,
  Button,
  Dialog,
  Portal,
  TextInput,
  List
} from "react-native-paper";
import { MonoText } from "../components/StyledText";
import { AsyncStorage } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { userService } from "../services/userService";
import jwt_decode from "jwt-decode";
import Loader from "../loader/LoaderScreen";

function validate(customer_Id) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];
  if (customer_Id.length === 0) {
    errors.push("customer Id can't be empty");
  }
  return errors;
}

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      visibleCustomerId: false,
      allAreaList: [],
      initialSelectedLocation: 1,
      customer_Id: "",
      userInfo: {}
    };
    this._handleCustomerID = this._handleCustomerID.bind(this);
  }
  componentDidMount() {
    // this.getPermissionAsync();
    console.log("hi");
    this.checkIfLoggedInOrLogOut();
  }
  async checkIfLoggedInOrLogOut() {
    const user_details = JSON.parse(
      await AsyncStorage.getItem("user_x_token_And_Pin")
    );
    let tokenInfomation = this.getDecodedAccessToken(
      String(user_details.x_token)
    ); // decode token
    if (tokenInfomation.id) {
      this.getUserByUserId(tokenInfomation.id);
    }
  }
  getDecodedAccessToken(token) {
    try {
      return jwt_decode(token);
    } catch (Error) {
      console.log("Error----", Error);

      return null;
    }
  }
  getUserByUserId(user_id) {
    this.setState({
      isLoading: true
    });
    userService.getUserByUserId(user_id).then(
      data => {
        this.setState({ userInfo: data.data, isLoading: false });
      },
      error => {
        console.log("error === ", error);
      }
    );
  }
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
  _showEnterCustomerIdDialog = () => this.setState({ visibleCustomerId: true });
  _hideEnterCustomerIdDialog = () =>
    this.setState({ visibleCustomerId: false });
  //function for handle the submitted form
  _handleCustomerID(e) {
    e.preventDefault();
    const { customer_Id } = this.state;
    //for get the validation message
    const errors = validate(customer_Id);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      this.setState({ errors });
      this.sendCustomerIdTOAddRecord(customer_Id);
      return;
    }
  }
  renderAllLocationsAsRadioButtons() {
    return (
      <TextInput
        label="Customer Id"
        style={{
          elevation: 1
        }}
        Type="flat"
        theme={{
          colors: this.getConfig()
        }}
        placeholder="Enter Customer Id"
        inputStyle={{ fontSize: 15 }}
        underlineColor={Colors.grey400}
        onChangeText={text => this.setState({ customer_Id: text })}
      />
    );
  }
  sendCustomerIdTOAddRecord(customer_Id) {
    this.setState({
      isLoading: true
    });
    this._showEnterCustomerIdDialog();
    this.props.navigation.navigate("AddNewCutomer", {
      customer_Id: customer_Id
    });
    this._hideEnterCustomerIdDialog();
  }
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
    let { image } = this.state;
    const { closeCustomerId } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={this.state.isLoading} />
        <View style={styles.header}></View>
        <TouchableOpacity onPress={source => this.openImagePicker()}>
          <Avatar.Image
            size={150}
            style={styles.avatar}
            source={require("../assets/images/temp.jpg")}
            onPress={() => this.openImagePicker()}
          />
        </TouchableOpacity>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text>{this.state.userInfo.Name}</Text>
            <Text style={styles.info}>{this.state.userInfo.Role}</Text>
            <Text style={styles.description}>
              {this.state.userInfo.Username} / {this.state.userInfo.MobileNo} /{" "}
              {this.state.userInfo.AreaCode}
            </Text>

            <Button
              mode="contained"
              style={styles.buttonContainer}
              contentStyle={{
                height: 40
              }}
              labelStyle={{
                fontSize: 13,
                color: Colors.white
              }}
              onPress={this._LogoutMethod}
            >
              Logout
            </Button>
          </View>
        </View>
        <List.Section style={{ marginTop: -10 }}>
          <List.Accordion title="Advance Feature">
            <ScrollView>
              <View
                style={{
                  alignItems: "flex-start",
                  marginLeft: 20
                }}
              >
                <Button
                  mode="contained"
                  style={styles.buttonContainerDropdown}
                  contentStyle={{
                    height: 40
                  }}
                  labelStyle={{
                    fontSize: 13,
                    color: Colors.white
                  }}
                  onPress={this._showEnterCustomerIdDialog}
                >
                  Edit Customer
                </Button>
                <Button
                  mode="contained"
                  style={styles.buttonContainerDropdown}
                  contentStyle={{
                    height: 40
                  }}
                  labelStyle={{
                    fontSize: 13,
                    color: Colors.white
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("AddNewCustomer")
                  }
                >
                  Add Customer
                </Button>
                <Button
                  mode="contained"
                  style={styles.buttonContainerDropdown}
                  contentStyle={{
                    height: 40
                  }}
                  labelStyle={{
                    fontSize: 13,
                    color: Colors.white
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("ManageDistributor")
                  }
                >
                  Manage Distributor
                </Button>
              </View>
            </ScrollView>
          </List.Accordion>
        </List.Section>
        <Portal>
          <Dialog
            onDismiss={closeCustomerId}
            visible={this.state.visibleCustomerId}
          >
            <Dialog.Title>Choose an option</Dialog.Title>
            <Dialog.ScrollArea style={{ maxHeight: 450, paddingHorizontal: 0 }}>
              <ScrollView>
                <View style={{ marginLeft: 20, paddingBottom: 20 }}>
                  {this.renderAllLocationsAsRadioButtons()}
                </View>
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions style={{ justifyContent: "center" }}>
              <Button onPress={this._handleCustomerID}>Save</Button>
              <Button onPress={this._hideEnterCustomerIdDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: "Profile",
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#1287A5",
    fontSize: 40,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    textAlign: "center",
    flex: 1,
    position: "absolute",
    top: 50,
    fontSize: 35
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1287A5",
    height: 150
  },
  avatar: {
    borderColor: "white",
    alignSelf: "center",
    marginTop: -60
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 5,
    marginBottom: 0
  },
  bodyContent: {
    alignItems: "center",
    padding: 20
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#1287A5",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: "#1287A5",
    marginRight: 10,
    marginTop: 20
  },
  buttonContainerDropdown: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: "#1287A5",
    marginRight: 10
  }
});
