import { Colors } from "@/constants/colors";
import { Text, TouchableOpacity, View } from "react-native";
import { IconProps } from "react-native-vector-icons/Icon";

export default function Badge({
  size = "small",
  backgroundColor,
  color,
  number,
  icon,
  isTouchable = false,
  onPress,
}: {
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
  color?: string;
  number?: number;
  icon?: React.ReactNode;
  isTouchable?: boolean;
  onPress?: () => void;
}): React.ReactNode {
  const sizeSmall = 20;
  const sizeMedium = 30;
  const sizeLarge = 40;

  const badgeSize =
    size == "small" ? sizeSmall : size == "medium" ? sizeMedium : sizeLarge;
  const fontSize =
    size == "small"
      ? sizeSmall * 0.55
      : size == "medium"
      ? sizeMedium * 0.55
      : sizeLarge * 0.55;

  function formatNumber(num: number): string {
    if (num <= 0) return "0";
    if (num > 99) return "99+";
    return num.toString();
  }

  const badgeDetail = (): React.ReactNode => {
    return (
      <View
        style={{
          backgroundColor:
            backgroundColor != null
              ? backgroundColor
              : Colors.highlight.highlightColor_1,
          height: badgeSize,
          width: badgeSize,
          borderRadius: badgeSize,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon != null ? (
          icon
        ) : number != null ? (
          <Text
            style={{
              fontSize:
                formatNumber(number) == "99+" ? fontSize * 0.8 : fontSize,
              color: color != null ? color : Colors.light.neutralColor_5,
            }}
          >
            {formatNumber(number)}
          </Text>
        ) : (
          ""
        )}
      </View>
    );
  };

  return !isTouchable ? (
    badgeDetail()
  ) : (
    <TouchableOpacity onPress={onPress}>{badgeDetail()}</TouchableOpacity>
  );
}
