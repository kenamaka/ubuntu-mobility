import { View, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function FindRide() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 60 : Constants.statusBarHeight + 10,
        backgroundColor: "#fff",
      }}
    >
      {/* Close Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: "absolute", top: 30, right: 20, zIndex: 10 }}
      >
        <Ionicons name="close" size={28} color="#000" />
      </TouchableOpacity>

      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <GooglePlacesAutocomplete
          placeholder="Destination"
          onPress={(data, details = null) => {
            console.log(data, details);
            router.back(); // Optional: go back to previous screen with result
          }}
          query={{
            key: "<YOUR_GOOGLE_API_KEY>",
            language: "en",
          }}
          fetchDetails
          enablePoweredByContainer={false}
          styles={{
            textInput: {
              height: 50,
              borderRadius: 8,
              fontSize: 16,
              backgroundColor: "#f0f0f0",
              paddingHorizontal: 12,
            },
          }}
        />
      </View>
    </View>
  );
}
