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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <Toast />
    </SafeAreaProvider>
  );
}

export default RootLayout;
