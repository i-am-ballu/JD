import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Colors,
  Button,
  Dialog,
  Portal,
  Checkbox,
  TextInput,
  List,
  Divider
} from "react-native-paper";
import Loader from "../loader/LoaderScreen";

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      checked: false
    };
    const customerDetail = this.props.navigation.getParam(
      "text",
      "nothing sent"
    );
    console.log("customerDetail", customerDetail);
    customerDetailKeys = Object.keys(customerDetail);

    this.state.result = Object.keys(customerDetail).map(function(key) {
      return {
        key,
        value: customerDetail[key]
      };
    });
    this.state.result = this.state.result.filter(function(item) {
      return item.key != "Id" && item.key != "Name" && item.key != "AgentId";
    });
    this.state.isLoading = false;
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(e, item) {
    console.log(e);
    console.log(item);

    // const item = e.target.name;
    // const isChecked = e.target.checked;
    // this.setState(prevState => ({
    // checkedItems: prevState.checkedItems.set(item, isChecked)
    // }));
  }
  render() {
    const { visible, close } = this.props;
    const checkboxes = [
      {
        id: 1,
        name: "check-box-1",
        key: "checkBox1",
        label: "Check Box 1",
        status: false
      },
      {
        id: 2,
        name: "check-box-2",
        key: "checkBox2",
        label: "Check Box 2",
        status: false
      },
      {
        id: 3,
        name: "check-box-3",
        key: "checkBox3",
        label: "Check Box 3",
        status: false
      },
      {
        id: 4,
        name: "check-box-4",
        key: "checkBox4",
        label: "Check Box 4",
        status: false
      }
    ];
    const { checked } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={this.state.isLoading} />
        <View
          style={{
            flex: 1,
            marginTop: 10
          }}
        >
          <List.Section>
            {this.state.result.map(function(item, index) {
              return (
                <View key={index}>
                  <List.Item
                    title={item.value}
                    left={props => (
                      <Text
                        style={{ marginTop: 7, marginLeft: 10, fontSize: 18 }}
                      >
                        {item.key == "CustomerId" ? "Code" : item.key} :{" "}
                      </Text>
                    )}
                  />
                  <Divider />
                </View>
              );
            })}
          </List.Section>
        </View>

        <View
          style={{
            flex: 0.5,
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
                {checkboxes.map((item, index) => (
                  <View key={item.key}>
                    <Text>{item.name}</Text>
                    <Checkbox
                      status={checked ? "checked" : "unchecked"}
                      onPress={status => {
                        this.handleChange(status, item);
                      }}
                    />
                  </View>
                ))}
              </Dialog.ScrollArea>
              <Dialog.Actions style={{ justifyContent: "center" }}>
                <Button onPress={this._hideDialog}>Cancel</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: Colors.white,
            alignItems: "center"
          }}
        >
          <Text>Imgae with logo</Text>
        </View>
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
