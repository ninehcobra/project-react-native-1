import { Colors } from "@/constants/colors";
import { setPreviewImage } from "@/redux/slices/preview-image.slice";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { IBusiness } from "@/types/business";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useDispatch } from "react-redux";

export default function BusinessCard({
  place,
  status,
  nextTime,
  onFlyTo,
}: {
  place: IBusiness;
  status: string;
  nextTime: string;
  onFlyTo({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  }: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }): void;
}): React.ReactNode {
  const dispatch = useDispatch();
  const handleOnOpenPreviewImage = (image: ImageSourcePropType): void => {
    dispatch(setPreviewImage({ isPreview: true, image: image }));
  };

  return (
    <View key={place.id} style={{ marginBottom: 24 }}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {place.images.length > 0 ? (
          place.images.map((image) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  handleOnOpenPreviewImage(
                    image.url
                      ? { uri: image.url }
                      : require("../../../../../assets/images/default_business.png")
                  )
                }
              >
                <Image
                  source={
                    image.url
                      ? { uri: image.url }
                      : require("../../../../../assets/images/default_business.png")
                  }
                  defaultSource={require("../../../../../assets/images/default_business.png")}
                  onError={(error) => {}}
                  style={{
                    borderRadius: 12,
                    width: 165,
                    height: 165,
                    marginRight: 12,
                  }}
                />
              </TouchableOpacity>
            );
          })
        ) : (
          <Image
            source={require("../../../../../assets/images/default_business.png")}
            style={{
              borderRadius: 12,
              width: 165,
              height: 165,
              marginRight: 12,
            }}
          />
        )}
      </ScrollView>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginTop: 6, flex: 9 }}>
          <Text
            style={{
              ...typographyStyles.body_L,
              fontWeight: "700",
            }}
          >
            {place.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...typographyStyles.body_M,
                ...colorStyles.neutralColorDark_3,
              }}
            >
              {place.overallRating.toFixed(1)}
            </Text>

            <View
              style={{
                marginLeft: 4,
                marginBottom: 4,
                flexDirection: "row",
              }}
            >
              {[1, 2, 3, 4, 5].map((index) => {
                const starValue = place.overallRating - index + 1;
                if (starValue >= 1) {
                  return (
                    <MaterialIcons
                      key={index}
                      name="star"
                      size={18}
                      color={Colors.support.warningColor_1}
                    />
                  );
                } else if (starValue > 0) {
                  return (
                    <MaterialIcons
                      key={index}
                      name="star-half"
                      size={18}
                      color={Colors.support.warningColor_1}
                    />
                  );
                } else {
                  return (
                    <MaterialIcons
                      key={index}
                      name="star-outline"
                      size={18}
                      color={Colors.support.warningColor_1}
                    />
                  );
                }
              })}
            </View>

            <Text
              style={{
                ...typographyStyles.body_M,
                ...colorStyles.neutralColorDark_3,
                marginLeft: 4,
              }}
            >{`(${place.totalReview}) . `}</Text>
            <Text
              style={{
                ...typographyStyles.body_M,
                ...colorStyles.neutralColorDark_3,
                marginLeft: 4,
              }}
            >{`${(place._distance / 1000).toFixed(1)} km`}</Text>
          </View>

          <Text
            style={{
              ...typographyStyles.body_M,
              ...colorStyles.neutralColorDark_3,
            }}
          >
            {place.category.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
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
            flex: 2,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              onFlyTo({
                latitude: place.location.coordinates[1],
                longitude: place.location.coordinates[0],
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              })
            }
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                borderColor: Colors.dark.neutralColor_5,
                borderWidth: 1,
                marginTop: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome6
                name="diamond-turn-right"
                size={24}
                color={Colors.highlight.highlightColor_1}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
