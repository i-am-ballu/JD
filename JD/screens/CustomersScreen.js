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
  Colors,
  Card
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
      initialSelectedLocation: 0,
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
        this.setState({ allAreaList: data });
        let Address = data[0].Address;
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
    let areaId = 10;
    userService.getCustomerByAreaId(areaId, Address).then(
      data => {
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
    this._hideDialog();
  }
  renderAllLocationsAsRadioButtons(customerArray) {
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
              marginLeft: 60,
              marginTop: -33,
              color: "#32325d"
            }}
          >
            <Text>{val.Address}</Text>
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
        <View>
          <View
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: 10
            }}
          >
            <Searchbar
              style={{
                elevation: 0
              }}
              Type="flat"
              onChangeText={text => this.onChangeText(text)}
              value={this.state.searchBarText}
              theme={{
                colors: {
                  background: "transparent",
                  text: "#3498db",
                  fontSize: 14,
                  placeholder: "#626262"
                }
              }}
              placeholder="Search"
              inputStyle={{
                fontSize: 14,
                fontWeight: "bold"
              }}
              style={styles.buttonContainer}
            />
            <Button
              mode="contained"
              style={{
                backgroundColor: Colors.white,
                borderColor: "lightgrey"
              }}
              labelStyle={{
                fontSize: 14,
                marginTop: 12,
                color: "#626262",
                fontWeight: "bold"
              }}
              onPress={this._showDialog}
              style={styles.buttonContainer}
            >
              {this.state.placeholderForSelectCity}
            </Button>
            <Portal>
              <Dialog onDismiss={close} visible={this.state.visible}>
                <Dialog.Title
                  style={{
                    justifyContent: "center",
                    textAlign: "center"
                  }}
                >
                  Choose an option
                </Dialog.Title>
                <Dialog.ScrollArea
                  style={{ maxHeight: 450, paddingHorizontal: 0 }}
                >
                  <ScrollView>
                    <View
                      style={{
                        marginLeft: 20,
                        paddingBottom: 20
                      }}
                    >
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
          <View>
            <Card
              style={{
                marginBottom: 10,
                marginRight: 10,
                marginLeft: 10
              }}
            >
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
                        key={index} // you need a unique key per item
                        onPress={() =>
                          this.props.navigation.navigate("CustomerDetail", {
                            text: customer
                          })
                        }
                      >
                        <DataTable.Cell style={styles.dataTableText}>
                          <Text style={{ color: "#32325d" }}>
                            {customer.CustomerId}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.dataTableText}>
                          <Text style={{ color: "#32325d" }}>
                            {customer.Name}
                          </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}
                </ScrollView>
              </DataTable>
            </Card>
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
    fontSize: 14,
    color: "#626262",
    fontWeight: "bold"
  },
  radioButton: {
    height: 17,
    width: 17,
    borderRadius: 0,
    borderWidth: 1.5,
    borderColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    marginLeft: 20
  },
  radioButtonSelected: {
    height: 8,
    width: 8,
    borderRadius: 0,
    backgroundColor: "#1287A5"
  },
  buttonContainer: {
    height: 40,
    marginBottom: 10,
    borderRadius: 30,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#ffffff"
  }
});
