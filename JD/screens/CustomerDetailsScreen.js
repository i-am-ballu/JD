import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { DataTable, Colors, ListItem } from "react-native-paper";
import Loader from "../loader/LoaderScreen";
import { userService } from "../services/userService";

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerDetailArray: [],
      isLoading: true
    };
    const customerDetail = this.props.navigation.getParam(
      "text",
      "nothing sent"
    );
    console.log("customerDetail", customerDetail);
    this.state.customerDetailArray.push(customerDetail);
    console.log("customerDetailArray", this.state.customerDetailArray);
    this.state.isLoading = false;
  }
  componentDidMount() {
    // this.getCustomersAsync();
    // console.log("accountInfo", this.state.customersListOfDetails);
  }

  componentWillMount() {
    // this.state.customersListOfDetails = this.state.customerArray;
    // console.log("accountInfo", this.state.customerArray);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={this.state.isLoading} />
        <View style={{ flex: 0.5 }}></View>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.brown200
          }}
        >
          <View>
            {this.state.customerDetailArray.map(x => (
              <Text
                key={x.Id}
                style={{ fontSize: 16, lineHeight: 30, textAlign: "center" }}
              >
                {x.Address}
              </Text>
            ))}
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: Colors.brown400 }}></View>
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
  dataTableText: {
    // justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingRight: 10
  },
  dataTableTitle: {
    fontSize: 15
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
