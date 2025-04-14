import { Redirect } from "expo-router";
import React, { Component } from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

export class Home extends Component {
  render() {
    return <Redirect href="/(auth)/onboarding" />;
  }
}

export default Home;
