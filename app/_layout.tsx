// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsPage from "./features/news/presentation/screens/news_page";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from "react-redux";

import { store } from "@/redux/store";
import OnBoarding from "./on_boarding";

import Toast from "react-native-toast-message";
import { SplashScreen } from "expo-router";

import {
  useFonts,
  Poppins_900Black,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import SignInScreen from "./features/auth/presentation/sign_in_screen";
import SignUpScreen from "./features/auth/presentation/sign_up_screen";
import OtpScreen from "./features/auth/presentation/otp_screen";
import Map from "./features/map/presentation/map";
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();

function RootLayout() {
  const [loaded, error] = useFonts({ Poppins_400Regular });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer independent={true}>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="on_boarding"
            >
              <Stack.Screen
                name="news"
                component={NewsPage}
                options={({ route }) => ({
                  title: (route.params as { name?: string }).name ?? "",
                })}
              />
              <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="on_boarding"
                component={OnBoarding}
              ></Stack.Screen>
              <Stack.Screen
                name="sign_in"
                component={SignInScreen}
              ></Stack.Screen>
              <Stack.Screen
                name="sign_up"
                component={SignUpScreen}
              ></Stack.Screen>

              <Stack.Screen
                name="otp_screen"
                component={OtpScreen}
              ></Stack.Screen>

              <Stack.Screen name="map" component={Map}></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>

          <Toast />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default RootLayout;
