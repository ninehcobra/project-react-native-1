import { Colors } from "@/constants/colors";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { IFindNearByResponse } from "@/types/near-by";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import FontAwesome6 from "@expo/vector-icons/build/FontAwesome6";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";

export default function SearchModal({
  setSearchResult,
  searchResult,
  searchResponse,
  onFlyTo,
}: {
  setSearchResult: (value: boolean) => void;
  searchResult: boolean;
  searchResponse: IFindNearByResponse | undefined;
  onFlyTo: ({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  }: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }) => void;
}): React.ReactNode {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSearchResult(false)}
      visible={searchResult}
    >
      <View style={styles.modalOverlay}>
        <View style={{ ...styles.modalContent, padding: 12 }}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSearchResult(false)}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
          <View
            style={{ width: "100%", alignItems: "center", marginVertical: 8 }}
          >
            <View
              style={{
                height: 6,
                width: 60,
                backgroundColor: Colors.dark.neutralColor_5,
                borderRadius: 10,
                opacity: 0.5,
              }}
            ></View>
          </View>
          <Text
            style={{
              ...typographyStyles.heading_H1,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Kết quả
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Ionicons
              style={{ marginRight: 12 }}
              name="filter-sharp"
              size={24}
              color="black"
            />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderColor: Colors.dark.neutralColor_5,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    ...typographyStyles.body_L,
                    fontWeight: "700",
                  }}
                >
                  Hiện đang mở
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderColor: Colors.dark.neutralColor_5,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginLeft: 12,
                }}
              >
                <Text
                  style={{
                    ...typographyStyles.body_L,
                    fontWeight: "700",
                  }}
                >
                  Được xếp hạng cao nhất
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderColor: Colors.dark.neutralColor_5,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginLeft: 12,
                }}
              >
                <Text
                  style={{
                    ...typographyStyles.body_L,
                    fontWeight: "700",
                  }}
                >
                  Gần đây nhất
                </Text>
              </View>
            </ScrollView>
          </View>
          <ScrollView
            style={{
              marginTop: 12,
              minHeight: 400,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {searchResponse && searchResponse.data.length > 0 ? (
              searchResponse.data.map((place) => (
                <View key={place.id} style={{ marginBottom: 24 }}>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                  >
                    {place.images.length > 0 ? (
                      place.images.map((image) => {
                        return (
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
                            ...typographyStyles.body_M,
                            ...colorStyles.supportColorSuccess_1,
                          }}
                        >
                          Đang mở cửa .
                        </Text>
                        <Text
                          style={{
                            ...typographyStyles.body_M,
                            marginLeft: 4,
                          }}
                        >
                          Đóng cửa lúc 20:30
                        </Text>
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
              ))
            ) : (
              <View>
                <Image
                  source={require("../../../../../assets/images/not-found.png")}
                  style={{
                    width: 200,
                    height: 200,
                    alignSelf: "center",
                    marginTop: 100,
                  }}
                />
                <Text
                  style={{
                    ...typographyStyles.heading_H3,
                    marginTop: 10,
                    alignSelf: "center",
                  }}
                >
                  Không tìm thấy kết quả nào
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.highlight.highlightColor_1,
    borderRadius: 20,
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    maxHeight: "80%",
    paddingTop: 0,
  },
});
