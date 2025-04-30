import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Loading = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="w-[50px] h-[50px] rounded-full bg-[#defff0] items-center justify-center">
        <ActivityIndicator size="large" color="#ff6700" />
      </View>
    </SafeAreaView>
  );
};

export default Loading;
