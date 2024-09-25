import ContainerWrapper from "@/components/prototyping_components/ContainerWrapper";
import CustomButton from "@/components/prototyping_components/CustomButton";
import { useRegisterUserMutation } from "@/services/auth.service";
import { ToastService } from "@/services/toast.service";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { ErrorResponse } from "@/types/error";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

type RootStackParamList = {
  otp_screen: {
    email: string;
    password: string;
    phone: string;
    name: string;
  };
};

type OtpScreenRouteProp = RouteProp<RootStackParamList, "otp_screen">;

export default function OtpScreen({
  route,
  navigation,
}: {
  route: OtpScreenRouteProp;
  navigation: any;
}): React.ReactNode {
  const { email, password, phone, name } = route.params;

  const input1Ref = React.useRef(null);
  const input2Ref = React.useRef(null);
  const input3Ref = React.useRef(null);
  const input4Ref = React.useRef(null);

  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);

  const toastService = useMemo<ToastService>(
    () => new ToastService(navigation),
    [navigation]
  );

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = [input2Ref, input3Ref, input4Ref][index];
      (nextInput.current as unknown as { focus: () => void })?.focus();
    }
  };

  const [
    registerUser,
    {
      data: userData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();
  const handleOtpSubmit = () => {
    const otpValue = otp.join("");

    if (otpValue.length === 6) {
      registerUser({
        email: email,
        password: password,
        phoneNumber: phone,
        lastName: name,
        firstName: name,
        otp: otpValue,
      });
    }
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      toastService.showSuccess("Đăng ký thành công");
      navigation.navigate("sign_in");
    }
    if (isRegisterError) {
      const errorResponse = registerError as ErrorResponse;
      toastService.showError(errorResponse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterSuccess, isRegisterError]);

  return (
    <ContainerWrapper>
      <View style={{ flex: 1, justifyContent: "space-between", padding: 12 }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ marginBottom: 12, ...typographyStyles.heading_H1 }}>
            Nhập mã xác nhận
          </Text>
          <View style={{ marginBottom: 36, alignItems: "center" }}>
            <Text
              style={{
                ...typographyStyles.body_M,
                ...colorStyles.neutralColorDark_3,
              }}
            >
              Một mã 6 số đã được gửi đến
            </Text>
            <Text
              style={{
                ...typographyStyles.body_M,
                ...colorStyles.neutralColorDark_3,
              }}
            >
              {email}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TextInput
              ref={input1Ref}
              value={otp[0]}
              onChangeText={(value) => handleOtpChange(value, 0)}
              mode="outlined"
              style={{ height: 56, width: 56, paddingLeft: 8 }}
              outlineStyle={{ borderRadius: 12 }}
              maxLength={1}
              textAlign="center"
            />
            <TextInput
              ref={input1Ref}
              value={otp[1]}
              onChangeText={(value) => handleOtpChange(value, 1)}
              mode="outlined"
              style={{ height: 56, width: 56, paddingLeft: 8 }}
              outlineStyle={{ borderRadius: 12 }}
              maxLength={1}
              textAlign="center"
            />
            <TextInput
              ref={input1Ref}
              value={otp[2]}
              onChangeText={(value) => handleOtpChange(value, 2)}
              mode="outlined"
              style={{ height: 56, width: 56, paddingLeft: 8 }}
              outlineStyle={{ borderRadius: 12 }}
              maxLength={1}
              textAlign="center"
            />
            <TextInput
              ref={input1Ref}
              value={otp[3]}
              onChangeText={(value) => handleOtpChange(value, 3)}
              mode="outlined"
              style={{ height: 56, width: 56, paddingLeft: 8 }}
              outlineStyle={{ borderRadius: 12 }}
              maxLength={1}
              textAlign="center"
            />
            <TextInput
              value={otp[4]}
              onChangeText={(value) => handleOtpChange(value, 4)}
              mode="outlined"
              outlineStyle={{ borderRadius: 12 }}
              style={{ height: 56, width: 56, paddingLeft: 8 }}
              maxLength={1}
              textAlign="center"
            />
            <TextInput
              value={otp[5]}
              onChangeText={(value) => handleOtpChange(value, 5)}
              mode="outlined"
              style={{ height: 56, width: 56, paddingLeft: 8 }}
              outlineStyle={{ borderRadius: 12 }}
              maxLength={1}
              textAlign="center"
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={{ marginBottom: 24 }}>
              <Text
                style={{
                  ...typographyStyles.body_L,
                  ...colorStyles.highlightColor_1,
                  fontWeight: "bold",
                }}
              >
                Gửi lại mã
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            onClick={() => {
              handleOtpSubmit();
            }}
            title="Tiếp tục"
            type="primary"
          />
        </View>
      </View>
    </ContainerWrapper>
  );
}
