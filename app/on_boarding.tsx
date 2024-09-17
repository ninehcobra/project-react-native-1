import Avatar from "@/components/prototyping_components/Avatar";
import { stylesColor } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { View, Text } from "react-native";

export default function OnBoarding() {
  return (
    <View>
      <Text
        style={{
          ...stylesColor.supportErrorColor_1,
          ...typographyStyles.heading_H3,
        }}
      >
        OnBoarding1
      </Text>
      <Avatar
        size={100}
        imageUrl="https://th.bing.com/th/id/R.7336c63ba61e4e552c5001421afe2385?rik=RwWayKoLurO3TA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fe%2f9%2f3%2f1322239-naruto-uzumaki-wallpaper-2000x1797-samsung-galaxy.jpg&ehk=LCRt7xHyvYrCsoivHlT0a4bIRwS0xV9WgbruycataIw%3d&risl=&pid=ImgRaw&r=0"
      />
    </View>
  );
}
