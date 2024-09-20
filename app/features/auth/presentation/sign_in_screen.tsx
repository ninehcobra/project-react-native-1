import Badge from "@/components/prototyping_components/Badge";
import ContainerWrapper from "@/components/prototyping_components/ContainerWrapper";
import CustomButton from "@/components/prototyping_components/CustomButton";
import { Colors } from "@/constants/Colors";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignInScreen({
  navigation,
}: {
  navigation: any;
}): React.ReactNode {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignIn = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    navigation.navigate("map");
  };
  return (
    <ContainerWrapper>
      <ImageBackground
        source={require("../../../../assets/images/on_boarding/thumblogin.jpg")}
        style={{ flex: 1 }}
      ></ImageBackground>
      <View style={{ padding: 12 }}>
        <Text style={{ ...typographyStyles.heading_H1, marginBottom: 24 }}>
          Chào mừng quay trở lại!
        </Text>
        <TextInput
          style={{ ...typographyStyles.body_M }}
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Vui lòng nhập email của bạn"
          mode="outlined"
          activeOutlineColor={Colors.highlight.highlightColor_1}
          outlineStyle={{ borderRadius: 12 }}
        />
        <TextInput
          style={{ marginVertical: 12, ...typographyStyles.body_M }}
          label="Mật khẩu"
          value={password}
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
          placeholder="Vui lòng nhập email của bạn"
          mode="outlined"
          activeOutlineColor={Colors.highlight.highlightColor_1}
          outlineStyle={{ borderRadius: 12 }}
          right={
            <TextInput.Icon
              onPress={togglePasswordVisibility}
              icon={!isPasswordVisible ? "eye" : "eye-off"}
            />
          }
        />
        <TouchableOpacity>
          <Text
            style={{
              ...typographyStyles.heading_H4,
              ...colorStyles.highlightColor_1,
              marginBottom: 24,
            }}
          >
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
        <CustomButton onClick={handleSignIn} title="Đăng nhập" type="primary" />
        <View
          style={{
            ...typographyStyles.body_M,
            marginVertical: 12,
            ...colorStyles.neutralColorDark_3,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>Chưa có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("sign_up");
            }}
          >
            <Text
              style={{ fontWeight: "bold", ...colorStyles.highlightColor_1 }}
            >
              Đăng ký ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 24, alignItems: "center" }}>
        <Text
          style={{
            ...typographyStyles.body_M,
            ...colorStyles.neutralColorDark_3,
            marginBottom: 12,
          }}
        >
          Or continue with
        </Text>
        <View style={{ marginBottom: 24, flexDirection: "row" }}>
          <View>
            <Badge
              isTouchable={true}
              backgroundColor={Colors.support.errorColor_1}
              size="medium"
              icon={<Icon color={Colors.light.neutralColor_5} name="google" />}
            />
          </View>
          <View style={{ marginHorizontal: 12 }}>
            <Badge
              isTouchable={true}
              backgroundColor={Colors.dark.neutralColor_1}
              size="medium"
              icon={<Icon color={Colors.light.neutralColor_5} name="apple" />}
            />
          </View>
          <View>
            <Badge
              isTouchable={true}
              backgroundColor={Colors.highlight.highlightColor_1}
              size="medium"
              icon={
                <Icon color={Colors.light.neutralColor_5} name="facebook" />
              }
            />
          </View>
        </View>
      </View>
    </ContainerWrapper>
  );
}
