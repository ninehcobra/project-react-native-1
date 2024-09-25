import { typographyStyles } from "@/styles/typography";
import { IBusiness } from "@/types/business";
import { View, Text, ScrollView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/colors";

export default function About({
  business,
}: {
  business: IBusiness;
}): React.ReactNode {
  return (
    <View style={{ padding: 12 }}>
      <Text style={{ ...typographyStyles.heading_H2, marginBottom: 8 }}>
        Các dịch vụ:
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: 250 }}>
        {business.services.length > 0 &&
          business.services.map((service) => {
            return (
              <View
                key={service.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Entypo
                  style={{ marginRight: 4 }}
                  name="check"
                  size={24}
                  color={Colors.support.successColor_1}
                />
                <Text>{service.name}</Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
