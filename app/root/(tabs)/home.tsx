// import {
//   View,
//   Text,
//   Dimensions,
//   Animated,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useState, useRef } from "react";
// import Map from "@/components/Map";
// import BottomSheetTest from "@/components/BottomSheet";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useLocationStore } from "@/store";
// import { images } from "@/constants";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// export default function Home() {
//   const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
//   const pointerTranslateY = useRef(new Animated.Value(0)).current;
//   const recenterRef = useRef<() => void>(null);
//   const { userAddress } = useLocationStore();
//   const address = userAddress ?? "Loading";

//   const handleSheetChange = (index: number) => {
//     setBottomSheetIndex(index);

//     let pointerY = 0;
//     if (index === 0) pointerY = SCREEN_HEIGHT * 0.4;
//     if (index === 1) pointerY = SCREEN_HEIGHT * 0.2;

//     Animated.timing(pointerTranslateY, {
//       toValue: pointerY,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     // <GestureHandlerRootView style={{ flex: 1 }}>
//     <SafeAreaView style={{ flex: 1 }}>
//       <View className="absolute top-20 left-0 right-0 px-5 flex-row justify-between items-center z-20">
//         <TouchableOpacity
//           onPress={() => console.log("Menu pressed")}
//           style={{
//             backgroundColor: "white",
//             padding: 12,
//             borderRadius: 28,
//             shadowColor: "#000",
//             shadowOpacity: 0.1,
//             shadowOffset: { width: 0, height: 2 },
//             shadowRadius: 6,
//           }}
//         >
//           <Ionicons name="menu" size={30} color="#000" />
//         </TouchableOpacity>
//         <View className="flex flex-col items-end  justify-end">
//           <Image source={images.gps} className="w-8 h-8" resizeMode="contain" />
//           <Text className="text-dark text-lg font-bold">{address}</Text>
//         </View>
//       </View>

//       {/* Fullscreen Map */}
//       {/* <Map onRecenterRef={(fn) => (recenterRef.current = fn)} /> */}
//       <View
//         style={{
//           height: Dimensions.get("window").height * 0.4,
//           width: "100%",
//           borderBottomLeftRadius: 30,
//           borderBottomRightRadius: 30,
//           overflow: "hidden",
//         }}
//       >
//         <Map onRecenterRef={(fn) => ((recenterRef as any).current = fn)} />

//         {/* Recenter Button ON TOP OF MAP */}
//         <TouchableOpacity
//           onPress={() => recenterRef.current?.()}
//           style={{
//             position: "absolute",
//             bottom: 20,
//             right: 20,
//             backgroundColor: "white",
//             padding: 12,
//             borderRadius: 28,
//             shadowColor: "#000",
//             shadowOpacity: 0.1,
//             shadowOffset: { width: 0, height: 2 },
//             shadowRadius: 6,
//             elevation: 4,
//             zIndex: 30,
//           }}
//         >
//           <Ionicons name="locate" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       {/* other side  */}
//       {/* <View
//         style={{
//           height: Dimensions.get("window").height * 0.6,
//           width: "100%",
//           borderBottomLeftRadius: 30,
//           borderBottomRightRadius: 30,
//           overflow: "hidden",
//         }}
//         className="bg-gray-50 rounded-lg"
//       ></View> */}
//       {/* Bottom Sheet */}
//       <BottomSheetTest onSheetChange={handleSheetChange} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pointerContainer: {
//     position: "absolute",
//     top: 100,
//     left: "50%",
//     marginLeft: -20,
//     zIndex: 10,
//   },
//   pointer: {
//     width: 40,
//     height: 40,
//   },
// });

import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useRef, useEffect } from "react";
import Map from "@/components/Map";
import BottomSheetTest from "@/components/BottomSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocationStore } from "@/store";
import { images } from "@/constants";

const Home = () => {
  const [bottomSheetIndex, setBottomSheetIndex] = useState(1);
  const recenterRef = useRef<() => void>(null); // ✅ Declare it here
  const animatedHeight = useRef(
    new Animated.Value(Dimensions.get("window").height * 0.4)
  ).current;

  const snapPoints = ["40%", "60%"];
  useEffect(() => {
    const heightMap = {
      0: 0.89,
      1: 0.6,
      2: 0.4,
      // 3: 0.15,
    } as const;

    const toValue =
      Dimensions.get("window").height *
      (heightMap[bottomSheetIndex as 0 | 1 | 2] ?? 0.4);

    // Dimensions.get("window").height * (heightMap[bottomSheetIndex] ?? 0.4);

    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false, // height can't be animated with native driver
    }).start();
  }, [bottomSheetIndex]);

  // Convert the current snap point to a map height multiplier
  const mapHeightMultiplier =
    {
      0: 0.89,
      1: 0.6,
      2: 0.4,
      // 3: 0.15,
    }[bottomSheetIndex] ?? 0.7; // Default to 0.4 if index is not found
  const { userAddress } = useLocationStore();
  const address = userAddress ?? "Loading";

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: Dimensions.get("window").height * mapHeightMultiplier,
          width: "100%",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <View className="absolute top-20 left-0 right-0 px-5 flex-row justify-between items-center z-20">
          <TouchableOpacity
            onPress={() => console.log("Menu pressed")}
            style={{
              backgroundColor: "white",
              padding: 12,
              borderRadius: 28,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
            }}
          >
            <Ionicons name="menu" size={30} color="#000" />
          </TouchableOpacity>
          <View className="flex flex-col items-end  justify-end">
            <Image
              source={images.gps}
              style={{
                width: 20, // equivalent to w-5 in Tailwind (5 * 4px = 20px)
                height: 20, // equivalent to h-5 in Tailwind
                transform: [{ skewX: "-6deg" }], // Applying skew here
              }}
              resizeMode="contain"
            />
            <Text className="text-dark text-lg font-bold">{address}</Text>
          </View>
        </View>
        <Animated.View
          style={{
            height: animatedHeight,
            width: "100%",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Map onRecenterRef={(fn) => ((recenterRef as any).current = fn)} />
          {/* Recenter button... */}
        </Animated.View>

        {/* <Map onRecenterRef={(fn) => ((recenterRef as any).current = fn)} /> */}

        <TouchableOpacity
          onPress={() => recenterRef.current?.()}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "white",
            padding: 12,
            borderRadius: 28,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 4,
            zIndex: 30,
          }}
        >
          <Ionicons name="locate" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <BottomSheetTest
        snapPoints={snapPoints}
        onSheetChange={(index) => setBottomSheetIndex(index)}
        address={address}
      />
    </View>
  );
};
export default Home;
