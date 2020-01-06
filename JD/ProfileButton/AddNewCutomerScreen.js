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

function validate(CustomerId, Name, STBNo, CardNo, Address, MobileNo, AgentId) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];

  if (CustomerId.length === 0) {
    errors.push({ Value: "Customer Id can't be empty", id: "Customer" });
  }
  if (Name.length === 0) {
    errors.push({ Value: "Name can't be empty", id: "Name" });
  }
  if (STBNo.length === 0) {
    errors.push({ Value: "SBT No can't be empty", id: "STBNo" });
  }
  if (CardNo.length === 0) {
    errors.push({ Value: "Card No can't be empty", id: "CardNo" });
  }
  if (Address.length === 0) {
    errors.push({ Value: "Address can't be empty", id: "Address" });
  }
  if (MobileNo.length === 0) {
    errors.push({ Value: "Mobile No can't be empty", id: "MobileNo" });
  }
  if (AgentId.length === 0) {
    errors.push({ Value: "Agent Id can't be empty", id: "AgentId" });
  }

  return errors;
}

export default class AddNewCutomerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomerId: "",
      Name: "",
      STBNo: "",
      CardNo: "",
      Address: "",
      MobileNo: "",
      AgentId: "",
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
      "customer_Id",
      "Nothing sent From Profile"
    );
    if (customer_id != "Nothing sent From Profile") {
      this.getCustomerByCustomerId(customer_id);
    }
    this.getAreaList();
  }
  async getCustomerByCustomerId(customer_id) {
    userService.getCustomerByCustomerId(customer_id).then(
      data => {
        console.log("data", data.data);
        let details = data.data;
        this.setState({
          AgentId: details.AgentId,
          CardNo: details.CardNo,
          CustomerId: details.CustomerId,
          MobileNo: details.MobileNo,
          Name: details.Name,
          STBNo: details.STBNo,
          Address: details.Address
        });
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
    const {
      CustomerId,
      Name,
      STBNo,
      CardNo,
      Address,
      MobileNo,
      AgentId
    } = this.state;
    //for get the validation message
    const errors = validate(
      CustomerId,
      Name,
      STBNo,
      CardNo,
      Address,
      MobileNo,
      AgentId
    );
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      this.setState({ errors });
      this.addCustomersMethod(
        CustomerId,
        Name,
        STBNo,
        CardNo,
        Address,
        MobileNo,
        AgentId
      );
      return;
    }
  }
  clearCustomersForm(e) {}
  addCustomersMethod(
    CustomerId,
    Name,
    STBNo,
    CardNo,
    Address,
    MobileNo,
    AgentId
  ) {
    userService
      .addCustomer(CustomerId, Name, STBNo, CardNo, Address, MobileNo, AgentId)
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
  errorFunction(errors, id) {
    return errors.map(function(item) {
      if (item.id == id) {
        return (
          <Text key={item.id} style={{ color: "red" }}>
            Error: {item.Value}
          </Text>
        );
      }
    });
  }
  render() {
    const { errors } = this.state;
    const { closeAddress, closeAgent } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, padding: 5 }}>
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
            onChangeText={CustomerId =>
              this.setState({ CustomerId: CustomerId })
            }
            value={String(this.state.CustomerId)}
          />
          <View style={styles.errorText}>
            {this.errorFunction(errors, "Customer")}
          </View>
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
            onChangeText={Name => this.setState({ Name: Name })}
            value={this.state.Name}
          />
          <View style={styles.errorText}>
            {this.errorFunction(errors, "Name")}
          </View>
          <TextInput
            label="STBNo"
            style={{
              elevation: 1
            }}
            Type="flat"
            theme={{
              colors: this.getConfig()
            }}
            placeholder="STB No"
            inputStyle={{ fontSize: 15 }}
            underlineColor={Colors.grey400}
            onChangeText={STBNo => this.setState({ STBNo: STBNo })}
            value={this.state.STBNo}
          />
          <View style={styles.errorText}>
            {this.errorFunction(errors, "STBNo")}
          </View>
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
            onChangeText={CardNo => this.setState({ CardNo: CardNo })}
            value={this.state.CardNo}
          />
          <View style={styles.errorText}>
            {this.errorFunction(errors, "CardNo")}
          </View>
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
          <View style={styles.errorText}>
            {this.errorFunction(errors, "Address")}
          </View>
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
            onChangeText={MobileNo => this.setState({ MobileNo: MobileNo })}
            value={this.state.MobileNo}
          />
          <View style={styles.errorText}>
            {this.errorFunction(errors, "MobileNo")}
          </View>
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
            onChangeText={AgentId => this.setState({ AgentId: AgentId })}
            value={String(this.state.AgentId)}
          />
          <View style={styles.errorText}>
            {this.errorFunction(errors, "AgentId")}
          </View>
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
            style={styles.buttonContainerSave}
            contentStyle={{
              height: 40
            }}
            labelStyle={{
              fontSize: 13,
              color: Colors.white
            }}
            onPress={this.addCustomersForm}
          >
            Add
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
  },
  buttonContainerSave: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: "#1287A5",
    marginRight: 10,
    padding: 10
  },
  errorText: {
    marginBottom: -15,
    marginTop: 5,
    marginLeft: 10
  }
});
