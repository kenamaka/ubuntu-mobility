// import { View, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import mock_rides from "../../../constants/mock_rides";
// import Map from "@/components/Map";
// import { useLocationStore } from "@/store";
// import { useEffect, useState } from "react";
// import * as Location from "expo-location";
// // import DrawableLayout from "@/components/DrawableLayout";
// import BottomSheet from "@/components/BottomSheet";
// // import HomeScreen from "@/components/DrawableLayout";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function Home() {
//   return (
//     <>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <View style={{ flex: 1 }}>
//           <Map />
//           <BottomSheet />
//           {/* <HomeScreen /> */}
//         </View>
//       </GestureHandlerRootView>
//     </>
//   );
// }

import { View, Dimensions, Animated } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useRef } from "react";

import Map from "@/components/Map";
import BottomSheetTest from "@/components/BottomSheet";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Home() {
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const mapTranslateY = useRef(new Animated.Value(0)).current;

  const handleSheetChange = (index: number) => {
    setBottomSheetIndex(index);

    let translateValue = 0;

    if (index === 0) {
      translateValue = -20; // push map up slightly when BottomSheet at 60%
    } else if (index === 1) {
      translateValue = -50; // push map up more when BottomSheet at 85%
    }

    Animated.timing(mapTranslateY, {
      toValue: translateValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Map View with slight translation */}
        <Animated.View
          style={{ flex: 1, transform: [{ translateY: mapTranslateY }] }}
        >
          <Map />
        </Animated.View>

        {/* Bottom Sheet */}
        <BottomSheetTest onSheetChange={handleSheetChange} />
      </View>
    </GestureHandlerRootView>
  );
}
