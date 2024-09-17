import React, { useState, useEffect } from "react";
import { Image } from "react-native";

export default function Avatar({
  imageUrl,
  size,
}: {
  imageUrl: string;
  size?: number;
}): React.ReactNode {
  const defaultSize = 40;
  const [validImage, setValidImage] = useState(true);

  useEffect(() => {
    Image.prefetch(imageUrl)
      .then(() => setValidImage(true))
      .catch(() => setValidImage(false));
  }, [imageUrl]);

  return (
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
  );
}
