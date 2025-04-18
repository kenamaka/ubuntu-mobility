// app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ff6700",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarShownLabel: false,
          tabBarStyle: {
            position: "absolute",
            borderRadius: 50,
            overflow: "hidden",
            marginHorizontal: 20,
            marginBottom: 20,

            height: 68,
            backgroundColor: "#fff",
            paddingTop: 10,
            paddingBottom: 10, // helps visual balance on different platforms
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="rides"
          options={{
            title: "Rides",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="car-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <StatusBar style="dark" backgroundColor="#fff" />
    </>
  );
}
