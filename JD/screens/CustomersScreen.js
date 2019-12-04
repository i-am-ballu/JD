import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
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
      accounts: [
        {
          accNumber: "1",
          accType: "D",
          productCode: "1",
          availBalance: "1000"
        },
        {
          accNumber: "2",
          accType: "D",
          productCode: "2",
          availBalance: "2000"
        },
        {
          accNumber: "3",
          accType: "D",
          productCode: "3",
          availBalance: "3000"
        },
        {
          accNumber: "4",
          accType: "D",
          productCode: "4",
          availBalance: "4000"
        },
        {
          accNumber: "5",
          accType: "D",
          productCode: "5",
          availBalance: "5000"
        },
        {
          accNumber: "6",
          accType: "D",
          productCode: "6",
          availBalance: "6000"
        },
        {
          accNumber: "7",
          accType: "D",
          productCode: "7",
          availBalance: "7000"
        },
        {
          accNumber: "8",
          accType: "D",
          productCode: "8",
          availBalance: "8000"
        },
        {
          accNumber: "9",
          accType: "D",
          productCode: "9",
          availBalance: "9000"
        },
        {
          accNumber: "10",
          accType: "D",
          productCode: "10",
          availBalance: "10000"
        },
        {
          accNumber: "11",
          accType: "D",
          productCode: "11",
          availBalance: "11000"
        },
        {
          accNumber: "12",
          accType: "D",
          productCode: "12",
          availBalance: "12000"
        },
        {
          accNumber: "13",
          accType: "D",
          productCode: "13",
          availBalance: "13000"
        },
        {
          accNumber: "14",
          accType: "D",
          productCode: "14",
          availBalance: "14000"
        },
        {
          accNumber: "15",
          accType: "D",
          productCode: "15",
          availBalance: "15000"
        },
        {
          accNumber: "16",
          accType: "D",
          productCode: "16",
          availBalance: "16000"
        },
        {
          accNumber: "17",
          accType: "D",
          productCode: "17",
          availBalance: "17000"
        },
        {
          accNumber: "18",
          accType: "D",
          productCode: "18",
          availBalance: "18000"
        },
        {
          accNumber: "19",
          accType: "D",
          productCode: "19",
          availBalance: "19000"
        },
        {
          accNumber: "20",
          accType: "D",
          productCode: "20",
          availBalance: "20000"
        }
      ],
      accountInfo: []
    };
    this.getCustomersAsync();
  }

  componentDidMount() {
    this.state.accountInfo = this.state.accounts;
    console.log("accountInfo", this.state.accountInfo);
  }

  componentWillMount() {
    this.state.accountInfo = this.state.accounts;
    console.log("accountInfo", this.state.accountInfo);
  }

  getCustomersAsync() {
    let data = {
      method: "POST",
      body: JSON.stringify({
        customerId: 10
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    return fetch("https://jddev.herokuapp.com/customers/getcustomerbyid", data)
      .then(response => {
        console.log("res", response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  onChangeText(text) {
    //for update the view when we search
    if (text != "") {
      this.state.accounts.filter(item => {
        if (item.accNumber === text) {
          this.setState({
            accountInfo: [item]
          });
        }
      });
    } else {
      this.state.accountInfo = this.state.accounts;
    }
    this.setState({ searchBarText: text });
  }

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  selectSingleLocation(id) {
    this.setState({
      initialSelectedLocation: id
    });
    console.log("select location id == ", id);
    if (id != "") {
      this.state.accounts.filter(item => {
        if (item.accNumber === id) {
          this.setState({
            accountInfo: [item]
          });
        }
      });
    } else {
      this.state.accountInfo = this.state.accounts;
    }
    this._hideDialog();
  }
  renderAllLocationsAsRadioButtons(accounts) {
    return this.state.accounts.map((val, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={this.selectSingleLocation.bind(this, val.accNumber)}
        >
          <View style={styles.radioButton}>
            {val.accNumber == this.state.initialSelectedLocation ? (
              <View style={styles.radioButtonSelected} />
            ) : null}
          </View>
          <Text
            style={{
              marginLeft: 80,
              marginTop: -40
            }}
          >
            {val.accNumber}
          </Text>
        </TouchableOpacity>
      );
    });
  }
  render() {
    const { checked } = this.state;
    const { visible, close } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ paddingLeft: 8, paddingTop: 5, paddingRight: 8 }}>
            <Button
              style={{
                borderWidth: 1,
                borderColor: "#ddd"
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
                  <View style={{ marginLeft: 20 }}>
                    {this.renderAllLocationsAsRadioButtons(this.state.accounts)}
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
              margin: 8,
              marginTop: -2
            }}
            Type="flat"
            onChangeText={text => this.onChangeText(text)}
            value={this.state.searchBarText}
            placeholder="Search by orderId."
            theme={{
              colors: {
                underlineColor: "transparent",
                background: "transparent",
                placeholder: "#3498db",
                text: "#3498db"
              },
              fontSize: 10
            }}
          />
        </View>
        <View style={{ flex: 7 }}>
          <DataTable style={{ paddingLeft: 15, paddingRight: 15 }}>
            <DataTable.Header>
              <DataTable.Title
                style={{
                  justifyContent: styles.dataTableText.justifyContent,
                  fontStyle: styles.dataTableTitle.fontStyle
                }}
              >
                S.No
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableText}>
                Account
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableText}>
                Code
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableText}>
                Balance
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {this.state.accountInfo.map((account, index) => {
                return (
                  <DataTable.Row
                    key={account.accNumber} // you need a unique key per item
                    onPress={() => {
                      // added to illustrate how you can make the row take the onPress event and do something
                      console.log(`selected account ${account.accNumber}`);
                    }}
                  >
                    <DataTable.Cell style={styles.dataTableText}>
                      {index}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.dataTableText}>
                      {account.accNumber}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.dataTableText}>
                      {account.productCode}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.dataTableText}>
                      {account.availBalance}
                    </DataTable.Cell>
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

CustomersScreen.navigationOptions = {
  title: "Customers",
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#1287A5",
    fontSize: 40
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
    fontStyle: "italic"
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
  }
});
