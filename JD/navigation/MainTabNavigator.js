import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import CustomersScreen from "../screens/CustomersScreen";
import TransactionScreen from "../screens/TransactionScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomerDetailsScreen from "../screens/CustomerDetailsScreen";
import ManageDistributorScreen from "../ProfileButton/ManageDistributorScreen";
import AddNewCutomerScreen from "../ProfileButton/AddNewCutomerScreen";
import AccountScreen from "../screens/AccountScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const CustomerStack = createStackNavigator(
  {
    CustomerStack: CustomersScreen,
    CustomerDetail: CustomerDetailsScreen
  },
  config
);

CustomerStack.navigationOptions = {
  tabBarLabel: "Customers",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

CustomerStack.path = "";

const TransactionStack = createStackNavigator(
  {
    TransactionStack: TransactionScreen
  },
  config
);
TransactionStack.navigationOptions = {
  tabBarLabel: "Transaction",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-checkmark-circle"
      }
    />
  )
};
TransactionStack.path = "";

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    ManageDistributor: ManageDistributorScreen,
    AddNewCustomer: AddNewCutomerScreen
  },
  config
);
ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen
  },
  config
);
AccountStack.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const tabNavigator = createBottomTabNavigator({
  CustomerStack,
  TransactionStack,
  AccountStack,
  ProfileStack
});

tabNavigator.path = "";

export default tabNavigator;
