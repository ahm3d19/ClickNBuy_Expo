import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar style="dark"/>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash/index" />
          <Stack.Screen name="(main)/(tabs)" />
          <Stack.Screen name="(main)/productDetail" />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
