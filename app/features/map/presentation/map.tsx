import { Colors } from "@/constants/Colors";
import { ToastService } from "@/services/toast.service";
import { typographyStyles } from "@/styles/typography";
import { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Platform,
} from "react-native";
import MapView from "react-native-maps";
import { TextInput } from "react-native-paper";
import * as Location from "expo-location";

const mapTypes = ["standard", "satellite", "hybrid", "terrain"];

export default function Map({
  navigation,
}: {
  navigation: any;
}): React.ReactNode {
  const [mapType, setMapType] = useState<
    "standard" | "satellite" | "hybrid" | "terrain"
  >("terrain");

  const cycleMapType = () => {
    const currentIndex = mapTypes.indexOf(mapType);
    const nextIndex = (currentIndex + 1) % mapTypes.length;
    setMapType(
      mapTypes[nextIndex] as "standard" | "satellite" | "hybrid" | "terrain"
    );
  };

  const toastService = useMemo<ToastService>(
    () => new ToastService(navigation),
    [navigation]
  );

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
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
      } catch (err) {
        toastService.showInfo("Error requesting location permission");
      }
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      toastService.showInfo("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    // You can update the map's region here if needed
  };

  useEffect(() => {
    requestLocationPermission();
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        userInterfaceStyle="dark"
        initialRegion={{
          latitude: 10.87702,
          longitude: 106.809773,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType={mapType}
        style={styles.map}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={cycleMapType}>
        <Text style={styles.buttonText}>
          {mapType == "terrain"
            ? "Địa hình"
            : mapType == "hybrid"
            ? "Kết hợp"
            : mapType == "standard"
            ? "Cơ bản"
            : "Vệ tinh"}
        </Text>
      </TouchableOpacity>
      <View style={styles.searchbar}>
        <TextInput
          placeholder="Tìm kiếm..."
          mode="outlined"
          outlineStyle={{ borderRadius: 24 }}
          style={{ ...typographyStyles.body_M, paddingHorizontal: 12 }}
          right={<TextInput.Icon icon="magnify" />}
        ></TextInput>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.dark.neutralColor_1,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  searchbar: {
    position: "absolute",
    top: 40,
    left: 0,
    width: "100%",
    padding: 12,
  },
});
