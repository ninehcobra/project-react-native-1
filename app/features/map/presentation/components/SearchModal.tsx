import { Colors } from "@/constants/colors";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { IFindNearByResponse } from "@/types/near-by";
import { getBusinessStatus } from "@/utils/day-of-week";
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
import BusinessCard from "./BusinessCard";

export default function SearchModal({
  setSearchResult,
  searchResult,
  searchResponse,
  onFlyTo,
}: {
  setSearchResult: (value: boolean) => void;
  searchResult: boolean;
  searchResponse: IFindNearByResponse | undefined;
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
              searchResponse.data.map((place) => {
                const [status, nextTime] = getBusinessStatus({
                  dayOfWeek: [...place.dayOfWeek],
                });
                return (
                  <BusinessCard
                    key={place.id}
                    place={place}
                    status={status}
                    nextTime={nextTime}
                    onFlyTo={onFlyTo}
                  />
                );
              })
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
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  floatingButton: {
    position: "absolute",

    backgroundColor: Colors.dark.neutralColor_1,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  searchbar: {
    position: "absolute",
    top: 20,
    left: 0,
    width: "100%",
    padding: 12,
  },
  floatingLeftBtn: {
    position: "absolute",
    left: 20,
    backgroundColor: Colors.light.neutralColor_5,
    padding: 10,
    borderRadius: 20,
  },
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
    marginBottom: 15,
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
  radiusSelector: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 1,
  },
});
