import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { DataTable, Switch } from "react-native-paper";
import { userService } from "../services/userService";

export default class ManageDistributorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distributorListOfDetails: [
        { text: "test", toggled: false },
        { text: "test", toggled: false },
        { text: "test", toggled: false }
      ]
    };
  }
  toggle(index, e) {
    const distributorListOfDetails = [...this.state.distributorListOfDetails];
    distributorListOfDetails[index].toggled = !distributorListOfDetails[index]
      .toggled;
    this.setState({ distributorListOfDetails });
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
              {this.state.distributorListOfDetails.map((customer, index) => {
                return (
                  <DataTable.Row
                    key={index} // you need a unique key per item
                  >
                    <View style={{ marginTop: 10 }}>
                      <Switch
                        trackColor={{ true: "blue", false: "grey" }}
                        value={customer.toggled}
                        onValueChange={this.toggle.bind(this, index)}
                      />
                    </View>
                    <DataTable.Cell numeric></DataTable.Cell>
                    <DataTable.Cell style={styles.dataTableText}>
                      {customer.text}
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

ManageDistributorScreen.navigationOptions = {
  title: "Profile",
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
