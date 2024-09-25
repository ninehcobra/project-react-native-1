import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { typographyStyles } from "@/styles/typography";
import { useCreateReviewMutation } from "@/services/review.service";
import { ToastService } from "@/services/toast.service";
import { ErrorResponse } from "@/types/error";

interface ReviewModalProps {
  isVisible: boolean;
  onClose: () => void;
  businessId: string;
}

export default function ReviewModal({
  isVisible,
  onClose,
  businessId,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [createReview, { data, isSuccess, isError, error }] =
    useCreateReviewMutation();

  const handleSubmit = async () => {
    try {
      console.log("submit");
      await createReview({
        content,
        star: rating.toString(),
        businessId,
        emotion: "excellent",
      }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const toastService = useMemo<ToastService>(
    () => new ToastService(navigator),
    [navigator]
  );

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      toastService.showWarning("Chưa đăng nhập");
    }
  }, [isSuccess, isError]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Viết đánh giá</Text>

          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <AntDesign
                  name={star <= rating ? "star" : "staro"}
                  size={30}
                  color={Colors.support.warningColor_1}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="Nhập đánh giá của bạn"
            value={content}
            onChangeText={setContent}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.highlight.highlightColor_1,
    borderRadius: 20,
    padding: 8,
  },
  title: {
    ...typographyStyles.heading_H2,
    marginBottom: 20,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.dark.neutralColor_5,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: Colors.highlight.highlightColor_1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    ...typographyStyles.body_M,
    fontWeight: "bold",
  },
});
