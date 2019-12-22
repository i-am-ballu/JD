import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableHighlight
} from "react-native";
import {
  DataTable,
  Colors,
  List,
  Button,
  Dialog,
  Portal,
  RadioButton
} from "react-native-paper";
import Loader from "../loader/LoaderScreen";
import { userService } from "../services/userService";

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerDetailArray: [],
      isLoading: true,
      visible: false
    };
    const customerDetail = this.props.navigation.getParam(
      "text",
      "nothing sent"
    );
    console.log("customerDetail", customerDetail);
    this.state.customerDetailArray.push(customerDetail);
    console.log("customerDetailArray", this.state.customerDetailArray);
    this.state.isLoading = false;
    this.state.customerDetailArray = [
      {
        Code: 1,
        Address: "Limbodhi",
        SBTNo: 10,
        CardNo: 90,
        MoblieNo: 999
      }
    ];
  }
  componentDidMount() {
    // this.getCustomersAsync();
    // console.log("accountInfo", this.state.customersListOfDetails);
  }

  componentWillMount() {
    // this.state.customersListOfDetails = this.state.customerArray;
    // console.log("accountInfo", this.state.customerArray);
  }
  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });
  render() {
    const { visible, close } = this.props;
    const { checked } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={this.state.isLoading} />
        <View style={{ flex: 0.1 }}></View>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white
          }}
        >
          {this.state.customerDetailArray.map((item, index) => {
            return (
              <List.Section>
                <List.Subheader>Customers Details</List.Subheader>
                <List.Item
                  style={{ marginLeft: 10 }}
                  title={item.Code}
                  left={() => (
                    <View>
                      <Text style={{ marginTop: 6 }}>
                        Code <Text> : </Text>{" "}
                      </Text>
                    </View>
                  )}
                />
                <List.Item
                  title={item.SBTNo}
                  style={{ marginLeft: 10 }}
                  left={() => (
                    <View>
                      <Text style={{ marginTop: 6 }}>
                        STBNo <Text> : </Text>{" "}
                      </Text>
                    </View>
                  )}
                />
                <List.Item
                  title={item.CardNo}
                  style={{ marginLeft: 10 }}
                  left={() => (
                    <View>
                      <Text style={{ marginTop: 6 }}>
                        CardNo <Text> : </Text>{" "}
                      </Text>
                    </View>
                  )}
                />
                <List.Item
                  title={item.Address}
                  style={{ marginLeft: 10 }}
                  left={() => (
                    <View>
                      <Text style={{ marginTop: 6 }}>
                        Address <Text> : </Text>{" "}
                      </Text>
                    </View>
                  )}
                />
                <List.Item
                  title={item.MoblieNo}
                  style={{ marginLeft: 10 }}
                  left={() => (
                    <View>
                      <Text style={{ marginTop: 6 }}>
                        MoblieNo <Text> : </Text>{" "}
                      </Text>
                    </View>
                  )}
                />
              </List.Section>
            );
          })}
        </View>
        <View style={{ flex: 1 }}>
          <Button
            mode="contained"
            style={{
              backgroundColor: Colors.white
            }}
            contentStyle={{
              height: 44
            }}
            labelStyle={{
              fontSize: 18,
              color: "#5c5c5c"
            }}
            onPress={this._showDialog}
          >
            Add Record
          </Button>
          <Portal>
            <Dialog onDismiss={close} visible={this.state.visible}>
              <Dialog.Title>Choose an option</Dialog.Title>
              <Dialog.ScrollArea
                style={{ maxHeight: 450, paddingHorizontal: 0 }}
              >
                <ScrollView>
                  <View style={{ marginLeft: 20, paddingBottom: 20 }}>
                    <List.Section>
                      <List.Subheader>Customers Details</List.Subheader>
                      <List.Item
                        style={{ marginLeft: 10, marginRight: 20 }}
                        title="SONY HAPPY INDIA PACK(37Rs)"
                        right={() => (
                          <RadioButton
                            value="first"
                            status={
                              checked === "first" ? "checked" : "unchecked"
                            }
                            onPress={() => {
                              this.setState({ checked: "first" });
                            }}
                          />
                        )}
                      />
                      <List.Item
                        style={{ marginLeft: 10, marginRight: 20 }}
                        title="ZEE WALA PACK(46Rs)"
                        right={() => (
                          <RadioButton
                            value="first"
                            status={
                              checked === "second" ? "checked" : "unchecked"
                            }
                            onPress={() => {
                              this.setState({ checked: "second" });
                            }}
                          />
                        )}
                      />
                      <List.Item
                        style={{ marginLeft: 10, marginRight: 20 }}
                        title="COLOR WALA PACK(46Rs)"
                        right={() => (
                          <RadioButton
                            value="first"
                            status={
                              checked === "third" ? "checked" : "unchecked"
                            }
                            onPress={() => {
                              this.setState({ checked: "third" });
                            }}
                          />
                        )}
                      />
                    </List.Section>
                  </View>
                </ScrollView>
              </Dialog.ScrollArea>
              <Dialog.Actions style={{ justifyContent: "center" }}>
                <Button onPress={this._hideDialog}>Cancel</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <View style={{ flex: 1, backgroundColor: Colors.brown400 }}></View>
      </View>
    );
  }
}

CustomersScreen.navigationOptions = {
  title: "Customers",
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
