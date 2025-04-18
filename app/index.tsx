import { Redirect, router } from "expo-router";
import { ActivityIndicator, LogBox } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import React, { useEffect } from "react";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const index = () => {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/(auth)/onboarding");
    }
  }, [isLoaded]);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#ff6700" />
    </View>
  );
};

export default index;
