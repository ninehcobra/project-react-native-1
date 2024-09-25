import { Colors } from "@/constants/Colors";
import { IBusiness } from "@/types/business";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function DetailModal({
  modalVisible,
  setModalVisible,
  selectedPlace,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  selectedPlace: IBusiness | null;
}): React.ReactNode {
  const width = Dimensions.get("window").width;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {selectedPlace && (
            <>
              <View style={{ height: 250 }}>
                <Carousel
                  loop
                  width={width}
                  height={250}
                  autoPlay={true}
                  data={[...new Array(6).keys()]}
                  scrollAnimationDuration={1000}
                  onSnapToItem={(index) => console.log("current index:", index)}
                  renderItem={({ index }) => (
                    <View
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 30 }}>
                        {index}
                      </Text>
                    </View>
                  )}
                />
              </View>
              <Text style={styles.modalTitle}>{selectedPlace.name}</Text>
              <Text style={styles.modalDescription}>
                {selectedPlace.description}
              </Text>
              <Text style={styles.modalInfo}>{selectedPlace.fullAddress}</Text>
              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={20} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {selectedPlace.overallRating}
                </Text>
              </View>
              <Text style={styles.modalInfo}>
                Phone: {selectedPlace.phoneNumber}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <AntDesign name="close" size={24} color="white" />
              </TouchableOpacity>
            </>
          )}
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
