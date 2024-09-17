import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ContainerWrapper({
  children,
  backgroundColor,
}: {
  children: React.ReactNode;
  backgroundColor?: string;
}): React.ReactNode {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: backgroundColor ?? Colors.light.neutralColor_5,
      }}
    >
      {children}
    </View>
  );
}
