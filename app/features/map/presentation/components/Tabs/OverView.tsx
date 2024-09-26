import { IBusiness, IDayOfWeek } from "@/types/business";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  ImageSourcePropType,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getBusinessStatus } from "@/utils/day-of-week";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { typographyStyles } from "@/styles/typography";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPreviewImage } from "@/redux/slices/preview-image.slice";

export default function OverView({
  business,
}: {
  business: IBusiness;
}): React.ReactNode {
  let status = "Không có thông tin";
  let nextTime = "";

  if (business && business.dayOfWeek) {
    try {
      [status, nextTime] = getBusinessStatus({
        dayOfWeek: business.dayOfWeek,
      });
    } catch (error) {
      console.error("Error getting business status:", error);
      status = "Lỗi khi lấy thông tin";
      nextTime = "";
    }
  }

  const dispatch = useDispatch();
  const handleOnOpenPreviewImage = (image: ImageSourcePropType): void => {
    dispatch(setPreviewImage({ isPreview: true, image: image }));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ height: 280 }}>
      <View
        style={{
          paddingVertical: 12,
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.dark.neutralColor_5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: 8,
        }}
      >
        <TouchableOpacity style={{ alignItems: "center" }}>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 45,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: Colors.highlight.highlightColor_1,
              backgroundColor: Colors.highlight.highlightColor_1,
            }}
          >
            <FontAwesome6
              name="diamond-turn-right"
              size={24}
              color={Colors.light.neutralColor_5}
            />
          </View>
          <Text style={{ color: Colors.highlight.highlightColor_1 }}>
            Đi đến
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 45,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: Colors.highlight.highlightColor_1,
            }}
          >
            <FontAwesome6
              name="tag"
              size={24}
              color={Colors.highlight.highlightColor_1}
            />
          </View>
          <Text style={{ color: Colors.highlight.highlightColor_1 }}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 45,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: Colors.highlight.highlightColor_1,
            }}
          >
            <MaterialIcons
              name="share-location"
              size={24}
              color={Colors.highlight.highlightColor_1}
            />
          </View>
          <Text style={{ color: Colors.highlight.highlightColor_1 }}>
            Gần đây
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }}>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 45,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: Colors.highlight.highlightColor_1,
            }}
          >
            <MaterialCommunityIcons
              name="cellphone-marker"
              size={24}
              color={Colors.highlight.highlightColor_1}
            />
          </View>
          <Text style={{ color: Colors.highlight.highlightColor_1 }}>Gửi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 45,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: Colors.highlight.highlightColor_1,
            }}
          >
            <MaterialCommunityIcons
              name="share"
              size={24}
              color={Colors.highlight.highlightColor_1}
            />
          </View>
          <Text style={{ color: Colors.highlight.highlightColor_1 }}>
            Chia sẻ
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
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
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
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
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
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
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View style={{ width: 30, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="web"
              size={24}
              color={Colors.highlight.highlightColor_1}
            />
          </View>
          <Text style={{ marginLeft: 4 }}>
            {business.website ? business.website : "Chưa có"}
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 12,
          borderTopWidth: 0.5,
          borderTopColor: Colors.dark.neutralColor_5,
        }}
      >
        <Text style={{ ...typographyStyles.heading_H3, marginTop: 4 }}>
          Ảnh & Video
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
        >
          {business.images.length > 0 &&
            business.images.map((item, index) => {
              const imageSource: ImageSourcePropType = item.url
                ? { uri: item.url }
                : require("../../../../../../assets/images/default_business.png");

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOnOpenPreviewImage(imageSource)}
                >
                  <Image
                    source={imageSource}
                    defaultSource={require("../../../../../../assets/images/default_business.png")}
                    onError={(error) => {}}
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 7,
                      marginRight: 12,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        <View style={{ width: "100%", alignItems: "center", marginTop: 12 }}>
          <TouchableOpacity>
            <View
              style={{
                paddingVertical: 12,
                borderWidth: 0.5,
                borderColor: Colors.dark.neutralColor_5,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 24,
                flexDirection: "row",
              }}
            >
              <Entypo
                name="plus"
                size={24}
                color={Colors.highlight.highlightColor_1}
                style={{ marginRight: 4 }}
              />
              <Text>Thêm ảnh & video</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
