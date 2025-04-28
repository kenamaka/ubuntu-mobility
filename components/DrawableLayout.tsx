// import { View, Text } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import * as Location from "expo-location";
// import { useLocationStore } from "@/store";
// import Map from "./Map";
// import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// const DrawableLayout = ({ children }: { children: React.ReactNode }) => {
//   const { setUserLocation } = useLocationStore();
//   const [userAddress, setUserAddress] = useState("");
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   useEffect(() => {
//     const requestLocation = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") return;

//       let location = await Location.getCurrentPositionAsync();
//       const address = await Location.reverseGeocodeAsync({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       });

//       setUserAddress(
//         `${address[0].name}, ${address[0].city}, ${address[0].region}, ${address[0].country}`
//       );

//       setUserLocation({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         address: `${address[0].name}, ${address[0].city}, ${address[0].region}, ${address[0].country}`,
//       });
//     };

//     requestLocation();
//   }, []);

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={{ flex: 1 }}>
//         <Map />

//         {/* Floating Address Label */}
//         <View
//           style={{
//             position: "absolute",
//             top: 16,
//             zIndex: 10,
//             paddingHorizontal: 16,
//           }}
//         >
//           <Text className="text-gray-900 text-lg font-bold ">
//             {userAddress}
//           </Text>
//         </View>

//         {/* Bottom Sheet */}
//         <BottomSheet
//           ref={bottomSheetRef}
//           index={0} // Set the initial index to open the sheet
//           snapPoints={["40%", "85%"]} // Adjust the snap points to suit your design
//         >
//           <BottomSheetScrollView style={{ padding: 20 }}>
//             {children}
//           </BottomSheetScrollView>
//         </BottomSheet>
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// export default DrawableLayout;
import { View, Text } from "react-native";
import { useRef, useState } from "react";
import MapView from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [mapRegion, setMapRegion] = useState(null);

  const handleMapDrag = () => {
    // Collapse the sheet when dragging the map
    bottomSheetRef.current?.snapToIndex(0); // 40%
  };

  const handleMapDragEnd = () => {
    // Expand the sheet after moving
    bottomSheetRef.current?.snapToIndex(1); // 85%
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          onPanDrag={handleMapDrag}
          onRegionChangeComplete={handleMapDragEnd}
          showsUserLocation
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={["40%", "85%"]}>
          <BottomSheetScrollView
            contentContainerStyle={{ alignItems: "center", padding: 20 }}
          >
            <View>
              <Text>🎉 This is the bottom sheet content!</Text>
              <Text>Swipe up to expand it.</Text>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
