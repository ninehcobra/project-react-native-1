import { ToastService } from "@/services/toast.service";
import { PermissionsAndroid, Platform } from "react-native";

const toastService = new ToastService(navigator);
export const requestLocationPermission = async () => {
  if (Platform.OS === "android") {
    try {
      if (
        (await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )) === false
      ) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          toastService.showInfo("Location permission denied");
        }
      }
    } catch (err) {
      toastService.showInfo("Error requesting location permission");
    }
  }
};
