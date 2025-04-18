import { View, Text, Image } from "react-native";
import React from "react";
import { Ride } from "@/types/types";
import { icons, images } from "@/constants";
import { formatDate, formatTime } from "@/utils/utils";

const RecentRideCard = ({
  ride: {
    driver,
    destination_latitude,
    destination_longitude,
    origin_address,
    destination_address,
    ride_time,
    payment_status,
    created_at,
  },
}: {
  ride: Ride;
}) => {
  // console.log("Lat:", destination_latitude, "Lng:", destination_longitude);

  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col   items-center justify-center mb-10">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:7.4613,9.04835&zoom=13&marker=lonlat:7.4853,9.0261;type:awesome;color:%23bb3f73;size:x-large;icon:play|lonlat:7.4373,9.0706;type:awesome;color:%234c905a;size:x-large;icon:flag&apiKey=2c3ed39b787e403286540007a06513d6v`,
          }}
          alt="Map for ride"
          className="h-[100px] w-[100px] "
          resizeMode="contain"
        />
      </View>
      {/* <Text className="text-3xl">{driver.first_name}</Text> */}
    </View>
  );
};

export default RecentRideCard;
