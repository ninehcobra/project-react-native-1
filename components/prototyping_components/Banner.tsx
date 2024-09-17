import { Colors } from "@/constants/Colors";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";

export default function Banner({
  title,
  description,
  buttonTitle,
  imageUrl,
  showTitle = title != null,
  showButton = buttonTitle != null,
  showImage = imageUrl != null,
  showDescription = description != null,
  onClick,
}: {
  title?: string;
  description?: string;
  buttonTitle?: string;
  imageUrl?: string;
  showTitle?: boolean;
  showButton?: boolean;
  showImage?: boolean;
  showDescription?: boolean;
  onClick?: Function;
}): React.ReactNode {
  const defaultPadding = 12;
  const defaultBorderRadius = 14;

  const [validImage, setValidImage] = useState(true);

  useEffect(() => {
    if (imageUrl) {
      Image.prefetch(imageUrl)
        .then(() => setValidImage(true))
        .catch(() => setValidImage(false));
    }
  }, [imageUrl]);

  return (
    <View
      style={{
        backgroundColor: Colors.highlight.highlightColor_5,
        padding: defaultPadding,
        borderRadius: defaultBorderRadius,
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <View style={{ flex: 7 }}>
        {showTitle ? (
          <Text style={{ ...typographyStyles.heading_H3 }}>
            {title ?? "Title"}
          </Text>
        ) : (
          ""
        )}
        {showDescription ? (
          <Text
            style={{
              ...typographyStyles.body_M,
              ...colorStyles.neutralColorDark_3,
              textAlign: "justify",
            }}
          >
            {description ?? "Description"}
          </Text>
        ) : (
          ""
        )}
        <View style={{ marginTop: 12, alignSelf: "flex-start" }}>
          {showButton ? (
            <CustomButton onClick={onClick} title={buttonTitle} />
          ) : (
            ""
          )}
        </View>
      </View>
      {showImage ? (
        <View
          style={{
            flex: 3,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {validImage ? (
            <Image
              source={{ uri: imageUrl, height: 60, width: 60 }}
              style={{ borderRadius: 12 }}
            />
          ) : (
            <Icon
              name="picture-o"
              size={40}
              color={Colors.highlight.highlightColor_4}
            />
          )}
        </View>
      ) : (
        ""
      )}
    </View>
  );
}
