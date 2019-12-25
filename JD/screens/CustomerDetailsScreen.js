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
  DataTable
} from "react-native-paper";
import Loader from "../loader/LoaderScreen";
import { userService } from "../services/userService";

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      checked: false,
      packageList: packageListConstant,
      customersTransactionList: []
    };
    const customerDetail = this.props.navigation.getParam(
      "text",
      "nothing sent"
    );
    // console.log("customerDetail", customerDetail);
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
    this.getCustomersAsync();
    // this.getCustomersAsync();
    // console.log("accountInfo", this.state.customersListOfDetails);
  }

  componentWillMount() {
    // this.state.customersListOfDetails = this.state.customerArray;
    // console.log("accountInfo", this.state.customerArray);
  }
  getCustomersAsync() {
    userService.getCustomerDetailsTransaction().then(
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

  SelectDeselectPackage(SNo) {
    let plist = this.state.packageList;
    plist.forEach(item => {
      if (item.SNo == SNo) {
        item.IsChecked = !item.IsChecked;
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

              {this.state.packageList.map((item, index) => (
                <DataTable.Row
                  key={item.SNo}
                  onPress={() => {
                    this.SelectDeselectPackage(item.SNo);
                  }}
                >
                  <DataTable.Cell>{item.PackageName}</DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell numeric>{item.PackageAmount}</DataTable.Cell>
                  <DataTable.Cell numeric></DataTable.Cell>
                  <Checkbox
                    status={item.IsChecked == true ? "checked" : "unchecked"}
                  />
                </DataTable.Row>
              ))}
            </DataTable>
          </Dialog.ScrollArea>
          <Dialog.Actions style={{ justifyContent: "center" }}>
            <Button onPress={this._hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });
  handleChange(e, item) {
    // console.log(e);
    // console.log(item);
    // const item = e.target.name;
    // const isChecked = e.target.checked;
    // this.setState(prevState => ({
    // checkedItems: prevState.checkedItems.set(item, isChecked)
    // }));
  }
  render() {
    const { visible, close } = this.props;

    const { checked } = this.state;
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
          {this.getPackageContainer()}
        </View>
        <View
          style={{
            flex: 5,
            backgroundColor: Colors.white,
            alignItems: "center"
          }}
        >
          <List.Subheader>Transactions</List.Subheader>
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
              {this.state.customersTransactionList.map(
                (transactions, index) => {
                  return (
                    <DataTable.Row
                      key={index} // you need a unique key per item
                    >
                      <DataTable.Cell style={styles.dataTableText}>
                        {transactions.UpdatedDate}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.dataTableText}>
                        {transactions.Amount}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.dataTableText}>
                        {transactions.CreatedDate}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.dataTableText}>
                        {transactions.CreatedByName}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.dataTableText}>
                        {transactions.Status}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                }
              )}
            </ScrollView>
          </DataTable>
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
    fontSize: 15
  }
});

const packageListConstant = [
  {
    SNo: 1,
    PackageId: 999,
    PackageName: "BASE PACK 130",
    PackageAmount: 150,
    PackageChannel: 175,
    IsCheckedDisable: false,
    IsChecked: false
  },
  {
    SNo: 2,
    PackageId: 998,
    PackageName: "GOLDAN PACK",
    PackageAmount: 150,
    PackageChannel: 81,
    IsCheckedDisable: false,
    IsChecked: false
  },
  {
    SNo: 3,
    PackageId: 993,
    PackageName: "STAR VALU PACK",
    PackageAmount: 58,
    PackageChannel: 12,
    IsCheckedDisable: false,
    IsChecked: false
  },
  {
    SNo: 4,
    PackageId: 992,
    PackageName: "SONY HAPPY INDIA PACK",
    PackageAmount: 37,
    PackageChannel: 8,
    IsCheckedDisable: false,
    IsChecked: false
  },
  {
    SNo: 5,
    PackageId: 990,
    PackageName: "ZEE WALA PACK ",
    PackageAmount: 46,
    PackageChannel: 23,
    IsCheckedDisable: false,
    IsChecked: true
  },
  {
    SNo: 6,
    PackageId: 991,
    PackageName: "COLORS WALA PACK",
    PackageAmount: 30,
    PackageChannel: 22,
    IsCheckedDisable: false,
    IsChecked: false
  }
];
