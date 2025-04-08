import { icons, images } from "@/constants";
import { Tabs, Stack } from "expo-router";
import { Image, View } from "react-native";
import "react-native-reanimated";

const TabIcons = () => (
  <View>
    <Image />
  </View>
);

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="rides" options={{ headerShown: false }} />
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
