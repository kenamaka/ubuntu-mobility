import { View, Text, FlatList } from "react-native";
import React from "react";
import mock_rides from "@/constants/mock_rides";
import { SafeAreaView } from "react-native-safe-area-context";
import RecentRideCard from "@/components/RecentRideCard";

const rides = () => {
  return (
    <SafeAreaView className="bg-gray-400">
      <FlatList
        data={mock_rides?.slice(0, 5)}
        renderItem={({ item }) => <RecentRideCard ride={item} />}
      />
    </SafeAreaView>
  );
};

export default rides;
