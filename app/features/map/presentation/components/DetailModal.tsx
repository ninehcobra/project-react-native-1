import { Colors } from "@/constants/colors";
import { setSelectedBusiness } from "@/redux/slices/selected-business.slice";
import { RootState } from "@/redux/store";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { IBusiness } from "@/types/business";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useState } from "react";

import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { SegmentedButtons } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";
import OverView from "./Tabs/OverView";
import About from "./Tabs/About";

export default function DetailModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}): React.ReactNode {
  const width = Dimensions.get("window").width;

  const dispatch = useDispatch();
  const business: IBusiness | null = useSelector(
    (state: RootState) => state.selectedBusiness.selectedBusinessData
  );

  const handleOnClose = (): void => {
    dispatch(
      setSelectedBusiness({
        selectedBusinessId: null,
        selectedBusinessData: null,
      })
    );

    setModalVisible(false);
  };

  const [value, setValue] = useState<string>("overview");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleOnClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {business && (
            <>
              <View style={{ height: 250 }}>
                <Carousel
                  loop
                  width={width}
                  height={250}
                  data={business.images}
                  autoPlay={true}
                  autoPlayInterval={20000}
                  scrollAnimationDuration={2000}
                  onSnapToItem={(index) => {}}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={
                          item.url
                            ? { uri: item.url }
                            : require("../../../../../assets/images/default_business.png")
                        }
                        defaultSource={require("../../../../../assets/images/default_business.png")}
                        onError={(error) => {}}
                        style={{
                          flex: 1,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                        }}
                      />
                    </View>
                  )}
                />
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleOnClose}
              >
                <AntDesign name="close" size={24} color="white" />
              </TouchableOpacity>
              <View>
                <View style={{ padding: 12, paddingBottom: 0 }}>
                  <Text style={styles.modalTitle}>{business.name}</Text>
                  <View
                    style={{
                      marginLeft: 4,
                      marginBottom: 4,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            ...colorStyles.neutralColorDark_3,
                            marginRight: 4,
                          }}
                        >
                          {business.overallRating}
                        </Text>
                        {[1, 2, 3, 4, 5].map((index) => {
                          const starValue = business.overallRating - index + 1;
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
                        <Text
                          style={{
                            ...colorStyles.neutralColorDark_3,
                            marginLeft: 4,
                          }}
                        >
                          {`(${business.totalReview})`}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            ...colorStyles.neutralColorDark_3,
                            lineHeight: 16,
                          }}
                        >
                          {business.category.name}
                        </Text>

                        <Text
                          style={{
                            ...colorStyles.neutralColorDark_3,
                            lineHeight: 16,
                          }}
                        >
                          {` - ${(business._distance / 1000).toFixed(2)} km`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* Tab view */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",

                    marginBottom: 4,
                    borderBottomWidth: 0.5,
                    borderBottomColor: Colors.dark.neutralColor_5,
                  }}
                >
                  <TouchableOpacity onPress={() => setValue("overview")}>
                    <Text
                      style={{
                        color:
                          value === "overview"
                            ? Colors.highlight.highlightColor_1
                            : Colors.dark.neutralColor_3,
                        fontWeight: "bold",
                        paddingVertical: 12,
                        borderBottomWidth: value === "overview" ? 2 : 0,
                        borderBottomColor: Colors.highlight.highlightColor_1,
                      }}
                    >
                      Tổng quan
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setValue("review")}>
                    <Text
                      style={{
                        color:
                          value === "review"
                            ? Colors.highlight.highlightColor_1
                            : Colors.dark.neutralColor_3,
                        fontWeight: "bold",
                        paddingVertical: 12,
                        borderBottomWidth: value === "review" ? 2 : 0,
                        borderBottomColor: Colors.highlight.highlightColor_1,
                      }}
                    >
                      Đánh giá
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setValue("about")}>
                    <Text
                      style={{
                        color:
                          value === "about"
                            ? Colors.highlight.highlightColor_1
                            : Colors.dark.neutralColor_3,
                        fontWeight: "bold",
                        paddingVertical: 12,
                        borderBottomWidth: value === "about" ? 2 : 0,
                        borderBottomColor: Colors.highlight.highlightColor_1,
                      }}
                    >
                      Thông tin
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* End Tab view */}
                <View style={{ height: 600, padding: 12 }}>
                  {value === "about" ? (
                    <About business={business} />
                  ) : value === "overview" ? (
                    <OverView business={business} />
                  ) : (
                    <Text>Review</Text>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
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
  placeImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.dark.neutralColor_3,
  },
  modalInfo: {
    fontSize: 14,
    marginBottom: 5,
    color: Colors.dark.neutralColor_4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark.neutralColor_2,
  },
});
