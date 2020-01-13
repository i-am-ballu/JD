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
  Portal,
  Card
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
      userTransactionListOfDetails: [],
      userTransaction: [],
      manageDistributorList: [],
      isLoading: true,
      visibleAgents: false,
      initialSelectedLocation: 0
    };
  }

  componentDidMount() {
    this.getAllManageDistributor();
  }

  componentWillMount() {}

  async getAllManageDistributor() {
    userService.manageDistributorGetAllUser().then(
      distributorData => {
        this.setState({ manageDistributorList: distributorData.data });
        let Name = distributorData.data[0].Name;
        let user_id = distributorData.data[0].status;
        this.setState({
          placeholderForSelectCity: Name
        });
        userService
          .GetTransactionByAgentId({
            agentId: 10,
            value: user_id
          })
          .then(
            userTransactionResponse => {
              this.setState({
                userTransactionListOfDetails: userTransactionResponse.result,
                userTransaction: userTransactionResponse.result,
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
      this.state.userTransaction.filter(item => {
        if (item.CustomerId == text) {
          this.setState({
            userTransactionListOfDetails: [item]
          });
        }
      });
    } else {
      this.state.userTransactionListOfDetails = this.state.userTransaction;
    }
    this.setState({ searchBarText: text });
  }
  renderAllLocationsAsRadioButtons(userTransaction) {
    return this.state.manageDistributorList.map((val, index) => {
      console.log("val", val);

      return (
        <TouchableOpacity
          key={index}
          onPress={this.selectSingleLocation.bind(this, val.Name, val.status)}
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
            {val.Name}
          </Text>
        </TouchableOpacity>
      );
    });
  }
  selectSingleLocation(name, user_id) {
    this.setState({
      isLoading: true
    });
    // console.log("Address", Address);
    userService
      .GetTransactionByAgentId({
        agentId: 10,
        value: user_id
      })
      .then(
        userTransactionResponse => {
          this.setState({
            userTransactionListOfDetails: userTransactionResponse.result,
            userTransaction: userTransactionResponse.result,
            isLoading: false
          });
        },
        error => {
          console.log("error", error);
        }
      );

    this.setState({
      initialSelectedLocation: user_id,
      placeholderForSelectCity: name
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
              <Dialog
                onDismiss={closeAgents}
                visible={this.state.visibleAgents}
              >
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
                    <View style={{ marginLeft: 20, paddingBottom: 20 }}>
                      {this.renderAllLocationsAsRadioButtons(
                        this.state.userTransaction
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
              <DataTable
                style={{
                  justifyContent: "flex-start"
                }}
              >
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
                  {this.state.userTransactionListOfDetails.map((txn, index) => {
                    return (
                      <DataTable.Row
                        key={index} // you need a unique key per item
                      >
                        <DataTable.Cell style={styles.dataTableText}>
                          <Text
                            style={{
                              color: "#32325d",
                              justifyContent: "flex-start"
                            }}
                          >
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
    fontSize: 14,
    color: "#626262",
    fontWeight: "bold"
  },
  picker: {
    width: 100
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
  }
});
