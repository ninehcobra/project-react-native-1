import { Colors } from "@/constants/Colors";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { TouchableOpacity, View, Text } from "react-native";

export default function CustomButton({
  title,
  onClick,
  type = "default",
  width,
  height,
}: {
  title?: string;
  onClick?: Function;
  type?: "default" | "primary";
  width?: number;
  height?: number;
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
          backgroundColor:
            type == "default"
              ? Colors.light.neutralColor_5
              : Colors.highlight.highlightColor_1,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          borderColor:
            type == "default" ? Colors.highlight.highlightColor_1 : "",
          borderWidth: 2,
          width: width,
          height: height,
        }}
      >
        <Text
          style={{
            ...(type != "default"
              ? colorStyles.neutralColorLight_5
              : colorStyles.highlightColor_1),
            ...typographyStyles.action_L,
          }}
        >
          {title ?? "Button"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
