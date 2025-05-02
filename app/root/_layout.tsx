import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)/home"
            options={{
              headerShown: false,
              headerTransparent: true,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="find-ride" options={{ headerShown: false }} />
          <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
          <Stack.Screen name="book-ride" options={{ headerShown: false }} />
          {/* <Stack.Screen
        name="confirm-ride"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="book-ride"
        options={{
          headerShown: false,
        }}
      /> */}
        </Stack>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

export default Layout;
