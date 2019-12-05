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

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const CustomerStack = createStackNavigator(
  {
    CustomerStack: CustomersScreen
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
  SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
