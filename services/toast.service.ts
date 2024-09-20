import { ErrorResponse } from "@/types/error";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export class ToastService {
  private navigation: any;
  constructor(navigation: any) {
    this.navigation = useNavigation();
  }

  private handleError(error: ErrorResponse): string {
    const prefixes = ["ATH", "OTP", "USR", "BUS", "CVL"];
    let errorMessage: string | undefined =
      error?.data?.message || "Something wrong on server!";

    const startsWithAny = prefixes.some((prefix) =>
      errorMessage?.startsWith(prefix)
    );

    if (errorMessage === "USR_0011") {
      this.navigation.navigate("sign_up");
    }

    if (startsWithAny) {
      errorMessage = Array.isArray(error?.data?.errors?.detail)
        ? error?.data?.errors?.detail.join(", ")
        : error?.data?.errors?.detail || errorMessage;
    }
    return errorMessage || "";
  }

  showError(error: ErrorResponse) {
    const errorMessage = this.handleError(error);
    Toast.show({
      type: "error",
      text1: errorMessage,
    });
  }

  showSuccess(message: string) {
    Toast.show({
      type: "success",
      text1: message,
    });
  }

  showInfo(message: string) {
    Toast.show({
      type: "info",
      text1: message,
    });
  }

  showWarning(message: string) {
    Toast.show({
      type: "warning",
      text1: message,
    });
  }
}
