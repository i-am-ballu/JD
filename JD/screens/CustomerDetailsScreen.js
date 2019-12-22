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
      visible: false,
      initialSelectedLocation: 1
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
  selectSingleLocation(CustomerId) {
    console.log("CustomerId", CustomerId);

    this.setState({
      initialSelectedLocation: CustomerId
    });
  }
  render() {
    const { visible, close } = this.props;
    const { checked } = this.state;
    const tuitions = [
      { value: "ValueA", key: "KeyA", name: "Name A", id: 1 },
      { value: "ValueB", key: "KeyB", name: "Name B", id: 2 },
      { value: "ValueC", key: "KeyC", name: "Name C", id: 3 }
    ];
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
                    {tuitions.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={this.selectSingleLocation.bind(this, item.id)}
                      >
                        <Text style={{ alignItems: "flex-start" }}>
                          {item.name}
                        </Text>
                        <View
                          style={{ alignItems: "flex-end", marginTop: -35 }}
                        >
                          <View style={styles.radioButton}>
                            {item.id == this.state.initialSelectedLocation ? (
                              <View style={styles.radioButtonSelected} />
                            ) : null}
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
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
const styles = StyleSheet.create({
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
