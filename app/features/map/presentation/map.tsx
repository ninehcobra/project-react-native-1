import { Colors } from "@/constants/Colors";
import { ToastService } from "@/services/toast.service";
import { typographyStyles } from "@/styles/typography";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Platform,
  Modal,
  Image,
} from "react-native";
import MapView, { Circle, LatLng, Marker } from "react-native-maps";
import { TextInput } from "react-native-paper";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFindNearByQuery } from "@/services/near-by.service";
import { IFindNearByPayLoad } from "@/types/near-by";

import { AntDesign } from "@expo/vector-icons";
import { IBusiness } from "@/types/business";

import RNPickerSelect from "react-native-picker-select";

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

  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const [selectedPlace, setSelectedPlace] = useState<IBusiness | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedRadius, setSelectedRadius] = useState<number>(5);

  const radiusOptions = [
    { label: "500m", value: 0.5 },
    { label: "1km", value: 1 },
    { label: "2km", value: 2 },
    { label: "5km", value: 5 },
    { label: "10km", value: 10 },
    { label: "20km", value: 20 },
  ];

  const [queryData, setQueryData] = useState<IFindNearByPayLoad>({
    latitude: position[0],
    longitude: position[1],
    radius: selectedRadius,
    q: "",
  });

  const showPlaceDetails = (place: any) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const {
    data: searchResponse,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useFindNearByQuery(queryData, {
    skip: !isSearching,
  });

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
    setSelectedLocation(null);
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

  const onClickMapView = ({ location }: { location: LatLng }): void => {
    setCurrentLocation(null);
    if (selectedLocation != null) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(location);
      setIsSearching(false);
    }
  };

  const handleOnSearch = () => {
    if (selectedLocation != null) {
      setIsSearching(true);
      setQueryData({
        ...queryData,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    }
  };

  useEffect(() => {
    isSearching && refetch();
  }, [queryData, selectedRadius]);

  useEffect(() => {
    if (isSuccess) {
      console.log(searchResponse);
    } else if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  return (
    <View style={styles.container}>
      <MapView
        onPress={(event) => {
          onClickMapView({ location: event.nativeEvent.coordinate });
        }}
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

        {selectedLocation != null ? (
          <Marker
            coordinate={selectedLocation}
            title="Vị trí mà bạn đã chọn"
            description="Đây là vị trí mà bạn đã chọn để tìm kiếm."
          />
        ) : (
          ""
        )}
        {isSearching && selectedLocation != null ? (
          <Circle
            center={selectedLocation}
            radius={selectedRadius * 1000}
            fillColor={"rgba(0, 111, 253,0.2)"}
            strokeColor={"rgb(0, 111, 253)"}
          ></Circle>
        ) : (
          ""
        )}

        {searchResponse?.data.map((place: IBusiness) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.location.coordinates[1],
              longitude: place.location.coordinates[0],
            }}
            onPress={() => showPlaceDetails(place)}
            pinColor={Colors.highlight.highlightColor_1}
          >
            {/* <Text>{place.name}</Text>
            <SvgUri
              key={place.id}
              height={35}
              width={35}
              source={{ uri: place.category.linkURL }}
            /> */}
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity
        style={{ ...styles.floatingButton, bottom: 20, right: 20 }}
        onPress={cycleMapType}
      >
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

      <TouchableOpacity
        style={{ ...styles.floatingButton, left: 20, bottom: 20 }}
        onPress={getCurrentLocation}
      >
        <MaterialIcons
          name={currentLocation ? "location-off" : "location-on"}
          size={20}
          color={Colors.light.neutralColor_5}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.floatingButton, left: 20, bottom: 72 }}
        onPress={handleOnSearch}
      >
        <MaterialIcons
          name="search"
          size={20}
          color={Colors.light.neutralColor_5}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlace && (
              <>
                <Image
                  source={{ uri: selectedPlace.images[0].url }}
                  style={styles.placeImage}
                />
                <Text style={styles.modalTitle}>{selectedPlace.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedPlace.description}
                </Text>
                <Text style={styles.modalInfo}>
                  {selectedPlace.fullAddress}
                </Text>
                <View style={styles.ratingContainer}>
                  <AntDesign name="star" size={20} color="#FFD700" />
                  <Text style={styles.ratingText}>
                    {selectedPlace.overallRating}
                  </Text>
                </View>
                <Text style={styles.modalInfo}>
                  Phone: {selectedPlace.phoneNumber}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.radiusSelector}>
        <RNPickerSelect
          onValueChange={(value) => {
            setSelectedRadius(value);

            setQueryData({
              ...queryData,
              radius: value,
            });
          }}
          items={radiusOptions}
          value={selectedRadius}
          style={pickerSelectStyles}
          placeholder={{ label: "Select radius", value: null }}
        />
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.highlight.highlightColor_1,
    borderRadius: 20,
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  placeImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.dark.neutralColor_3,
  },
  modalInfo: {
    fontSize: 14,
    marginBottom: 5,
    color: Colors.dark.neutralColor_4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark.neutralColor_2,
  },
  radiusSelector: {
    position: "absolute",
    top: 100,
    left: 20,
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 6,
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
