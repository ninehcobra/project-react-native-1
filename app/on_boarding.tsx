import Badge from "@/components/prototyping_components/Badge";
import Banner from "@/components/prototyping_components/Banner";
import ContainerWrapper from "@/components/prototyping_components/ContainerWrapper";
import Dialog from "@/components/prototyping_components/Dialog";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
export default function OnBoarding({ navigation }: { navigation: any }) {
  // navigation.setOptions({ headerShown: false });
  const [number, setNumber] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (number == 100) {
        setNumber(0);
      } else setNumber((prevNumber) => prevNumber + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <ContainerWrapper>
      <View
        style={{
          backgroundColor: Colors.light.neutralColor_5,
          flex: 1,
          padding: 20,
        }}
      >
        <Badge number={number} size="large" icon={<Icon name="heart" />} />
      </View>
    </ContainerWrapper>
  );
}
