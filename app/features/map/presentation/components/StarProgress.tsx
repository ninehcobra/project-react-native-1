import { Colors } from "@/constants/colors";
import { typographyStyles } from "@/styles/typography";
import { IStar } from "@/types/business";
import { View, Text } from "react-native";
import * as Progress from "react-native-progress";
export default function StarProgress({
  stars,
}: {
  stars: IStar[];
}): React.ReactNode {
  const maxCount = Math.max(...stars.map((star) => star.count));

  return (
    <View style={{ marginLeft: 12, marginTop: 12 }}>
      {stars.map((star, index) => {
        return (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ marginRight: 8, width: 12, alignItems: "center" }}>
              <Text style={{ ...typographyStyles.body_M }}>{star.star}</Text>
            </View>
            <Progress.Bar
              style={{ marginBottom: 4 }}
              progress={star.count / maxCount}
              width={175}
              height={8}
              color={Colors.support.warningColor_1}
            />
          </View>
        );
      })}
    </View>
  );
}
