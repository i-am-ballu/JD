import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors, Button, Dialog, Portal, Checkbox } from "react-native-paper";
import Loader from "../loader/LoaderScreen";

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerDetailArray: [],
      isLoading: true,
      checked: false
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
        <View style={{ flex: 1 }}></View>

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
