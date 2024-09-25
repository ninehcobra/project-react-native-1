import { Colors } from "@/constants/colors";
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
  const backGroundColor =
    type == "default"
      ? Colors.light.neutralColor_5
      : Colors.highlight.highlightColor_1;

  const borderColor =
    type == "default" ? Colors.highlight.highlightColor_1 : backGroundColor;
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
          backgroundColor: backGroundColor,

          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          borderColor: borderColor,

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
            ...typographyStyles.body_L,
            fontWeight: "bold",
          }}
        >
          {title ?? "Button"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
