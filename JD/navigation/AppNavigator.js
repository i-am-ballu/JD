import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoadingScreen from "./LoadingScreen";
import MainTabNavigator from "./MainTabNavigator";
import SettingScreen from "../screens/SettingsScreen";
import LoginScreen from "../loginRegister/LoginScreen";
import PinScreen from "../pin/PinScreen";
import CustomerDetailsScreen from "../screens/CustomerDetailsScreen";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    LoadingScreen,
    PinScreen,
    CustomerDetailsScreen,
    MainTabNavigator,
    LoginScreen
  })
);
