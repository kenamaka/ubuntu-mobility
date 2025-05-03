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
// import { useState, useRef, useEffect } from "react";
// import Map from "@/components/Map";
// import BottomSheetTest from "@/components/BottomSheet";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useLocationStore } from "@/store";
// import { images } from "@/constants";

// const Home = () => {
//   const [bottomSheetIndex, setBottomSheetIndex] = useState(1);
//   const recenterRef = useRef<() => void>(null); // ✅ Declare it here
//   const animatedHeight = useRef(
//     new Animated.Value(Dimensions.get("window").height * 0.6)
//   ).current;

//   const snapPoints = ["34%", "95%"];
//   useEffect(() => {
//     const heightMap = {
//       0: 0.8,
//       1: 0.6,
//       2: 0.4,
//     } as const;

//     const toValue =
//       Dimensions.get("window").height *
//       (heightMap[bottomSheetIndex as 0 | 1 | 2] ?? 0.6);

//     // Dimensions.get("window").height * (heightMap[bottomSheetIndex] ?? 0.4);

//     Animated.timing(animatedHeight, {
//       toValue,
//       duration: 300,
//       useNativeDriver: false, // height can't be animated with native driver
//     }).start();
//   }, [bottomSheetIndex]);

//   // Convert the current snap point to a map height multiplier
//   const mapHeightMultiplier =
//     {
//       0: 0.89,
//       1: 0.6,
//       2: 0.4,
//       // 3: 0.15,
//     }[bottomSheetIndex] ?? 0.7; // Default to 0.4 if index is not found
//   const { userAddress } = useLocationStore();
//   const address = userAddress ?? "Loading";

//   return (
//     <View style={{ flex: 1 }} className="bg-white">
//       <View
//         style={{
//           height: Dimensions.get("window").height * mapHeightMultiplier,
//           width: "100%",
//           borderBottomLeftRadius: 30,
//           borderBottomRightRadius: 30,
//           overflow: "hidden",
//           position: "relative",
//         }}
//       >
//         <View className="absolute top-20 left-0 right-0 px-5 flex-row justify-between items-center z-20">
//           <TouchableOpacity
//             onPress={() => console.log("Menu pressed")}
//             style={{
//               backgroundColor: "white",
//               padding: 12,
//               borderRadius: 28,
//               shadowColor: "#000",
//               shadowOpacity: 0.1,
//               shadowOffset: { width: 0, height: 2 },
//               shadowRadius: 6,
//             }}
//           >
//             <Ionicons name="menu" size={30} color="#000" />
//           </TouchableOpacity>
//           <View className="flex flex-col items-end  justify-end">
//             <Image
//               source={images.gps}
//               style={{
//                 width: 20, // equivalent to w-5 in Tailwind (5 * 4px = 20px)
//                 height: 20, // equivalent to h-5 in Tailwind
//                 transform: [{ skewX: "-6deg" }], // Applying skew here
//               }}
//               resizeMode="contain"
//             />
//             <Text className="text-dark text-lg font-bold">{address}</Text>
//           </View>
//         </View>
//         <Animated.View
//           style={{
//             height: animatedHeight,
//             width: "100%",
//             borderBottomLeftRadius: 30,
//             borderBottomRightRadius: 30,
//             overflow: "hidden",
//             position: "relative",
//           }}
//         >
//           <Map onRecenterRef={(fn) => ((recenterRef as any).current = fn)} />
//           {/* Recenter button... */}
//         </Animated.View>

//         {/* <Map onRecenterRef={(fn) => ((recenterRef as any).current = fn)} /> */}

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

//       <BottomSheetTest
//         snapPoints={snapPoints}
//         onSheetChange={(index) => setBottomSheetIndex(index)}
//         address={address}
//       />
//     </View>
//   );
// };
// export default Home;

import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router"; // Keep this
import BottomSheetTest from "@/components/BottomSheet";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";
import { images } from "@/constants";
import { useTabBarStore } from "@/store";
const Home = () => {
  const [bottomSheetIndex, setBottomSheetIndex] = useState(1);
  const recenterRef = useRef<() => void>(null);
  const animatedHeight = useRef(
    new Animated.Value(Dimensions.get("window").height * 0.6)
  ).current;

  const snapPoints = ["34%", "95%"];
  const navigation = useNavigation(); // Use this for navigation

  const { userAddress } = useLocationStore();
  const address = userAddress ?? "Loading";

  // Animate map height when bottom sheet index changes
  useEffect(() => {
    const heightMap = {
      0: 0.8,
      1: 0.6,
      2: 0.4,
    } as const;

    const toValue =
      Dimensions.get("window").height *
      (heightMap[bottomSheetIndex as 0 | 1 | 2] ?? 0.6);

    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [bottomSheetIndex]);

  // Dynamically hide tab bar when at snap point 95% (index 1)
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle:
        bottomSheetIndex === 1
          ? { display: "none" }
          : {
              borderRadius: 50,
              overflow: "hidden",
              marginHorizontal: 20,
              marginBottom: 20,
              height: 68,
              backgroundColor: "#fff",
              paddingTop: 10,
              paddingBottom: 10,
            },
    });
  }, [bottomSheetIndex, navigation]);
  useEffect(() => {
    if (bottomSheetIndex === 2) {
      useTabBarStore.getState().setTabBarVisible(false);
    } else {
      useTabBarStore.getState().setTabBarVisible(true);
    }
  }, [bottomSheetIndex]);
  // Convert snap index to map height multiplier
  const mapHeightMultiplier =
    {
      0: 0.89,
      1: 0.6,
      2: 0.4,
    }[bottomSheetIndex] ?? 0.7;

  return (
    <View style={{ flex: 1 }} className="bg-white">
      {/* Map Container */}
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
        {/* Top Controls */}
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

          <View className="flex flex-col items-end justify-end">
            <Image
              source={images.gps}
              style={{
                width: 20,
                height: 20,
                transform: [{ skewX: "-6deg" }],
              }}
              resizeMode="contain"
            />
            <Text className="text-dark text-lg font-bold">{address}</Text>
          </View>
        </View>

        {/* Animated Map View */}
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
        </Animated.View>

        {/* Recenter Button */}
        <TouchableOpacity
          onPress={() => recenterRef.current?.()}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "white",
            padding: 10,
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

      {/* Bottom Sheet */}
      <BottomSheetTest
        snapPoints={snapPoints}
        onSheetChange={(index) => setBottomSheetIndex(index)}
        address={address}
        // isSearchMode={bottomSheetIndex === 1} // optional for input auto-focus
      />
    </View>
  );
};

export default Home;
