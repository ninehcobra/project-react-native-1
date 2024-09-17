import Banner from "@/components/prototyping_components/Banner";
import ContainerWrapper from "@/components/prototyping_components/ContainerWrapper";
import Dialog from "@/components/prototyping_components/Dialog";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function OnBoarding({ navigation }: { navigation: any }) {
  // navigation.setOptions({ headerShown: false });

  return (
    <ContainerWrapper>
      <View
        style={{
          backgroundColor: Colors.light.neutralColor_5,
          flex: 1,
          padding: 20,
        }}
      >
        <Dialog />
      </View>
    </ContainerWrapper>
  );
}
