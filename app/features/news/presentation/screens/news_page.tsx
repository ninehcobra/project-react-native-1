import { View, Text, Button } from "react-native";

export default function NewsPage({
  route,
  navigation,
}: {
  route: {
    name: string; // Make name optional
  };
  navigation: any;
}) {
  return (
    <View>
      <Text>NewsPage {route.name || ""}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("home")} />
      <Button
        title="Update"
        onPress={() => navigation.setOptions({ title: "updated!" })}
      />
    </View>
  );
}
