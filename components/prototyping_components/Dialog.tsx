import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { View, Text, Button } from "react-native";
import CustomButton from "./CustomButton";

export default function Dialog({
  title,
  showTitle = title != null,
  description,
  showDescription = description != null,
  buttonWidth,
  button1Title,
  button2Title,
  onButton1Click,
  onButton2Click,
}: {
  title?: string;
  showTitle?: boolean;
  description?: string;
  showDescription?: boolean;
  buttonWidth?: number;
  button1Title?: string;
  button2Title?: string;
  onButton1Click?: Function;
  onButton2Click?: Function;
}) {
  return (
    <View style={{ alignItems: "center" }}>
      {showTitle ? (
        <Text style={{ ...typographyStyles.heading_H1 }}>
          {title != null ? title : "Title"}
        </Text>
      ) : (
        ""
      )}
      {showDescription ? (
        <Text
          style={{
            ...typographyStyles.body_L,
            ...colorStyles.neutralColorDark_3,
            textAlign: "center",
          }}
        >
          {description != null
            ? description
            : "This is example about description"}
        </Text>
      ) : (
        ""
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <CustomButton
          onClick={onButton1Click}
          title={button1Title}
          width={buttonWidth}
        />
        <CustomButton
          onClick={onButton2Click}
          title={button2Title}
          type="primary"
          width={buttonWidth}
        />
      </View>
    </View>
  );
}
