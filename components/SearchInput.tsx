import { View } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

export default function SearchInput() {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mx-4 my-3">
      <Ionicons name="search" size={20} color="#888" className="mr-2" />
      <BottomSheetTextInput
        placeholder="Search location"
        placeholderTextColor="#888"
        className="flex-1 text-base text-black"
      />
    </View>
  );
}
