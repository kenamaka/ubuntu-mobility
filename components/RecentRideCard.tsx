import { View, Text, Image } from "react-native";
import React from "react";
import { Ride } from "@/types/types";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/utils/utils";

const RecentRideCard = ({
  ride: {
    driver,
    destination_latitude,
    destination_longitude,
    origin_address,
    destination_address,
    ride_time,
    // payment_status,
    created_at,
    category,
    subcategory,
    type,
  },
}: {
  ride: Ride;
}) => {
  return (
    <View className="bg-white rounded-2xl shadow-md shadow-neutral-400 p-4 mb-5 mt-5">
      {/* Row with map and ride details */}
      <View className="flex-row shadow-md items-center bg-white rounded-2xl  shadow-neutral-400">
        {/* Map */}
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=2c3ed39b787e403286540007a06513d6`,
          }}
          alt="Map for ride"
          className="h-[180px] w-[180px] rounded-md"
        />

        {/* Details */}
        <View className="flex-1 ml-4 justify-center py-4">
          <View className="flex-row items-center mb-2">
            <Image source={icons.to} className="w-6 h-6 mr-4" />
            <Text
              className="text-base font-semibold text-gray-800"
              // numberOfLines={1}
            >
              {" "}
              {origin_address}
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <Image source={icons.point} className="w-6 h-6 mr-4" />
            <Text
              className="text-base font-semibold text-gray-700"
              // numberOfLines={1}
            >
              {" "}
              {destination_address}
            </Text>
          </View>
        </View>
      </View>

      {/* Time Row */}
      <View className="space-y-4 top-5">
        <View className="flex-row items-center justify-between p-4">
          <Text className="text-base font-semibold text-gray-800">
            Date and Time
          </Text>
          <Text className="text-sm font-medium text-gray-700">
            {formatDate(created_at)}, {formatTime(ride_time)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm shadow-neutral-300">
          <Text className="text-base font-semibold text-gray-800">Driver</Text>
          <Text className="text-md font-semibold text-gray-700">
            {driver?.first_name} {driver?.last_name}
          </Text>
        </View>

        <View className="flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm shadow-neutral-300">
          <Text className="text-base font-semibold text-gray-800">
            Service Option
          </Text>
          <Text className="text-sm font-medium text-gray-700">{category}</Text>
        </View>
        <View className="flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm shadow-neutral-300">
          <Text className="text-base font-semibold text-gray-800">
            Service Mode
          </Text>
          <Text className="text-sm font-medium text-gray-700">
            {subcategory}
          </Text>
        </View>
        <View className="flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm shadow-neutral-300">
          <Text className="text-base font-semibold text-gray-800">
            Vehicle Type
          </Text>
          <Text className="text-sm font-medium text-gray-700">{type}</Text>
        </View>

        {/* <View className="flex-row justify-between bg-white p-4 items-center rounded-xl shadow-sm shadow-neutral-300">
          <Text className="text-base font-semibold text-gray-800">
            Payment Status
          </Text>
          {payment_status == "Paid" ? (
            <Text className="text-sm font-medium text-green-500"> Paid</Text>
          ) : (
            <Text className="text-sm font-medium text-red-500">Not Paid</Text>
          )}
        </View> */}
      </View>
    </View>
  );
};

export default RecentRideCard;
