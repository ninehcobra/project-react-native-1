import { Colors } from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
export default function Avatar({
  imageUrl,
  size,
  isPlaceHolder = imageUrl == null,
}: {
  imageUrl?: string;
  size?: number;
  isPlaceHolder?: boolean;
}): React.ReactNode {
  const defaultSize = 40;
  const [validImage, setValidImage] = useState(true);

  useEffect(() => {
    if (imageUrl) {
      Image.prefetch(imageUrl)
        .then(() => setValidImage(true))
        .catch(() => setValidImage(false));
    }
  }, [imageUrl]);

  const iconSize = size ? size * 0.86 : defaultSize * 0.86;

  return !isPlaceHolder ? (
    <Image
      source={
        validImage
          ? { uri: imageUrl }
          : require("../../assets/images/react-logo.png")
      }
      style={{
        width: size ?? defaultSize,
        height: size ?? defaultSize,
        borderRadius: size ?? defaultSize,
      }}
    />
  ) : (
    <View
      style={{
        width: size ?? defaultSize,
        height: size ?? defaultSize,
        borderRadius: size ?? defaultSize,
        backgroundColor: Colors.highlight.highlightColor_5,
        alignItems: "center",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}
    >
      <Icon
        color={Colors.highlight.highlightColor_4}
        size={iconSize}
        name="user"
        style={{ marginBottom: iconSize < 100 ? -5 : -10 }}
      ></Icon>
    </View>
  );
}
