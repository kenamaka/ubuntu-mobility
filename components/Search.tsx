import { Text, TouchableOpacity, View } from "react-native";
import SearchInput from "./SearchInput";
import { useLocationStore } from "@/store";
import { icons } from "@/constants";
import { useState } from "react";
import { router } from "expo-router";

const Search = () => {
  const { userAddress } = useLocationStore();
  const address = userAddress ?? undefined;
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState<
    "pickup" | "destination" | null
  >(null);

  return (
    <View className="mt-4 px-8">
      {/* <Text className="text-gray-500 text-xl mt-5 font-semibold mb-2">
        Pickup
      </Text> */}

      <View className="mt-6 px-8 relative">
        <Text className="text-2xl font-bold mb-5">Let's Get You Moving</Text>

        {/* Pickup Input */}
        <SearchInput
          initialLocation={address}
          handlePress={() => {}}
          icon={icons.point}
          containerStyle="mb-4"
          placeholder={address || "Select pickup location"}
        />

        {/* Destination Input */}
        <SearchInput
          initialLocation=""
          handlePress={() => {}}
          autoFocus
          icon={icons.target}
          containerStyle=""
          placeholder="Where are you going today?"
        />
      </View>
      <TouchableOpacity
        className="w-full mt-8 rounded-md flex flex-row justify-center p-4 items-center  bg-[#011228]"
        onPress={() => router.push("/root/find-ride")}
      >
        <Text className="text-lg font-bold text-white">Find Drivers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
