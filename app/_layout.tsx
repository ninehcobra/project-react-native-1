// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsPage from "./features/news/presentation/screens/news_page";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { config } from "@tamagui/config/v3";

import { Button } from "tamagui";
import { Provider } from "react-redux";

import store from "@/redux/store";

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={() => (
          <View>
            <Text>Hi</Text>
          </View>
        )}
      />
      <Tab.Screen
        name="Messages"
        component={() => (
          <View>
            <Button theme="blue">Hello world</Button>
          </View>
        )}
      />
    </Tab.Navigator>
  );
}
const Stack = createNativeStackNavigator();

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <TamaguiProvider config={tamaguiConfig}>
          <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="home">
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
            </Stack.Navigator>
          </NavigationContainer>
        </TamaguiProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
