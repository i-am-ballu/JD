import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { TextInput, Searchbar, DataTable } from "react-native-paper";
import { MonoText } from "../components/StyledText";

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText: ""
    };
  }
  onChangeText(text) {
    this.setState({ searchBarText: text });
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
      }
    ];
    return (
      <View style={styles.container}>
        <View>
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
        <ScrollView>
          <DataTable style={{ margin: 8 }}>
            <DataTable.Header style={{ colors: "#3498db" }}>
              <DataTable.Title>Account</DataTable.Title>
              <DataTable.Title>Code</DataTable.Title>
              <DataTable.Title>Balance</DataTable.Title>
            </DataTable.Header>
            {accounts.map(account => {
              return (
                <DataTable.Row
                  key={account.accNumber} // you need a unique key per item
                  onPress={() => {
                    // added to illustrate how you can make the row take the onPress event and do something
                    console.log(`selected account ${account.accNumber}`);
                  }}
                >
                  <DataTable.Cell>{account.accNumber}</DataTable.Cell>
                  <DataTable.Cell>{account.productCode}</DataTable.Cell>
                  <DataTable.Cell>{account.availBalance}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </ScrollView>
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
  }
});
