import { Colors } from "@/constants/Colors";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { TouchableOpacity, View, Text } from "react-native";

export default function CustomButton({
  title,
  onClick,
}: {
  title?: string;
  onClick?: Function;
}): React.ReactNode {
  return (
    <TouchableOpacity
      onPress={() => {
        onClick?.();
      }}
    >
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 12 * 1.6,
          backgroundColor: Colors.highlight.highlightColor_1,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            ...colorStyles.neutralColorLight_5,
            ...typographyStyles.action_L,
          }}
        >
          {title ?? "Button"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
