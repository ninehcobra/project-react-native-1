import Badge from "@/components/prototyping_components/Badge";
import ContainerWrapper from "@/components/prototyping_components/ContainerWrapper";
import CustomButton from "@/components/prototyping_components/CustomButton";
import { Colors } from "@/constants/colors";
import { useLoginUserMutation } from "@/services/auth.service";
import { ToastService } from "@/services/toast.service";
import { colorStyles } from "@/styles/color";
import { typographyStyles } from "@/styles/typography";
import { ErrorResponse } from "@/types/error";
import { getToken, storeToken } from "@/utils/jwt";
import { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignInScreen({
  navigation,
}: {
  navigation: any;
}): React.ReactNode {
  const [inputData, setInputData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [inputError, setInputError] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const toastService = useMemo<ToastService>(
    () => new ToastService(navigation),
    [navigation]
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [
    loginUser,
    {
      data: dataLogin,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const handleSignIn = () => {
    try {
      if (inputData.email.trim() === "" || inputData.password.trim() === "") {
        toastService.showError({
          data: {
            message: "Vui lòng nhập đầy đủ thông tin",
          },
        });
        return;
      } else {
        loginUser({
          email: inputData.email,
          password: inputData.password,
        });
      }
    } catch (error) {
      toastService.showError({
        data: {
          message: "Có lỗi xảy ra phía server",
        },
      });
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toastService.showSuccess("Đăng nhập thành công");
      storeToken(dataLogin.accessToken);
      navigation.navigate("map");
    }
    if (isLoginError) {
      const errorResponse = loginError as ErrorResponse;
      handleError(errorResponse);
      toastService.showError(errorResponse);
    }
  }, [isLoginSuccess, isLoginError]);

  const handleError = (error: ErrorResponse): void => {
    if (error?.data?.errors) {
      setInputError((prevInputError) => {
        const newInputError: { email: string; password: string } = {
          ...prevInputError,
        };
        const inputTypes: Array<keyof typeof newInputError> = [
          "email",
          "password",
        ];
        for (const inputType of inputTypes) {
          if (error.data?.errors?.[inputType]) {
            newInputError[inputType] = error.data.errors[inputType][0] || "";
          } else {
            newInputError[inputType] = "";
          }
        }
        return newInputError;
      });
    }
  };

  const handleOnChangeInput = (inputType: string, value: string) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      [inputType]: value,
    }));

    setInputError((prevInputError) => ({
      ...prevInputError,
      [inputType]: "",
    }));
  };

  const checkAuth = async () => {
    const token = await getToken();

    if (token) {
      navigation.navigate("map");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

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
        {inputError.email !== "" ? (
          <Text
            style={{
              ...typographyStyles.action_S,
              ...colorStyles.supportErrorColor_2,
              fontWeight: "bold",
            }}
          >
            Email: {inputError.email}
          </Text>
        ) : (
          ""
        )}
        <TextInput
          error={inputError.email !== ""}
          style={{ ...typographyStyles.body_M, marginBottom: 12 }}
          label="Email"
          value={inputData.email}
          onChangeText={(text) => handleOnChangeInput("email", text)}
          placeholder="Vui lòng nhập email của bạn"
          mode="outlined"
          activeOutlineColor={Colors.highlight.highlightColor_1}
          outlineStyle={{ borderRadius: 12 }}
        />
        {inputError.password !== "" ? (
          <Text
            style={{
              ...typographyStyles.action_S,
              ...colorStyles.supportErrorColor_2,
              fontWeight: "bold",
            }}
          >
            Mật khẩu: {inputError.password}
          </Text>
        ) : (
          ""
        )}
        <TextInput
          error={inputError.password !== ""}
          style={{ marginBottom: 12, ...typographyStyles.body_M }}
          label="Mật khẩu"
          value={inputData.password}
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => handleOnChangeInput("password", text)}
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
