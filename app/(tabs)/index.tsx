import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
} from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-700">
      <Text className="text-3xl text-white font-bold text-center mt-10">
        Verify your phone
      </Text>
      <TextInput className="w-full" placeholder="Enter phone Number" />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
