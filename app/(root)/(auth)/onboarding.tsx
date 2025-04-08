import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { images } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import slides from "./slides";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset";

const onboarding = () => {
  const router = useRouter();
  const swiperRef = useRef<Swiper>(null);
  const [loading, setLoading] = useState(true);
  const [pageloading, setPageloading] = useState(false);
  useEffect(() => {
    const preloadImages = async () => {
      try {
        await Promise.all(slides.map((slide) => Asset.loadAsync(slide.image)));
        setLoading(false);
      } catch (error) {
        console.error("Error preloading images:", error);
        setLoading(false);
      }
    };

    preloadImages();
  }, []);

  const handleVerify = () => {
    setPageloading(true); // Start loader immediately
    setTimeout(() => {
      router.replace("/(root)/(auth)/verify");
    }, 6000); // slight delay to show spinner for UX smoothness
  };

  if (pageloading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#ff6700" />
      </SafeAreaView>
    );
  }
  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#ff6700" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 px-10 py-6 bg-white">
      <View className="flex-row justify-between items-center w-full py-5 mb-5">
        <Image
          source={images.icon_black}
          className="h-[70px] w-[70px]"
          resizeMode="contain"
        />
        <TouchableOpacity onPress={handleVerify}>
          <Text className="text-2xl font-bold">Skip</Text>
        </TouchableOpacity>
      </View>

      <Swiper
        ref={swiperRef}
        loop={false}
        autoplay={false}
        dot={<View className="w-[20px] h-[4px] bg-[#cccc] rounded-full mx-1" />}
        activeDot={<View className="w-[30px] h-[6px] bg-black rounded-full " />}
      >
        {slides.map((item: any, index: number) => (
          <View key={index} className="flex items-center  justify-center p-0">
            <View className="items-center mt-5">
              <Image
                source={item.image}
                className="w-[300px] h-[300px] "
                resizeMode="contain"
                alt="onboarding image"
              />
            </View>
            <View className="items-left  w-full ">
              <Text className="text-black text-[42px] font-extrabold mt-5">
                {item.title}
              </Text>
            </View>
            <Text className="text-lg font-semibold items-left justify-center w-full m-2 ">
              {item.desc}
            </Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default onboarding;
