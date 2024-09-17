import Avatar from "@/components/prototyping_components/Avatar";
import { Colors } from "@/constants/Colors";
import { stylesColor } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { View, Text } from "react-native";

export default function OnBoarding() {
  return (
    <View style={{ backgroundColor: Colors.light.neutralColor_5, flex: 1 }}>
      <Text
        style={{
          ...stylesColor.supportErrorColor_1,
          ...typographyStyles.heading_H3,
        }}
      >
        OnBoarding1
      </Text>
      <Avatar />
    </View>
  );
}
