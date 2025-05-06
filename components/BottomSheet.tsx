import { icons, images } from "@/constants";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Search from "./Search";

type BottomSheetTestProps = {
  onSheetChange?: (index: number) => void;
  snapPoints: string[]; // ["40%", "60%", "95%"]
  address: string;
};

export default function BottomSheetTest({
  onSheetChange,
  snapPoints,
  address,
}: BottomSheetTestProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSearchPress = () => {
    setIsSearchMode(true);
    bottomSheetRef.current?.snapToIndex(2); // 95% height
  };

  const handleSheetChange = (index: number) => {
    if (onSheetChange) onSheetChange(index);
    if (index === 2 && !isSearchMode) {
      setIsSearchMode(true); // Show search inputs when sheet is fully expanded
    }
    if (index <= 1 && isSearchMode) {
      setIsSearchMode(false); // Hide search inputs when sheet is not expanded
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1} // Default index to 60%
      enablePanDownToClose={false}
      enableContentPanningGesture={true}
      enableHandlePanningGesture={true}
      onChange={handleSheetChange}
    >
      <BottomSheetView style={styles.content}>
        {/* If not in search mode, show location/address input */}
        {!isSearchMode ? (
          <>
            {/* <View style={styles.addressContainer}>
              <Image
                source={images.gps}
                style={styles.gpsIcon}
                resizeMode="contain"
              />
              <Text style={styles.addressText}>{address}</Text>
            </View> */}

            <View className="mx-4 my-4 w-full">
              <TouchableOpacity
                onPress={handleSearchPress}
                className=" w-full  rounded-md flex-row items-center p-4 bg-gray-100 "
              >
                <Image
                  source={icons.search}
                  className="w-6 h-6 "
                  resizeMode="contain"
                />
                <Text className="text-xl font-bold text-gray-300">
                  {" "}
                  Where are you going today?
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          // If in search mode, show pickup/destination inputs
          <View className="mx-4 my-4 w-full">
            <Search />
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    padding: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  gpsIcon: {
    width: 20,
    height: 20,
    transform: [{ skewX: "-6deg" }],
  },
  addressText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchButton: {
    marginHorizontal: 16,
    marginTop: 16,
    width: "100%",
  },
  searchButtonContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: "#555",
    fontSize: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    width: "100%",
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputLabel: {
    color: "#555",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    padding: 12,
    marginBottom: 16,
  },
});
