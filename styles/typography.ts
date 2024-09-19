import { StyleSheet } from "react-native";

const defaultFontStyle = {
  fontFamily: "Poppins_400Regular",
};
export const typographyStyles = StyleSheet.create({
  // Heading
  heading_H1: {
    ...defaultFontStyle,
    fontSize: 24,
    fontWeight: "900",
  },
  heading_H2: {
    ...defaultFontStyle,
    fontSize: 18,
    fontWeight: "900",
  },
  heading_H3: {
    ...defaultFontStyle,
    fontSize: 16,
    fontWeight: "900",
  },
  heading_H4: {
    ...defaultFontStyle,
    fontSize: 14,
    fontWeight: "bold",
  },
  heading_H5: {
    ...defaultFontStyle,
    fontSize: 12,
    fontWeight: "bold",
  },

  //Body
  body_XL: {
    ...defaultFontStyle,
    fontSize: 18,
    fontWeight: "regular",
  },
  body_L: {
    ...defaultFontStyle,
    fontSize: 16,
    fontWeight: "regular",
  },
  body_M: {
    ...defaultFontStyle,
    fontSize: 14,
    fontWeight: "regular",
  },
  body_S: {
    ...defaultFontStyle,
    fontSize: 12,
    fontWeight: "regular",
  },
  body_XS: {
    ...defaultFontStyle,
    fontSize: 10,
    fontWeight: "medium",
  },

  //   Action
  action_L: {
    ...defaultFontStyle,
    fontSize: 14,
    fontWeight: "semibold",
  },
  action_M: {
    ...defaultFontStyle,
    fontSize: 12,
    fontWeight: "semibold",
  },
  action_S: {
    ...defaultFontStyle,
    fontSize: 10,
    fontWeight: "semibold",
  },
  //   Caption
  caption_M: {
    ...defaultFontStyle,
    fontSize: 10,
    fontWeight: "semibold",
  },
});
