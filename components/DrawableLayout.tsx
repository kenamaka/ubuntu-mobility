import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { useLocationStore } from "@/store";
import Map from "./Map";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const DrawableLayout = ({ children }: { children: React.ReactNode }) => {
  const { setUserLocation } = useLocationStore();
  const [userAddress, setUserAddress] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserAddress(
        `${address[0].name}, ${address[0].city}, ${address[0].region}, ${address[0].country}`
      );

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].city}, ${address[0].region}, ${address[0].country}`,
      });
    };

    requestLocation();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Map />

        {/* Floating Address Label */}
        <View
          style={{
            position: "absolute",
            top: 16,
            zIndex: 10,
            paddingHorizontal: 16,
          }}
        >
          <Text className="text-gray-900 text-lg font-bold ">
            {userAddress}
          </Text>
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0} // Set the initial index to open the sheet
          snapPoints={["40%", "85%"]} // Adjust the snap points to suit your design
        >
          <BottomSheetScrollView style={{ padding: 20 }}>
            {children}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
