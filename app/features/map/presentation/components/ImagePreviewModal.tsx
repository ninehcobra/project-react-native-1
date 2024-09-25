import {
  ImageSourcePropType,
  Modal,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/constants/colors";
export default function ImagePreviewModal({
  isOpen,
  setIsOpen,
  imageSource,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  imageSource: ImageSourcePropType | null;
}): React.ReactNode {
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      onRequestClose={() => setIsOpen(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.9)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageSource && (
          <Image
            source={
              imageSource
                ? imageSource
                : require("../../../../../assets/images/default_business.png")
            }
            defaultSource={require("../../../../../assets/images/default_business.png")}
            style={{ width: "100%", height: "80%", resizeMode: "contain" }}
          />
        )}

        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20 }}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: Colors.light.neutralColor_5,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name="close"
              size={24}
              color={Colors.highlight.highlightColor_1}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
