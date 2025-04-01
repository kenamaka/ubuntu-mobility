import { Redirect } from "expo-router";
import React, { Component } from "react";

export class Home extends Component {
  render() {
    return <Redirect href="/(root)/(auth)/onboarding" />;
  }
}

export default Home;
