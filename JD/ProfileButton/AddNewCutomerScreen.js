import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { TextInput, Colors, Button, Dialog, Portal } from "react-native-paper";
import { userService } from "../services/userService";

function validate(Code, Name, SBTNo, CardNo, Address, MoblieNo, Agent) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];

  if (Code.length === 0) {
    errors.push("Code can't be empty");
  }
  if (Name.length === 0) {
    errors.push("Name can't be empty");
  }
  if (SBTNo.length === 0) {
    errors.push("SBT No can't be empty");
  }
  if (CardNo.length === 0) {
    errors.push("Card No can't be empty");
  }
  if (Address.length === 0) {
    errors.push("Address can't be empty");
  }
  if (MoblieNo.length === 0) {
    errors.push("Moblie No can't be empty");
  }
  if (Agent.length === 0) {
    errors.push("Agent  can't be empty");
  }

  return errors;
}

export default class AddNewCutomerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Code: "",
      Name: "",
      SBTNo: "",
      CardNo: "",
      Address: "",
      MoblieNo: "",
      Agent: "",
      isLoading: false,
      errors: [],
      visibleAddress: false,
      visibleAgent: false,
      allAreaList: [],
      initialSelectedLocation: 1
    };
    this.addCustomersForm = this.addCustomersForm.bind(this);
    this.clearCustomersForm = this.clearCustomersForm.bind(this);
    const customer_id = this.props.navigation.getParam(
      "object",
      "Nothing sent From Profile"
    );
    this.getCustomerByCustomerId(customer_id);
    this.getAreaList();
  }
  async getCustomerByCustomerId(customer_id) {
    userService.getCustomerByCustomerId(customer_id).then(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  async getAreaList() {
    let areaId = "10";
    userService.getAllAreaList(areaId).then(
      data => {
        this.setState({ allAreaList: data });
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
            {index == this.state.initialSelectedLocation ? (
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
      Address: Address
    });
    this._hideAddressDialog();
  }
  componentDidMount() {}
  addCustomersForm(e) {
    e.preventDefault();
    const { Code, Name, SBTNo, CardNo, Address, MoblieNo, Agent } = this.state;
    //for get the validation message
    const errors = validate(
      Code,
      Name,
      SBTNo,
      CardNo,
      Address,
      MoblieNo,
      Agent
    );
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      this.setState({ errors });
      this.addCustomersMethod(
        Code,
        Name,
        SBTNo,
        CardNo,
        Address,
        MoblieNo,
        Agent
      );
      return;
    }
  }
  clearCustomersForm(e) {}
  addCustomersMethod(Code, Name, SBTNo, CardNo, Address, MoblieNo, Agent) {
    userService
      .addCustomer(Code, Name, SBTNo, CardNo, Address, MoblieNo, Agent)
      .then(
        data => {
          console.log(data);
        },
        error => {
          console.log("error === ", error);
        }
      );
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
  _showAddressDialog = () => this.setState({ visibleAddress: true });
  _hideAddressDialog = () => this.setState({ visibleAddress: false });
  _showAgentDialog = () => this.setState({ visibleAgent: true });
  _hideAgentDialog = () => this.setState({ visibleAgent: false });
  render() {
    const { errors } = this.state;
    const { closeAddress, closeAgent } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5, marginLeft: 10 }}>
          {errors.map(error => (
            <Text key={error} style={{ color: "red" }}>
              Error: {error}
            </Text>
          ))}
        </View>
        <View style={{ flex: 2 }}>
          <TextInput
            label="Code"
            style={{
              elevation: 1
            }}
            Type="flat"
            theme={{
              colors: this.getConfig()
            }}
            placeholder="Code"
            inputStyle={{ fontSize: 15 }}
            underlineColor={Colors.grey400}
            onChangeText={text => this.setState({ Code: text })}
          />
          <TextInput
            label="Name"
            style={{
              elevation: 1
            }}
            Type="flat"
            theme={{
              colors: this.getConfig()
            }}
            placeholder="Name"
            inputStyle={{ fontSize: 15 }}
            underlineColor={Colors.grey400}
            onChangeText={text => this.setState({ Name: text })}
          />
          <TextInput
            label="SBTNo"
            style={{
              elevation: 1
            }}
            Type="flat"
            theme={{
              colors: this.getConfig()
            }}
            placeholder="SBT No"
            inputStyle={{ fontSize: 15 }}
            underlineColor={Colors.grey400}
            onChangeText={text => this.setState({ SBTNo: text })}
          />
          <TextInput
            label="CardNo"
            style={{
              elevation: 1
            }}
            Type="flat"
            theme={{
              colors: this.getConfig()
            }}
            placeholder="Card No"
            inputStyle={{ fontSize: 15 }}
            underlineColor={Colors.grey400}
            onChangeText={text => this.setState({ CardNo: text })}
          />
          <TextInput
            label="Address"
            style={{
              elevation: 1
            }}
            Type="flat"
            theme={{
              colors: this.getConfig()
            }}
            placeholder="Address"
            inputStyle={{ fontSize: 15 }}
            underlineColor={Colors.grey400}
            onTouchStart={() => this._showAddressDialog()}
            onChangeText={Address => this.setState({ Address: Address })}
            value={this.state.Address}
          />
          <Portal>
            <Dialog
              onDismiss={closeAddress}
              visible={this.state.visibleAddress}
            >
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
                <Button onPress={this._hideAddressDialog}>Cancel</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <TextInput
            label="MoblieNo"
            style={{
              elevation: 1
            }}
            Type="flat"
            theme={{
              colors: this.getConfig()
            }}
            placeholder="Mblie No"
            inputStyle={{ fontSize: 15 }}
            underlineColor={Colors.grey400}
            onChangeText={text => this.setState({ MoblieNo: text })}
          />
          <TextInput
            label="Agent"
            style={{
              elevation: 1
            }}
            Type="flat"
            theme={{
              colors: this.getConfig()
            }}
            placeholder="Agent"
            inputStyle={{ fontSize: 15 }}
            underlineColor={Colors.grey400}
            onFocus={() => this._showAgentDialog()}
            onChangeText={text => this.setState({ Agent: text })}
          />
          <Portal>
            <Dialog onDismiss={closeAgent} visible={this.state.visibleAgent}>
              <Dialog.Title>Choose an option</Dialog.Title>
              <Dialog.ScrollArea
                style={{ maxHeight: 450, paddingHorizontal: 0 }}
              >
                <ScrollView>
                  <View style={{ marginLeft: 20, paddingBottom: 20 }}>
                    <Text>Hello</Text>
                  </View>
                </ScrollView>
              </Dialog.ScrollArea>
              <Dialog.Actions style={{ justifyContent: "center" }}>
                <Button onPress={this._hideAgentDialog}>Cancel</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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
            style={{ backgroundColor: Colors.lightBlueA200, marginRight: 10 }}
            contentStyle={{
              height: 44
            }}
            labelStyle={{
              fontSize: 18,
              color: "#5c5c5c"
            }}
            onPress={this.addCustomersForm}
          >
            Add
          </Button>
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
            onPress={this.clearCustomersForm}
          >
            Clear
          </Button>
        </View>
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
