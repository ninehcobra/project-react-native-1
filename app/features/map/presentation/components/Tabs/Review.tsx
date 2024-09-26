import { Colors } from "@/constants/colors";
import { useGetReviewsForBusinessQuery } from "@/services/review.service";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { IBusiness } from "@/types/business";
import { IReview } from "@/types/review";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import ReviewModal from "../ReviewModal";
import { ErrorResponse } from "@/types/error";
import { navigate } from "@/services/navigation.service";
export default function Review({
  business,
}: {
  business: IBusiness;
}): React.ReactNode {
  const [sortBy, setSortBy] = useState<string>("desc");
  const { data, isLoading, isFetching, error, isError, isSuccess } =
    useGetReviewsForBusinessQuery({
      businessId: business.id,
      sortBy,
    });

  const reviewList: IReview[] | undefined = data?.data;
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setSortBy("desc");
    }
    if (isError) {
    }
  }, [isSuccess]);

  const openReviewModal = () => {
    setIsReviewModalVisible(true);
  };
  return (
    <View>
      <View
        style={{
          paddingBottom: 24,
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.dark.neutralColor_5,
        }}
      >
        <TouchableOpacity onPress={openReviewModal}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
                paddingVertical: 8,

                borderWidth: 0.5,
                borderColor: Colors.dark.neutralColor_5,
                borderRadius: 100,
              }}
            >
              <Text>Viết đánh giá</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {reviewList !== undefined && reviewList.length > 0 ? (
        <View
          style={{
            padding: 12,
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.dark.neutralColor_5,
          }}
        >
          {reviewList.map((review) => {
            return (
              <View key={review.id} style={{ marginTop: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: review.postBy.avatarUrl }}
                    style={{ height: 45, width: 45, borderRadius: 45 }}
                  />
                  <View style={{ marginLeft: 8, alignItems: "flex-start" }}>
                    <Text
                      style={{ ...typographyStyles.body_M, fontWeight: "bold" }}
                    >{`${review.postBy.lastName} ${review.postBy.firstName}`}</Text>
                    <View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={{}}>{review.star}</Text>
                        {[1, 2, 3, 4, 5].map((index) => {
                          const starValue = review.star - index + 1;
                          if (starValue >= 1) {
                            return (
                              <MaterialIcons
                                key={index}
                                name="star"
                                size={16}
                                color={Colors.support.warningColor_1}
                              />
                            );
                          } else if (starValue > 0) {
                            return (
                              <MaterialIcons
                                key={index}
                                name="star-half"
                                size={16}
                                color={Colors.support.warningColor_1}
                              />
                            );
                          } else {
                            return (
                              <MaterialIcons
                                key={index}
                                name="star-outline"
                                size={16}
                                color={Colors.support.warningColor_1}
                              />
                            );
                          }
                        })}
                      </View>
                    </View>
                  </View>
                </View>
                <Text
                  style={{
                    ...colorStyles.neutralColorDark_3,
                    lineHeight: 16,
                    ...typographyStyles.body_S,
                    marginTop: 4,
                  }}
                >
                  {moment(review.created_at).fromNow()}
                </Text>
                <Text style={{ lineHeight: 16 }}>{review.content}</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View
          style={{
            marginTop: 80,
            alignItems: "center",
          }}
        >
          <Text>Chưa có đánh giá</Text>
        </View>
      )}

      <ReviewModal
        isVisible={isReviewModalVisible}
        onClose={() => setIsReviewModalVisible(false)}
        businessId={business.id}
      />
    </View>
  );
}
