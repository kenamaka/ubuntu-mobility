import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { icons, images } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import slides from "./slides";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset";
import { useAuth } from "@clerk/clerk-expo";
import Loading from "@/components/Loading";
const onboarding = () => {
  const router = useRouter();
  const swiperRef = useRef<Swiper>(null);
  const [loading, setLoading] = useState(true);
  const [pageloading, setPageloading] = useState(false);
  const { signOut } = useAuth();
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
      // router.push("/(tabs)/home");
      router.replace("/root/(auth)/verify");
    }, 300); // slight delay to show spinner for UX smoothness
  };

  if (pageloading) {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 px-10 py-4 bg-white">
      <View className="flex-row justify-between items-center w-full py-4 mb-5">
        <Image
          source={images.icon_black}
          className="h-[60px] w-[60px]"
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={handleVerify}
          className="   flex flex-row justify-center p-4 items-center    bg-transparent    "
        >
          <Text className="text-2xl font-bold">Skip </Text>

          <Image source={icons.right} className="h-[18px] w-[18px]" />
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
            <View className="items-center mt-4">
              <Image
                source={item.image}
                className="w-[270px] h-[270px] "
                resizeMode="contain"
                alt="onboarding image"
              />
            </View>
            <View className="items-left  w-full ">
              <Text className="text-black text-4xl font-extrabold mt-4">
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
