// AIzaSyCSC72eAVNUytubCmNFw05LM6N7W9z-HMw
// AIzaSyAN728ZmLLgxZb7_NybRpVp68Z0GUmV7oA;
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GoogleInputProps } from "@/types/types";
import { Image } from "react-native";
import { icons } from "@/constants";

const GOOGLE_API_KEY = "AIzaSyCSC72eAVNUytubCmNFw05LM6N7W9z-HMw";
export default function SearchInput({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) {
  return (
    <View
      className={`flex flex-row justify-center items-center z-50 mb-5 ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where are you going today?"
        debounce={200}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{ key: GOOGLE_API_KEY, language: "en" }}
        textInputProps={{
          placeholderTextColor: "#000",
          autoCapitalize: "none",
          autoCorrect: false,
          returnKeyType: "search",
          clearButtonMode: "while-editing",
          enablesReturnKeyAutomatically: true,
          placeholder: initialLocation ?? "Where are you going today?",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6 ">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        styles={{
          container: {
            flexGrow: 1,
            flexShrink: 1,
            width: "100%",
          },
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 16,
            backgroundColor: "#f3f4f6",
            borderRadius: 6, // rounded-sm
            padding: 6, // reduced padding
            marginTop: 5,
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "#f3f4f6",
            fontSize: 16, // smaller font
            fontWeight: "500",
            borderRadius: 6, // rounded-sm
            color: "#000",
            width: "100%",
            paddingVertical: 10, // smaller padding
            paddingHorizontal: 12,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "#fff",
            borderRadius: 6,
            zIndex: 99,
          },
        }}
      />
    </View>
  );
}
