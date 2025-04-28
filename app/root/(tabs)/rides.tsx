import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React from "react";
import mock_rides from "@/constants/mock_rides";
import { SafeAreaView } from "react-native-safe-area-context";
import RecentRideCard from "@/components/RecentRideCard";
import { images } from "@/constants";
import Loading from "@/components/Loading";

const rides = () => {
  const loading = false;
  return (
    <SafeAreaView className="bg-gray-200 flex-1 p-4  pt-10">
      <Text className="text-3xl font-bold text-gray-900 mb-4">
        Recent Rides
      </Text>
      <FlatList
        data={mock_rides?.slice(0, 5)}
        renderItem={({ item }) => <RecentRideCard ride={item} />}
        className=""
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => {
          return (
            <View className="flex-1 items-center justify-center">
              {!loading ? (
                <>
                  <Image
                    source={images.noResult}
                    className="w-40 h-40 "
                    resizeMode="contain"
                  />
                  <Text className="text-gray-500">No rides available</Text>
                </>
              ) : (
                <Loading />
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default rides;
