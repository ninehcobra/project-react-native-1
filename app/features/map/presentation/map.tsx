import { Colors } from "@/constants/Colors";
import { ToastService } from "@/services/toast.service";
import { typographyStyles } from "@/styles/typography";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Platform,
} from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import { TextInput } from "react-native-paper";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const mapTypes = ["standard", "satellite", "hybrid", "terrain"];

export default function Map({
  navigation,
}: {
  navigation: any;
}): React.ReactNode {
  const [mapType, setMapType] = useState<
    "standard" | "satellite" | "hybrid" | "terrain"
  >("terrain");

  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const mapRef = useRef<MapView>(null);
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

  const getCurrentLocation = async () => {
    console.log("on CLick");
    if (currentLocation == null) {
      await requestLocationPermission();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        toastService.showInfo("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }

      onFlyTo({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } else {
      setCurrentLocation(null);
    }
  };

  const onFlyTo = ({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  }: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }): void => {
    mapRef.current?.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
      3000
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: 10.87702,
          longitude: 106.809773,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType={mapType}
        style={styles.map}
      >
        {currentLocation != null ? (
          <Marker
            coordinate={currentLocation}
            title="Current Location"
            description="You are here"
          />
        ) : (
          ""
        )}
      </MapView>
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

      <TouchableOpacity onPress={getCurrentLocation}>
        <View style={{ ...styles.floatingLeftBtn, bottom: 20 }}>
          <MaterialIcons
            name={currentLocation ? "location-off" : "location-on"}
            size={20}
            color={Colors.support.errorColor_1}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{ ...styles.floatingLeftBtn, bottom: 72 }}>
          <MaterialIcons name="search" size={20} color="black" />
        </View>
      </TouchableOpacity>
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
    top: 20,
    left: 0,
    width: "100%",
    padding: 12,
  },
  floatingLeftBtn: {
    position: "absolute",
    left: 20,
    backgroundColor: Colors.light.neutralColor_5,
    padding: 10,
    borderRadius: 20,
  },
});
