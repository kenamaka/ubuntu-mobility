import { Redirect, router } from "expo-router";
import { ActivityIndicator, LogBox } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/components/Loading";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const index = () => {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      router.replace("/root/(tabs)/home");
    } else {
      router.replace("/root/(auth)/onboarding");
    }
  }, [isLoaded]);
  return <Loading />;
};

export default index;
