import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  Searchbar,
  DataTable,
  Button,
  Dialog,
  Portal
} from "react-native-paper";
import { MonoText } from "../components/StyledText";

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText: "",
      visible: false,
      initialSelectedLocation: 1,
      customersListOfDetails: [],
      customerArray: []
    };
  }

  componentDidMount() {
    this.getCustomersAsync();
    // console.log("accountInfo", this.state.customersListOfDetails);
  }

  componentWillMount() {
    // this.state.customersListOfDetails = this.state.customerArray;
    // console.log("accountInfo", this.state.customerArray);
  }
  async getCustomersAsync() {
    try {
      const response = await fetch(
        "https://jddev.herokuapp.com/customers/getAllCustomer",
        {
          method: "Get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTU3NjAzMzM2Mn0.lZu4YIkGhWtiRFj78_4N_jcs-sZkroA75O1SuEv0d-s"
          }
        }
      );
      const json = await response.json();
      if (json) {
        this.setState({
          customersListOfDetails: json.result,
          customerArray: json.result
        });
      } else {
        console.log("Error nikhil");
      }
    } catch (error) {
      console.log("Error catch", error);
    }
  }

  onChangeText(text) {
    //for update the view when we search
    if (text != "") {
      this.state.customerArray.filter(item => {
        if (item.CustomerId == text) {
          this.setState({
            customersListOfDetails: [item]
          });
        }
      });
    } else {
      this.state.customersListOfDetails = this.state.customerArray;
    }
    this.setState({ searchBarText: text });
  }

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  selectSingleLocation(Address, CustomerId) {
    this.setState({
      initialSelectedLocation: CustomerId
    });
    if (Address != "") {
      const newCustomersArray = [];
      this.state.customerArray.map(item => {
        if (item.Address === Address) {
          newCustomersArray.push(item);
          this.state.customersListOfDetails = newCustomersArray;
        }
      });
    } else {
      this.state.customersListOfDetails = this.state.customerArray;
    }
    this._hideDialog();
  }
  renderAllLocationsAsRadioButtons(customerArray) {
    const newArray = [];
    customerArray.forEach(obj => {
      if (!newArray.some(o => o.Address === obj.Address)) {
        newArray.push({ ...obj });
      }
    });
    return newArray.map((val, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={this.selectSingleLocation.bind(
            this,
            val.Address,
            val.CustomerId
          )}
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
  render() {
    const { checked } = this.state;
    const { visible, close } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: Platform.OS === "ios" ? 0.5 : 0.8
          }}
        >
          <View style={styles.paddingLeftTopRight}>
            <Button
              style={{
                borderWidth: 1,
                borderColor: "#e2e2e2",
                borderRadius: 3,
                height: 48,
                paddingTop: 5
              }}
              onPress={this._showDialog}
            >
              Select City
            </Button>
          </View>
          <Portal>
            <Dialog onDismiss={close} visible={this.state.visible}>
              <Dialog.Title>Choose an option</Dialog.Title>
              <Dialog.ScrollArea
                style={{ maxHeight: 450, paddingHorizontal: 0 }}
              >
                <ScrollView>
                  <View style={{ marginLeft: 20, paddingBottom: 20 }}>
                    {this.renderAllLocationsAsRadioButtons(
                      this.state.customerArray
                    )}
                  </View>
                </ScrollView>
              </Dialog.ScrollArea>
              <Dialog.Actions style={{ justifyContent: "center" }}>
                <Button onPress={this._hideDialog}>Cancel</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <View
          style={{
            flex: Platform.OS === "ios" ? 0.5 : 0.8
          }}
        >
          <View style={styles.paddingLeftTopRight}>
            <Searchbar
              style={{
                elevation: 1
              }}
              Type="flat"
              onChangeText={text => this.onChangeText(text)}
              value={this.state.searchBarText}
              theme={{
                colors: {
                  underlineColor: "transparent",
                  background: "transparent",
                  placeholder: "#3498db",
                  text: "#3498db"
                }
              }}
              placeholder="SEARCH"
              inputStyle={{ fontSize: 15 }}
            />
          </View>
        </View>
        <View
          style={{
            flex: Platform.OS === "ios" ? 5.6 : 5.2
          }}
        >
          <View>
            <DataTable style={styles.paddingLeftTopRight}>
              <DataTable.Header>
                <DataTable.Title style={styles.dataTableText}>
                  <Text style={styles.dataTableTitle}>Code</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dataTableText}>
                  <Text style={styles.dataTableTitle}>Name</Text>
                </DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {this.state.customersListOfDetails.map((customer, index) => {
                  return (
                    <DataTable.Row
                      key={customer.CustomerId} // you need a unique key per item
                      onPress={() => {
                        // added to illustrate how you can make the row take the onPress event and do something
                        console.log(`selected custmer ${customer.CustomerId}`);
                      }}
                    >
                      <DataTable.Cell style={styles.dataTableText}>
                        {customer.CustomerId}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.dataTableText}>
                        {customer.Name}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              </ScrollView>
            </DataTable>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  dataTableText: {
    // justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingRight: 10
  },
  dataTableTitle: {
    fontSize: 15
  },
  picker: {
    width: 100
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
  },
  paddingLeftTopRight: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5
  }
});
