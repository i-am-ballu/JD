import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  Colors,
  Button,
  Dialog,
  Portal,
  TextInput,
  Checkbox,
  List,
  Divider,
  DataTable,
  Card
} from "react-native-paper";
import Loader from "../loader/LoaderScreen";
import { userService } from "../services/userService";
import Moment from "moment";

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    const customerDetail = this.props.navigation.getParam(
      "text",
      "nothing sent"
    );
    this.state = {
      isLoading: true,
      packageList: [],
      customerCopy: customerDetail,
      customersTransactionList: [],
      total: 0
    };

    customerDetailKeys = Object.keys(customerDetail);
    this.state.customer = Object.keys(customerDetail).map(function(key) {
      return {
        key,
        value: customerDetail[key]
      };
    });
    this.state.customer = this.state.customer.filter(function(item) {
      return item.key != "Id" && item.key != "Name" && item.key != "AgentId";
    });
    this.state.isLoading = false;
  }

  componentDidMount() {
    this.getCustomerDetailsTransaction();
  }

  getCustomerDetailsTransaction() {
    userService.getCustomerDetailsTransaction(this.state.customerCopy.Id).then(
      data => {
        this.setState({
          customersTransactionList: data,
          isLoading: false
        });
      },

      error => {
        console.log("error === ", error);
      }
    );
  }

  getPackageAsync() {
    userService.getPackageList().then(
      data => {
        this.setState({
          packageList: data,
          isLoading: false,
          visible: true
        });
      },

      error => {
        console.log("error === ", error);
      }
    );
  }

  SelectDeselectPackage(SNo) {
    let plist = this.state.packageList;
    plist.forEach(item => {
      if (item.SNo == SNo) {
        item.IsChecked = !item.IsChecked;
        let s = this.state.total;
        if (item.IsChecked) {
          s = s + item.PackageAmount;
        } else {
          s = s - item.PackageAmount;
        }
        this.setState({ total: s });
      }
    });
    this.setState({ packageList: plist });
  }

  getPackageContainer() {
    const checked = true;
    return (
      <Portal>
        <Dialog onDismiss={this.close} visible={this.state.visible}>
          <Dialog.Title
            style={{ justifyContent: "center", textAlign: "center" }}
          >
            Package
          </Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: 450, paddingHorizontal: 0 }}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
                <DataTable.Title numeric></DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {this.state.packageList.map((item, index) => (
                  <DataTable.Row
                    key={item.SNo}
                    onPress={() => {
                      this.SelectDeselectPackage(item.SNo);
                    }}
                  >
                    <DataTable.Cell>{item.PackageName}</DataTable.Cell>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.PackageAmount}
                    </DataTable.Cell>
                    <DataTable.Cell numeric></DataTable.Cell>
                    <Checkbox
                      status={item.IsChecked == true ? "checked" : "unchecked"}
                    />
                  </DataTable.Row>
                ))}
              </ScrollView>
            </DataTable>
          </Dialog.ScrollArea>
          <Dialog.Actions
            style={{
              justifyContent: "space-evenly",
              backgroundColor: "white"
            }}
          >
            <Button
              mode="contained"
              style={styles.modalbuttons}
              labelStyle={{
                fontSize: 13,
                color: Colors.white
              }}
              onPress={this._hideDialog}
            >
              Cancel
            </Button>
            <Text>Total: {this.state.total} &nbsp;</Text>

            <Button
              mode="contained"
              style={styles.modalbuttons}
              labelStyle={{
                fontSize: 13,
                color: Colors.white
              }}
              onPress={this._hideSelectAddRecord}
            >
              Apply
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  getTransctionContainer() {
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.dataTableText}>
            <Text style={styles.dataTableTitle}>Month</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.dataTableText}>
            <Text style={styles.dataTableTitle}>Amount</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.dataTableText}>
            <Text style={styles.dataTableTitle}>Date</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.dataTableText}>
            <Text style={styles.dataTableTitle}>Added By</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.dataTableText}>
            <Text style={styles.dataTableTitle}>status</Text>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {this.state.customersTransactionList.map((transactions, index) => {
            return (
              <DataTable.Row
                key={index} // you need a unique key per item
              >
                <DataTable.Cell style={styles.dataTableText}>
                  <Text style={{ color: "#32325d" }}>
                    {Moment(transactions.UpdatedDate).format("DD/MM/YYYY")}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dataTableText}>
                  <Text style={{ color: "#32325d" }}>
                    {transactions.Amount}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dataTableText}>
                  <Text style={{ color: "#32325d" }}>
                    {Moment(transactions.CreatedDate).format("DD/MM/YYYY")}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dataTableText}>
                  <Text style={{ color: "#32325d" }}>
                    {transactions.CreatedByName}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dataTableText}>
                  <Text style={{ color: "#32325d" }}>
                    {transactions.Status}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </ScrollView>
      </DataTable>
    );
  }

  _showDialog = () => {
    this.setState({ isLoading: true });
    this.getPackageAsync();
  };
  _hideDialog = () => this.setState({ visible: false });

  _hideSelectAddRecord = () => {
    this.setState({ isLoading: true });
    // Apply button
    let recordObject = {};
    console.log(this.state.customerCopy);
    console.log(this.state.customerCopy.Id);
    console.log(this.state.customerCopy["Id"]);

    let packageListString = "";
    let length = this.state.packageList.length - 1;
    console.log(length);

    this.state.packageList.forEach((i, index) => {
      if (i.IsChecked) {
        packageListString += i.PackageName;
        packageListString += ", ";
      }
    });
    recordObject.CreatedDate = new Date();
    recordObject.UpdatedDate = new Date();
    recordObject.Month = monthNames[new Date().getMonth()];
    recordObject.Year = new Date().getFullYear();
    recordObject.CreatedById = 10;
    recordObject.CreatedByName = "Admin";
    recordObject.Amount = this.state.total;
    recordObject.PackageList = packageListString;
    recordObject.CustomerId = this.state.customerCopy.Id;
    recordObject.Status = 0;
    recordObject.Renew = 0;
    recordObject.AddRenew = 0;
    userService.addTransaction(recordObject).then(
      data => {
        this.setState({
          isLoading: false,
          visible: false
        });
        this.getCustomerDetailsTransaction();
      },
      error => {
        console.log("error === ", error);
      }
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={this.state.isLoading} />
        <View
          style={{
            flex: 3,
            marginTop: 10
          }}
        >
          <List.Section>
            {this.state.customer.map(function(item, index) {
              return (
                <View key={index}>
                  <Card
                    style={{
                      marginRight: 10,
                      marginLeft: 10,
                      borderWidth: 0
                    }}
                  >
                    <List.Item
                      title={item.value}
                      titleStyle={{ color: "#32325d" }}
                      left={props => (
                        <Text
                          style={{ marginTop: 7, marginLeft: 10, fontSize: 14 }}
                        >
                          {item.key == "CustomerId" ? "Code" : item.key}
                        </Text>
                      )}
                    />
                  </Card>
                  <Divider />
                </View>
              );
            })}
          </List.Section>
        </View>
        <View
          style={{
            alignItems: "center"
          }}
        >
          <Button
            mode="contained"
            style={styles.buttonContainer}
            contentStyle={{
              height: 35
            }}
            labelStyle={{
              fontSize: 13,
              color: Colors.white
            }}
            onPress={this._showDialog}
          >
            Add Record
          </Button>
          {this.getPackageContainer()}
        </View>
        <View
          style={{
            flex: 5,
            backgroundColor: Colors.white,
            alignItems: "center"
          }}
        >
          <List.Subheader style={{ fontWeight: "bold", fontSize: 18 }}>
            Transactions
          </List.Subheader>
          {this.getTransctionContainer()}
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
  },
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
  buttonContainer: {
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: "#1287A5",
    marginRight: 0,
    marginTop: 20
  },
  modalbuttons: {
    borderRadius: 30,
    backgroundColor: "#1287A5",
    marginBottom: 5
  }
});

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
