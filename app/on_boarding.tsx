import Banner from "@/components/prototyping_components/Banner";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";

export default function OnBoarding() {
  return (
    <View
      style={{
        backgroundColor: Colors.light.neutralColor_5,
        flex: 1,
        padding: 20,
      }}
    >
      <Banner
        title="Ăn sáng"
        description="Ăn sáng là buổi ăn quan trọng nhất trong ngày phải ăn á nha"
        imageUrl="https://th.bing.com/th/id/OIP.efATY6p5-5aINwEzOqYKFwAAAA?rs=1&pid=ImgDetMain"
        buttonTitle="Ăn sáng"
        onClick={() => {
          console.log("hi");
        }}
      />
    </View>
  );
}
