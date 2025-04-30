// import React, { useRef } from "react";
// import { StyleSheet, Text } from "react-native";
// import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// type BottomSheetTestProps = {
//   onSheetChange?: (index: number) => void;
// };

// export default function BottomSheetTest({
//   onSheetChange,
// }: BottomSheetTestProps) {
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   return (
//     <BottomSheet
//       ref={bottomSheetRef}
//       index={1}
//       snapPoints={["60%"]}
//       onChange={(index) => {
//         if (onSheetChange) {
//           onSheetChange(index);
//         }
//       }}
//     >
//       <BottomSheetScrollView contentContainerStyle={styles.content}>
//         <Text>🎉 This is the bottom sheet content!</Text>
//         <Text>Swipe up to expand it.</Text>
//       </BottomSheetScrollView>
//     </BottomSheet>
//   );
// }

// const styles = StyleSheet.create({
//   content: {
//     alignItems: "center",
//     padding: 20,
//   },
// });

import { images } from "@/constants";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SearchInput from "./SearchInput";
type BottomSheetTestProps = {
  onSheetChange?: (index: number) => void;
  snapPoints: string[]; // Add this
  address: string;
};

export default function BottomSheetTest({
  onSheetChange,
  snapPoints,
  address,
}: BottomSheetTestProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      index={1}
      enablePanDownToClose={false}
      enableContentPanningGesture={true}
      enableHandlePanningGesture={true}
      ref={bottomSheetRef}
      onChange={(index) => {
        if (onSheetChange) {
          onSheetChange(index);
        }
      }}
    >
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        <View className="flex flex-row items-center  justify-end top-10">
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

        {/* <BottomSheetTextInput style={styles.input} /> */}
        <SearchInput />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    padding: 6,
  },
  input: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
  },
});
