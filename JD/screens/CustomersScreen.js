import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from "react-native";
import {
  Searchbar,
  DataTable,
  Button,
  Dialog,
  Portal,
  Colors
} from "react-native-paper";
import { MonoText } from "../components/StyledText";
import Loader from "../loader/LoaderScreen";
import { userService } from "../services/userService";
import { StackNavigator } from "react-navigation";

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText: "",
      visible: false,
      initialSelectedLocation: 1,
      customersListOfDetails: [],
      customerArray: [],
      placeholderForSelectCity: "select city",
      isLoading: true,
      allAreaList: []
    };
    this.getAreaList();
  }
  componentDidMount() {
    // this.getCustomersAsync();
    // console.log("accountInfo", this.state.customersListOfDetails);
  }

  componentWillMount() {
    // this.state.customersListOfDetails = this.state.customerArray;
    // console.log("accountInfo", this.state.customerArray);
  }

  async getAreaList() {
    let areaId = "10";
    userService.getAllAreaList(areaId).then(
      data => {
        console.log(data);
        this.setState({ allAreaList: data });
        let Address = data[0].Address;
        console.log(Address);
        this.setState({
          placeholderForSelectCity: Address
        });
        userService.getCustomerByAreaId(areaId, Address).then(
          data => {
            this.setState({
              customersListOfDetails: data,
              customerArray: data,
              isLoading: false
            });
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  async getCustomersAsync() {
    userService.getAllCustomers().then(
      data => {
        this.setState({
          customersListOfDetails: data.result,
          customerArray: data.result,
          isLoading: false
        });
      },

      error => {
        console.log("error === ", error);
      }
    );
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
      isLoading: true
    });
    console.log("Address", Address);
    console.log("CustomerId", CustomerId);
    let areaId = 10;
    userService.getCustomerByAreaId(areaId, Address).then(
      data => {
        console.log("data", data);
        this.setState({
          customersListOfDetails: data,
          customerArray: data,
          isLoading: false
        });
      },
      error => {
        console.log("error", error);
      }
    );

    this.setState({
      initialSelectedLocation: CustomerId,
      placeholderForSelectCity: Address
    });
    // if (Address != "") {
    //   const newCustomersArray = [];
    //   this.state.customerArray.map(item => {
    //     if (item.Address === Address) {
    //       newCustomersArray.push(item);
    //       this.state.customersListOfDetails = newCustomersArray;
    //     }
    //   });
    // } else {
    //   this.state.customersListOfDetails = this.state.customerArray;
    // }
    this._hideDialog();
  }
  renderAllLocationsAsRadioButtons(customerArray) {
    // const newArray = [];
    // customerArray.forEach(obj => {
    //   if (!newArray.some(o => o.Address === obj.Address)) {
    //     newArray.push({ ...obj });
    //   }
    // });
    return this.state.allAreaList.map((val, index) => {
      console.log("val", val);

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
  render() {
    const { checked } = this.state;
    const { visible, close } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={this.state.isLoading} />
        <View style={{ flex: 1, padding: 5 }}>
          <View style={{ flex: 2 }}>
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
                {this.state.placeholderForSelectCity}
              </Button>
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
            <View style={{ flex: 1 }}>
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
          <View style={{ flex: 8 }}>
            <DataTable>
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
                      onPress={() =>
                        this.props.navigation.navigate(
                          "CustomerDetailsScreen",
                          {
                            text: customer
                          }
                        )
                      }
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
