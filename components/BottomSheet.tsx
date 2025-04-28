import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function BottomSheetTest() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BottomSheet ref={bottomSheetRef} index={0} snapPoints={["40%", "85%"]}>
          <BottomSheetScrollView contentContainerStyle={styles.content}>
            <Text>🎉 This is the bottom sheet content!</Text>
            <Text>Swipe up to expand it.</Text>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 20,
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
});
