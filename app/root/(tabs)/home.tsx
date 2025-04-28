import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mock_rides from "../../../constants/mock_rides";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import DrawableLayout from "@/components/DrawableLayout";
import BottomSheet from "@/components/BottomSheet";
import HomeScreen from "@/components/DrawableLayout";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Home() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Map />
          <BottomSheet />
          {/* <HomeScreen /> */}
        </View>
      </GestureHandlerRootView>
    </>
  );
}
