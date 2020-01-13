import React from "react";
import { StyleSheet, View, Text, ScrollView, Platform } from "react-native";
import { Searchbar, DataTable, Button, Colors, Card } from "react-native-paper";
import { userService } from "../services/userService";
import Moment from "moment";
import Loader from "../loader/LoaderScreen";

export default class TransactionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText: "",
      visible: false,
      customersListOfDetails: [],
      customerArray: [],
      isLoading: true,
      transactiontypeCount: []
    };
  }

  componentDidMount() {
    this.getCustomersAsync();
  }

  componentWillMount() {}

  changeTransactionType(id) {
    this.setState({
      isLoading: true
    });
    userService
      .GetTransactionByAgentId({
        agentId: 10,
        value: id
      })
      .then(
        userTransactionResponse => {
          console.log("userTransactionResponse", userTransactionResponse);
          this.setState({
            customersListOfDetails: userTransactionResponse.result,
            customerArray: userTransactionResponse,
            isLoading: false
          });
        },
        error => {
          console.log("error === ", error);
        }
      );
  }

  getCustomersAsync() {
    this.setState({
      isLoading: true
    });

    userService.getTransactionTypeCount(10).then(
      userCountResponse => {
        userService
          .GetTransactionByAgentId({
            agentId: 10,
            value: 1
          })
          .then(
            userTransactionResponse => {
              this.setState({
                transactiontypeCount: userCountResponse,
                customersListOfDetails: userTransactionResponse.result,
                customerArray: userTransactionResponse,
                isLoading: false
              });
            },
            error => {
              console.log("error === ", error);
            }
          );
      },
      error => {
        console.log("error === ", error);
      }
    );
  }

  ActivateRecord(recordId) {
    userService
      .ActivateRecord({
        Id: recordId,
        menuId: 1
      })
      .then(
        ActivateRecordResponse => {
          this.setState({
            isLoading: false
          });
          this.getCustomersAsync();
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
        <Loader loading={this.state.isLoading} />
        <View style={{ flex: Platform.OS === "ios" ? 0.5 : 0.8, marginTop: 5 }}>
          <View style={styles.paddingLeftTopRight}>
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
              inputStyle={{ fontSize: 14, fontWeight: "bold" }}
              style={styles.buttonContainer}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10
          }}
        >
          <Button
            mode="contained"
            style={styles.buttonContainerDropdown}
            contentStyle={{
              height: 40
            }}
            labelStyle={{
              fontSize: 13,
              color: Colors.white
            }}
            onPress={() => {
              this.changeTransactionType(1);
            }}
          >
            Record Added &nbsp;
            {this.state.transactiontypeCount[0]}
          </Button>
          <Button
            mode="contained"
            style={styles.buttonContainerDropdown}
            contentStyle={{
              height: 40
            }}
            labelStyle={{
              fontSize: 13,
              color: Colors.white
            }}
            onPress={() => this.changeTransactionType(2)}
          >
            Record Renew &nbsp;
            {this.state.transactiontypeCount[1]}
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            mode="contained"
            style={styles.buttonContainerDropdown}
            contentStyle={{
              height: 40
            }}
            labelStyle={{
              fontSize: 13,
              color: Colors.white
            }}
            onPress={() => this.changeTransactionType(3)}
          >
            Record Added+Renew &nbsp;
            {this.state.transactiontypeCount[2]}
          </Button>
        </View>
        <View style={{ flex: 7 }}>
          <Card
            style={{
              marginBottom: 10,
              marginRight: 10,
              marginLeft: 10
            }}
          >
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
                {this.state.customersListOfDetails.map((txn, index) => {
                  return (
                    <DataTable.Row
                      key={index} // you need a unique key per item
                    >
                      <DataTable.Cell style={styles.dataTableText}>
                        <Text style={{ color: "#32325d" }}>
                          {txn.CustomerId}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.dataTableText}>
                        <Text style={{ color: "#32325d" }}>
                          {Moment(txn.CreatedDate).format("DD/MM/YYYY")}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.dataTableText}>
                        <Text style={{ color: "#32325d" }}>{txn.Amount}</Text>
                      </DataTable.Cell>
                      <View style={styles.dataTableText}>
                        <Button
                          onPress={() => {
                            this.ActivateRecord(`${txn.RecordId}`);
                          }}
                        >
                          Activate
                        </Button>
                      </View>
                    </DataTable.Row>
                  );
                })}
              </ScrollView>
            </DataTable>
          </Card>
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
    fontSize: 14,
    color: "#626262",
    fontWeight: "bold"
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
  },
  buttonContainer: {
    height: 40,
    marginBottom: 10,
    borderRadius: 30,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#ffffff"
  },
  buttonContainerDropdown: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 30,
    backgroundColor: "#1287A5",
    marginRight: 1,
    marginTop: 15
  }
});
