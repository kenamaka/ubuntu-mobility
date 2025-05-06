import { View, Image, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GoogleInputProps } from "@/types/types";
import { icons } from "@/constants";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const GOOGLE_API_KEY = "AIzaSyCSC72eAVNUytubCmNFw05LM6N7W9z-HMw";

export default function SearchInput({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
  autoFocus = false,
  placeholder,
}: GoogleInputProps & { autoFocus?: boolean; placeholder?: string }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(initialLocation ?? "");
  const [noResult, setNoResult] = useState(false);

  return (
    <View
      className={`flex flex-row justify-center items-center z-50 mb-5 ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder={placeholder || "Where are you going today?"}
        debounce={200}
        onFail={(error) => {
          console.warn("GooglePlacesAutocomplete error: ", error);
          setNoResult(true);
        }}
        onPress={(data, details = null) => {
          const address = data.description;
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address,
          });
          setInputValue(address);
        }}
        query={{ key: GOOGLE_API_KEY, language: "en" }}
        textInputProps={{
          placeholderTextColor: "#ccc",
          autoCapitalize: "none",
          autoCorrect: false,
          returnKeyType: "search",
          clearButtonMode: "never",
          enablesReturnKeyAutomatically: true,
          value: inputValue,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
          onChangeText: (text) => setInputValue(text),
          autoFocus,
        }}
        renderRightButton={() =>
          inputValue.length > 0 ? (
            <Ionicons
              name="close-circle"
              size={20}
              color="#011228"
              style={{ marginRight: 8 }}
              onPress={() => setInputValue("")}
            />
          ) : (
            <View style={{ width: 20, marginRight: 8 }} /> // empty space to keep layout consistent
          )
        }
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon}
              className="w-6 h-6 ml-3"
              resizeMode="contain"
            />
          </View>
        )}
        renderRow={(rowData: any) => {
          const title = rowData.structured_formatting?.main_text;
          const address = rowData.structured_formatting?.secondary_text;
          const types = rowData.types || [];

          let iconName = "location-outline";

          if (types.includes("restaurant")) iconName = "restaurant-outline";
          else if (types.includes("route")) iconName = "map-outline";
          else if (types.includes("locality")) iconName = "business-outline";
          else if (types.includes("establishment")) iconName = "pin-outline";
          else if (types.includes("church")) iconName = "pin-outline";

          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Ionicons
                name={iconName as keyof typeof Ionicons.glyphMap}
                size={18}
                color="#555"
                style={{ marginRight: 12 }}
              />
              <View>
                <Text style={{ fontWeight: "500", color: "#000" }}>
                  {title}
                </Text>
                {address && (
                  <Text style={{ color: "#555", fontSize: 12 }}>{address}</Text>
                )}
              </View>
            </View>
          );
        }}
        styles={{
          container: {
            flexGrow: 1,
            flexShrink: 1,
            width: "100%",
          },
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isFocused
              ? textInputBackgroundColor || "#fff"
              : "#f3f4f6",
            borderRadius: 6,
            paddingHorizontal: 12,
            marginTop: 5,
            borderWidth: 2,
            borderColor: isFocused ? "#ff6700" : "transparent",
          },
          textInput: {
            backgroundColor: isFocused
              ? textInputBackgroundColor || "#fff"
              : "#f3f4f6",
            fontSize: 14,
            fontWeight: "500",
            color: "#000",
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 10,
          },
          listView: {
            position: "absolute",
            top: autoFocus ? 80 : 150, // adjust based on height of both input fields
            left: 0,
            right: 0,
            backgroundColor: textInputBackgroundColor || "#fff",
            borderRadius: 6,
            zIndex: 999, // ensure it's above everything
            maxHeight: 250,
          },
        }}
      />
      {noResult && (
        <View className="items-center mt-4">
          <Image
            source={icons.notfound}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
          <Text className="text-red-500 mt-2 text-center">
            We couldn't find that location. Try another search.
          </Text>
        </View>
      )}
    </View>
  );
}
