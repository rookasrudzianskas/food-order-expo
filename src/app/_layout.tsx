import "../../global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { vars } from "nativewind";
import { memo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CartProvider from "@/src/providers/cart-provider";
import AuthProvider from "../providers/auth-provider";
import QueryProvider from "@/src/providers/query-providers";
import {StripeProvider} from "@stripe/stripe-react-native";
import NotificationProvider from "@/src/providers/notifications-provider";

export {
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(user)",
};

SplashScreen.preventAutoHideAsync();

export default memo(function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
});

const theme = vars({
  "--theme-fg": "black",
  "--theme-bg": "rgba(230,230,230,1)",
});

function RootLayoutNav() {
  return (
    <View style={[theme, StyleSheet.absoluteFill]}>
      <StripeProvider
        publishableKey={
          process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
        }
      >
        <AuthProvider>
          <QueryProvider>
            <NotificationProvider>
              <CartProvider>
                <Stack>
                  <Stack.Screen name="(user)" options={{ headerShown: false }} />
                  <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="cart"
                    options={{
                      title: "Cart",
                      presentation: 'modal'
                    }}
                  />
                </Stack>
              </CartProvider>
            </NotificationProvider>
          </QueryProvider>
        </AuthProvider>
      </StripeProvider>
    </View>
  );
}
