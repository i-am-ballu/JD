import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { DataTable, Switch } from "react-native-paper";
import { userService } from "../services/userService";

export default class ManageDistributorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distributorListOfDetails: []
    };
  }
  componentDidMount() {
    userService.manageDistributorGetAllUser().then(
      data => {
        this.setState({
          distributorListOfDetails: data.data
        });
      },
      error => {
        console.log("error === ", error);
      }
    );
  }
  toggle(index, user_id, status) {
    console.log(status);
    let newStatus = status == 0 ? 1 : 0;
    userService.manageDistributorSetUserStatus(user_id, newStatus).then(
      data => {
        let distributorListOfDetails = [...this.state.distributorListOfDetails];
        distributorListOfDetails[index].status = newStatus;
        this.setState({ distributorListOfDetails });
      },
      error => {
        console.log("error === ", error);
      }
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 8 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.dataTableText}>
                <Text style={styles.dataTableTitle}>Status</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableText}>
                <Text style={styles.dataTableTitle}>Name</Text>
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {this.state.distributorListOfDetails.map(
                (distributorList, index) => {
                  return (
                    <DataTable.Row
                      key={index} // you need a unique key per item
                    >
                      <View style={{ marginTop: 10 }}>
                        <Switch
                          trackColor={{ true: "blue", false: "grey" }}
                          value={distributorList.status == 1 ? true : false}
                          onValueChange={this.toggle.bind(
                            this,
                            index,
                            distributorList.user_id,
                            distributorList.status
                          )}
                        />
                      </View>
                      <DataTable.Cell numeric></DataTable.Cell>
                      <DataTable.Cell style={styles.dataTableText}>
                        {distributorList.Name}
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

ManageDistributorScreen.navigationOptions = {
  title: "Manage Distributor",
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
  dataTableText: {
    // justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingRight: 10
  },
  dataTableTitle: {
    fontSize: 15
  }
});
