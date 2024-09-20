import ContainerWrapper from "@/components/prototyping_components/ContainerWrapper";
import CustomButton from "@/components/prototyping_components/CustomButton";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

export default function OtpScreen({
  navigation,
}: {
  navigation: any;
}): React.ReactNode {
  const input1Ref = React.useRef(null);
  const input2Ref = React.useRef(null);
  const input3Ref = React.useRef(null);
  const input4Ref = React.useRef(null);

  const [otp, setOtp] = React.useState(["", "", "", ""]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = [input2Ref, input3Ref, input4Ref][index];
      (nextInput.current as unknown as { focus: () => void })?.focus();
    }
  };

  const handleOtpSubmit = () => {
    const otpValue = otp.join("");
    console.log("OTP:", otpValue);
    if (otpValue.length === 4) {
      // Xử lý OTP ở đây
      navigation.navigate();
    }
  };

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
              Một mã 4 số đã được gửi đến
            </Text>
            <Text
              style={{
                ...typographyStyles.body_M,
                ...colorStyles.neutralColorDark_3,
              }}
            >
              ttbexinhtt2903@gmail.com
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
              keyboardType="number-pad"
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
              keyboardType="number-pad"
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
              keyboardType="number-pad"
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
              keyboardType="number-pad"
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
              console.log(otp);
            }}
            title="Tiếp tục"
            type="primary"
          />
        </View>
      </View>
    </ContainerWrapper>
  );
}
