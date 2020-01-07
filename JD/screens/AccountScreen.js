import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";
import {
  Searchbar,
  DataTable,
  Button,
  Colors,
  Dialog,
  Portal
} from "react-native-paper";
import { userService } from "../services/userService";
import Moment from "moment";
import Loader from "../loader/LoaderScreen";

export default class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText: "",
      visible: false,
      customersListOfDetails: [],
      customerArray: [],
      allAreaList: [],
      isLoading: true,
      visibleAgents: false,
      initialSelectedLocation: 1
    };
  }

  componentDidMount() {
    this.getCustomersAsync();
    this.getAreaList();
  }

  componentWillMount() {}

  getCustomersAsync() {
    this.setState({
      isLoading: true
    });
    userService.getCustomerDetailsTransaction(44).then(
      data => {
        this.setState({
          customersListOfDetails: data,
          customerArray: data,
          isLoading: false
        });
      },

      error => {
        console.log("error === ", error);
      }
    );
  }
  async getAreaList() {
    let areaId = "10";
    userService.getAllAreaList(areaId).then(
      data => {
        // console.log(data);
        this.setState({ allAreaList: data });
        let Address = data[0].Address;
        // console.log(Address);
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
  renderAllLocationsAsRadioButtons(customerArray) {
    // const newArray = [];
    // customerArray.forEach(obj => {
    //   if (!newArray.some(o => o.Address === obj.Address)) {
    //     newArray.push({ ...obj });
    //   }
    // });
    return this.state.allAreaList.map((val, index) => {
      // console.log("val", val);

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
  selectSingleLocation(Address, CustomerId) {
    this.setState({
      isLoading: true
    });
    // console.log("Address", Address);
    // console.log("CustomerId", CustomerId);
    let areaId = 10;
    userService.getCustomerByAreaId(areaId, Address).then(
      data => {
        // console.log("data", data);
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
  _showDialog = () => this.setState({ visibleAgents: true });

  _hideDialog = () => this.setState({ visibleAgents: false });
  render() {
    const { visible, closeAgents } = this.props;
    return (
      <View style={styles.container}>
        <Loader loading={this.state.isLoading} />
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
            <Dialog onDismiss={closeAgents} visible={this.state.visibleAgents}>
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
        <View style={{ flex: Platform.OS === "ios" ? 0.5 : 0.8 }}>
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
        <View style={{ flex: 7 }}>
          <DataTable style={styles.paddingLeftTopRight}>
            <DataTable.Header>
              <DataTable.Title style={styles.dataTableText}>
                <Text style={styles.dataTableTitle}>Code</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableText}>
                <Text style={styles.dataTableTitle}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableText}>
                <Text style={styles.dataTableTitle}>Amount</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableText}>
                <Text style={styles.dataTableTitle}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {this.state.customersListOfDetails.map((customer, index) => {
                return (
                  <DataTable.Row
                    key={index} // you need a unique key per item
                  >
                    <DataTable.Cell style={styles.dataTableText}>
                      {customer.CustomerId}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.dataTableText}>
                      {Moment(customer.CreatedDate).format("DD/MM/YYYY")}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.dataTableText}>
                      {customer.Amount}
                    </DataTable.Cell>
                    <View style={styles.dataTableText}>
                      <Button
                        icon="camera"
                        style={{ width: 10 }}
                        onPress={() => {
                          // added to illustrate how you can make the row take the onPress event and do something
                          console.log(
                            `selected account ${customer.CustomerId}`
                          );
                        }}
                      ></Button>
                    </View>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
        </View>
      </View>
    );
  }
}

AccountScreen.navigationOptions = {
  title: "Account",
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
    justifyContent: "space-evenly"
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
