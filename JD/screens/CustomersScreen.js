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
      radioSelected: 1
    };
  }
  onChangeText(text) {
    this.setState({ searchBarText: text });
  }
  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  radioClick(id) {
    this.setState({
      radioSelected: id
    });
    console.log("check id == ", id);
    this._hideDialog();
  }
  renderRadioButtons(accounts) {
    return accounts.map((val, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={this.radioClick.bind(this, val.accNumber)}
        >
          <View style={styles.radioButton}>
            {val.accNumber == this.state.radioSelected ? (
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
    var accounts = [
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
    ];
    const { checked } = this.state;
    const { visible, close } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Button onPress={this._showDialog}>Show Dialog</Button>
          <Portal>
            <Dialog onDismiss={close} visible={this.state.visible}>
              <Dialog.Title>Choose an option</Dialog.Title>
              <Dialog.ScrollArea
                style={{ maxHeight: 450, paddingHorizontal: 0 }}
              >
                <ScrollView>
                  <View>{this.renderRadioButtons(accounts)}</View>
                </ScrollView>
              </Dialog.ScrollArea>
              <Dialog.Actions>
                <Button onPress={this._hideDialog}>Cancel</Button>
                <Button onPress={this._hideDialog}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <View style={{ flex: 1 }}>
          <Searchbar
            style={{
              margin: 8
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
              }
            }}
          />
        </View>
        <View style={{ flex: 7 }}>
          <DataTable style={{ paddingLeft: 15, paddingRight: 15 }}>
            <DataTable.Header>
              <DataTable.Title style={styles.dataTableText}>
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
              {accounts.map((account, index) => {
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
