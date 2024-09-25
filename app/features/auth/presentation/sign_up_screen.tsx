import Badge from "@/components/prototyping_components/Badge";
import ContainerWrapper from "@/components/prototyping_components/ContainerWrapper";
import CustomButton from "@/components/prototyping_components/CustomButton";
import { Colors } from "@/constants/colors";
import { useRegistrationOTPMutation } from "@/services/otp.service";
import { ToastService } from "@/services/toast.service";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { ErrorResponse } from "@/types/error";
import { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignUpScreen({
  navigation,
}: {
  navigation: any;
}): React.ReactNode {
  //   Data Input
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // di toast service
  const toastService = useMemo<ToastService>(
    () => new ToastService(navigation),
    [navigation]
  );

  //   handle change data
  const handleOnChangeInput = (data: string, type: string) => {
    switch (type) {
      case "name":
        setName(data);
        break;
      case "email":
        setEmail(data);
        break;
      case "password":
        setPassword(data);
        break;
      case "confirmPassword":
        setConfirmPassword(data);
        break;
      case "phone":
        setPhone(data);
      default:
        break;
    }
  };

  //   handle toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  //   handle sign up
  const handleSignUp = () => {
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    GetOTP();
  };

  //   handle checkbox
  const [checked, setChecked] = useState("second");

  // handle register OTP
  const [
    registrationOTP,
    { isSuccess: isOTPSuccess, isError: isOTPError, error: otpError },
  ] = useRegistrationOTPMutation();

  const GetOTP = async (): Promise<void> => {
    if (!email) {
      toastService.showWarning("Vui lòng nhập email");
      return;
    }

    await registrationOTP({
      email: email,
    });
  };

  useEffect(() => {
    if (isOTPSuccess) {
      toastService.showSuccess("OTP đã gửi đến email của bạn");
      navigation.navigate("otp_screen", { email, password, phone, name });
    }
    if (isOTPError) {
      const errorResponse = otpError as ErrorResponse;

      toastService.showError(errorResponse);
    }
  }, [isOTPSuccess, isOTPError]);
  return (
    <ContainerWrapper>
      <View style={{ padding: 12 }}>
        <Text
          style={{
            ...typographyStyles.heading_H1,
            marginBottom: 12,
            marginTop: 12,
          }}
        >
          Đăng ký
        </Text>
        <Text
          style={{
            ...typographyStyles.body_M,
            marginBottom: 24,
            ...colorStyles.neutralColorDark_3,
          }}
        >
          Tạo tài khoản mới để bắt đầu sử dụng ứng dụng
        </Text>
        <Text style={{ ...typographyStyles.heading_H3, marginBottom: 12 }}>
          Họ và tên
        </Text>
        <TextInput
          style={{ ...typographyStyles.body_M, marginBottom: 12 }}
          value={name}
          onChangeText={(text) => handleOnChangeInput(text, "name")}
          placeholder="Vui lòng nhập đầy đủ họ tên của bạn"
          mode="outlined"
          activeOutlineColor={Colors.highlight.highlightColor_1}
          outlineStyle={{ borderRadius: 12 }}
        />
        <Text style={{ ...typographyStyles.heading_H3, marginBottom: 12 }}>
          Địa chỉ email
        </Text>
        <TextInput
          style={{ ...typographyStyles.body_M, marginBottom: 12 }}
          value={email}
          onChangeText={(text) => handleOnChangeInput(text, "email")}
          placeholder="Vui lòng nhập email của bạn"
          mode="outlined"
          activeOutlineColor={Colors.highlight.highlightColor_1}
          outlineStyle={{ borderRadius: 12 }}
        />
        <Text style={{ ...typographyStyles.heading_H3, marginBottom: 12 }}>
          Số điện thoại
        </Text>
        <TextInput
          style={{ ...typographyStyles.body_M, marginBottom: 12 }}
          value={phone}
          onChangeText={(text) => handleOnChangeInput(text, "phone")}
          placeholder="Vui lòng nhập số điện thoại của bạn"
          mode="outlined"
          activeOutlineColor={Colors.highlight.highlightColor_1}
          outlineStyle={{ borderRadius: 12 }}
          keyboardType="numeric"
        />
        <Text style={{ ...typographyStyles.heading_H3, marginBottom: 12 }}>
          Mật khẩu
        </Text>
        <TextInput
          style={{ ...typographyStyles.body_M, marginBottom: 12 }}
          value={password}
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => handleOnChangeInput(text, "password")}
          placeholder="Vui lòng tạo mật khẩu"
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
        <TextInput
          style={{ ...typographyStyles.body_M, marginBottom: 24 }}
          value={confirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
          onChangeText={(text) => handleOnChangeInput(text, "confirmPassword")}
          placeholder="Vui lòng xác nhận lại mật khẩu"
          mode="outlined"
          activeOutlineColor={Colors.highlight.highlightColor_1}
          outlineStyle={{ borderRadius: 12 }}
          right={
            <TextInput.Icon
              onPress={toggleConfirmPasswordVisibility}
              icon={!isConfirmPasswordVisible ? "eye" : "eye-off"}
            />
          }
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <RadioButton
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() =>
              setChecked(checked === "first" ? "unchecked" : "first")
            }
          />
          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text>Tôi đã đọc và đồng ý với</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <TouchableOpacity>
                <Text style={{ color: Colors.highlight.highlightColor_1 }}>
                  {" "}
                  Điều khoản sử dụng{" "}
                </Text>
              </TouchableOpacity>
              <Text>và</Text>
              <TouchableOpacity>
                <Text style={{ color: Colors.highlight.highlightColor_1 }}>
                  {" "}
                  Chính sách bảo mật
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <CustomButton onClick={handleSignUp} title="Đăng ký" type="primary" />
        <View
          style={{
            ...typographyStyles.body_M,
            marginTop: 12,
            ...colorStyles.neutralColorDark_3,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>Đã có tài khoản ? </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{ fontWeight: "bold", ...colorStyles.highlightColor_1 }}
            >
              Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 12, alignItems: "center" }}>
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
