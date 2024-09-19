import {
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import { CarouselItemData } from "./Carousel";
import { typographyStyles } from "@/styles/typography";
import { colorStyles } from "@/styles/color";

export default function CarouselItem({
  item,
}: {
  item: CarouselItemData;
}): React.ReactNode {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "cover" }]}
      ></Image>
      <View style={styles.detail}>
        <Text style={{ ...typographyStyles.heading_H1 }}>{item.title}</Text>
        <Text
          style={{
            marginTop: 12,
            ...typographyStyles.body_M,
            ...colorStyles.neutralColorDark_3,
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  detail: {
    flex: 0.3,
    padding: 12,
  },
});
