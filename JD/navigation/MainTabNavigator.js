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
    AddNewCutomer: AddNewCutomerScreen
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

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  { initialRouteName: "Links" },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

LinksStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  CustomerStack,
  TransactionStack,
  LinksStack,
  SettingsStack,
  ProfileStack
});

tabNavigator.path = "";

export default tabNavigator;
