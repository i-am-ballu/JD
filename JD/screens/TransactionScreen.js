import React from "react";
import { StyleSheet, View, Text, ScrollView, Platform } from "react-native";
import { Searchbar, DataTable, Button } from "react-native-paper";

export default class TransactionScreen extends React.Component {
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
          availBalance: "1000",
          date: "1-12-2019"
        },
        {
          accNumber: "2",
          accType: "D",
          productCode: "2",
          availBalance: "2000",
          date: "2-12-2019"
        },
        {
          accNumber: "3",
          accType: "D",
          productCode: "3",
          availBalance: "3000",
          date: "3-12-2019"
        },
        {
          accNumber: "4",
          accType: "D",
          productCode: "4",
          availBalance: "4000",
          date: "4-12-2019"
        },
        {
          accNumber: "5",
          accType: "D",
          productCode: "5",
          availBalance: "5000",
          date: "5-12-2019"
        },
        {
          accNumber: "6",
          accType: "D",
          productCode: "6",
          availBalance: "6000",
          date: "6-12-2019"
        },
        {
          accNumber: "7",
          accType: "D",
          productCode: "7",
          availBalance: "7000",
          date: "7-12-2019"
        },
        {
          accNumber: "8",
          accType: "D",
          productCode: "8",
          availBalance: "8000",
          date: "8-12-2019"
        },
        {
          accNumber: "9",
          accType: "D",
          productCode: "9",
          availBalance: "9000",
          date: "9-12-2019"
        },
        {
          accNumber: "10",
          accType: "D",
          productCode: "10",
          availBalance: "10000",
          date: "10-12-2019"
        },
        {
          accNumber: "11",
          accType: "D",
          productCode: "11",
          availBalance: "11000",
          date: "11-12-2019"
        },
        {
          accNumber: "12",
          accType: "D",
          productCode: "12",
          availBalance: "12000",
          date: "12-12-2019"
        },
        {
          accNumber: "13",
          accType: "D",
          productCode: "13",
          availBalance: "13000",
          date: "13-12-2019"
        },
        {
          accNumber: "14",
          accType: "D",
          productCode: "14",
          availBalance: "14000",
          date: "14-12-2019"
        },
        {
          accNumber: "15",
          accType: "D",
          productCode: "15",
          availBalance: "15000",
          date: "15-12-2019"
        },
        {
          accNumber: "16",
          accType: "D",
          productCode: "16",
          availBalance: "16000",
          date: "16-12-2019"
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
              {this.state.accountInfo.map((account, index) => {
                return (
                  <DataTable.Row
                    key={account.accNumber} // you need a unique key per item
                  >
                    <DataTable.Cell style={styles.dataTableText}>
                      {index}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.dataTableText}>
                      {account.date}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.dataTableText}>
                      {account.availBalance}
                    </DataTable.Cell>
                    <View style={styles.dataTableText}>
                      <Button
                        icon="camera"
                        style={{ width: 10 }}
                        onPress={() => {
                          // added to illustrate how you can make the row take the onPress event and do something
                          console.log(`selected account ${account.accNumber}`);
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
