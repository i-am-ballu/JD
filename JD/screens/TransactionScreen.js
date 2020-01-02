import React from "react";
import { StyleSheet, View, Text, ScrollView, Platform } from "react-native";
import { Searchbar, DataTable, Button } from "react-native-paper";
import { userService } from "../services/userService";
import Moment from "moment";

export default class TransactionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText: "",
      visible: false,
      customersListOfDetails: [],
      customerArray: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getCustomersAsync();
  }

  componentWillMount() {}

  getCustomersAsync() {
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
  render() {
    return (
      <View style={styles.container}>
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

TransactionScreen.navigationOptions = {
  title: "Transaction   ",
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
