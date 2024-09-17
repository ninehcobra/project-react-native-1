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

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="on_boarding">
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

export default App;
