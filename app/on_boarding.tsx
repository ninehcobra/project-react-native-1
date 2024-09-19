import ContainerWrapper from "@/components/prototyping_components/ContainerWrapper";
import { Colors } from "@/constants/Colors";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { ImageBackground, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
export default function OnBoarding({ navigation }: { navigation: any }) {
  // navigation.setOptions({ shownHeader: false });
  return (
    <ContainerWrapper>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/images/on_boarding/thumbnail.png")}
      ></ImageBackground>
      <View style={{ padding: 12 }}>
        <Text style={{ ...typographyStyles.heading_H1 }}>
          Create a prototype in just a few minutes
        </Text>
        <Text
          style={{
            marginVertical: 12,
            ...typographyStyles.body_M,
            ...colorStyles.neutralColorDark_3,
          }}
        >
          Enjoy these pre-made components and worry only about creating the best
          product ever.
        </Text>
      </View>
    </ContainerWrapper>
  );
}
