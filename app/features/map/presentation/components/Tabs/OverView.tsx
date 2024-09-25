import { IBusiness, IDayOfWeek } from "@/types/business";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getBusinessStatus } from "@/utils/day-of-week";

export default function OverView({
  business,
}: {
  business: IBusiness;
}): React.ReactNode {
  const [status, nextTime] = getBusinessStatus({
    dayOfWeek: business.dayOfWeek,
  });

  return (
    <View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <View style={{ width: 30, alignItems: "center" }}>
          <Ionicons
            name="location-outline"
            size={24}
            color={Colors.highlight.highlightColor_1}
          />
        </View>
        <Text
          style={{ marginLeft: 4 }}
        >{`${business.addressLine}, ${business.district}, ${business.province} ,${business.country}`}</Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <View style={{ width: 30, alignItems: "center" }}>
          <FontAwesome6
            name="clock"
            size={20}
            color={Colors.highlight.highlightColor_1}
          />
        </View>
        <View style={{ marginLeft: 4, flexDirection: "row" }}>
          <Text
            style={{
              color:
                status === "Đang mở cửa"
                  ? Colors.support.successColor_1
                  : Colors.support.errorColor_1,
              fontWeight: "bold",
            }}
          >
            {status}
          </Text>
          <Text>{` - `}</Text>
          <Text style={{ fontStyle: "italic" }}>{nextTime}</Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <View style={{ width: 30, alignItems: "center" }}>
          <AntDesign
            name="phone"
            size={24}
            color={Colors.highlight.highlightColor_1}
          />
        </View>
        <Text style={{ marginLeft: 4 }}>{business.phoneNumber}</Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <View style={{ width: 30, alignItems: "center" }}>
          <MaterialCommunityIcons
            name="web"
            size={24}
            color={Colors.highlight.highlightColor_1}
          />
        </View>
        <Text style={{ marginLeft: 4 }}>{business.website}</Text>
      </View>
    </View>
  );
}
