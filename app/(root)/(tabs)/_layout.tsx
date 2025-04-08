import { icons, images } from "@/constants";
import { Tabs, Stack } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import "react-native-reanimated";

const TabIcons = ({
  focused,
  source,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex justify-center items-center flex-row rounded-full ${
      focused ? "g-[#ff6700]" : ""
    } p-2`}
  >
    <Image source={source} />
  </View>
);

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} source={icons.ride} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} source={icons.profile} />
          ),
        }}
      />
      {/* <Tabs.Screen name="settings" options={{ headerShown: false }} /> */}
      {/* <Tabs.Screen name="notifications" options={{ headerShown: false }} /> */}
    </Tabs>
    // <Stack>
    //   <Stack.Screen name="account" options={{ headerShown: false }} />
    //   <Stack.Screen name="home" options={{ headerShown: false }} />
    //   <Stack.Screen name="rides" options={{ headerShown: false }} />
    // </Stack>
  );
}
