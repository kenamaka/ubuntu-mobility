import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mock_rides from "../../constants/mock_rides";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}
