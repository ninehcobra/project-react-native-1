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
  FlatList,
  ScrollView,
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

import { SvgUri } from "react-native-svg";

import Ionicons from "@expo/vector-icons/Ionicons";
import { colorStyles } from "@/styles/color";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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

  const [searchResult, setSearchResult] = useState<boolean>(false);

  const [queryData, setQueryData] = useState<IFindNearByPayLoad>({
    latitude: position[0],
    longitude: position[1],
    radius: selectedRadius,
    q: "",
    limit: 200,
  });
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

  const radiusOptions = [
    { label: "500m", value: 0.5 },
    { label: "1km", value: 1 },
    { label: "2km", value: 2 },
    { label: "5km", value: 5 },
    { label: "10km", value: 10 },
    { label: "20km", value: 20 },
  ];

  const toastService = useMemo<ToastService>(
    () => new ToastService(navigation),
    [navigation]
  );

  useEffect(() => {
    if (isSearching && selectedLocation) {
      updateMapRegion(
        selectedLocation.latitude,
        selectedLocation.longitude,
        selectedRadius
      );

      refetch();
    }
  }, [queryData, selectedRadius]);

  useEffect(() => {
    if (isSuccess) {
      console.log(searchResponse);
    } else if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  const showPlaceDetails = (place: any) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const mapRef = useRef<MapView>(null);
  const cycleMapType = () => {
    const currentIndex = mapTypes.indexOf(mapType);
    const nextIndex = (currentIndex + 1) % mapTypes.length;
    setMapType(
      mapTypes[nextIndex] as "standard" | "satellite" | "hybrid" | "terrain"
    );
  };

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
    setSearchResult(false);
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
      updateMapRegion(
        selectedLocation.latitude,
        selectedLocation.longitude,
        selectedRadius
      );
      setSearchResult(true);
    }
  };

  const getZoomLevel = (radius: number) => {
    return Math.log2(360 * (40075017 / (radius * 1000 * 256))) - 1;
  };

  const updateMapRegion = (
    latitude: number,
    longitude: number,
    radius: number
  ) => {
    const zoomLevel = getZoomLevel(radius);
    const latDelta = (radius * 2) / 111.32;
    const lonDelta =
      (radius * 2) / (111.32 * Math.cos(latitude * (Math.PI / 180)));

    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: latDelta,
        longitudeDelta: lonDelta,
      },
      1000
    );
  };

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
            <SvgUri width="40" height="40" uri={place.category.linkURL} />
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity
        style={{ ...styles.floatingButton, bottom: 72, right: 20 }}
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
              limit:
                value == 0.5
                  ? 20
                  : value == 1
                  ? 30
                  : value == 2
                  ? 40
                  : value == 5
                  ? 50
                  : value == 10
                  ? 100
                  : 200,
            });
          }}
          items={radiusOptions}
          value={selectedRadius}
          style={pickerSelectStyles}
          placeholder={{ label: "Chọn bán kính", value: null }}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSearchResult(false)}
        visible={searchResult}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSearchResult(false)}
            >
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
            <View
              style={{ width: "100%", alignItems: "center", marginVertical: 8 }}
            >
              <View
                style={{
                  height: 6,
                  width: 60,
                  backgroundColor: Colors.dark.neutralColor_5,
                  borderRadius: 10,
                  opacity: 0.5,
                }}
              ></View>
            </View>
            <Text
              style={{
                ...typographyStyles.heading_H1,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Kết quả
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Ionicons
                style={{ marginRight: 12 }}
                name="filter-sharp"
                size={24}
                color="black"
              />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderColor: Colors.dark.neutralColor_5,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      ...typographyStyles.body_L,
                      fontWeight: "700",
                    }}
                  >
                    Hiện đang mở
                  </Text>
                </View>
                <View
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderColor: Colors.dark.neutralColor_5,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginLeft: 12,
                  }}
                >
                  <Text
                    style={{
                      ...typographyStyles.body_L,
                      fontWeight: "700",
                    }}
                  >
                    Được xếp hạng cao nhất
                  </Text>
                </View>
                <View
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderColor: Colors.dark.neutralColor_5,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginLeft: 12,
                  }}
                >
                  <Text
                    style={{
                      ...typographyStyles.body_L,
                      fontWeight: "700",
                    }}
                  >
                    Gần đây nhất
                  </Text>
                </View>
              </ScrollView>
            </View>
            <ScrollView
              style={{
                marginTop: 12,
                minHeight: 400,
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {searchResponse && searchResponse.data.length > 0 ? (
                searchResponse.data.map((place) => (
                  <View key={place.id} style={{ marginBottom: 24 }}>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                    >
                      {place.images.length > 0 ? (
                        place.images.map((image) => {
                          return (
                            <Image
                              source={
                                image.url
                                  ? { uri: image.url }
                                  : require("../../../../assets/images/default_business.png")
                              }
                              defaultSource={require("../../../../assets/images/default_business.png")}
                              onError={(error) =>
                                console.log("Image loading error:", error)
                              }
                              style={{
                                borderRadius: 12,
                                width: 165,
                                height: 165,
                                marginRight: 12,
                              }}
                            />
                          );
                        })
                      ) : (
                        <Image
                          source={require("../../../../assets/images/default_business.png")}
                          style={{
                            borderRadius: 12,
                            width: 165,
                            height: 165,
                            marginRight: 12,
                          }}
                        />
                      )}
                    </ScrollView>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginTop: 6, flex: 9 }}>
                        <Text
                          style={{
                            ...typographyStyles.body_L,
                            fontWeight: "700",
                          }}
                        >
                          {place.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              ...typographyStyles.body_M,
                              ...colorStyles.neutralColorDark_3,
                            }}
                          >
                            {place.overallRating.toFixed(1)}
                          </Text>

                          <View
                            style={{
                              marginLeft: 4,
                              marginBottom: 4,
                              flexDirection: "row",
                            }}
                          >
                            {[1, 2, 3, 4, 5].map((index) => {
                              const starValue = place.overallRating - index + 1;
                              if (starValue >= 1) {
                                return (
                                  <MaterialIcons
                                    key={index}
                                    name="star"
                                    size={18}
                                    color={Colors.support.warningColor_1}
                                  />
                                );
                              } else if (starValue > 0) {
                                return (
                                  <MaterialIcons
                                    key={index}
                                    name="star-half"
                                    size={18}
                                    color={Colors.support.warningColor_1}
                                  />
                                );
                              } else {
                                return (
                                  <MaterialIcons
                                    key={index}
                                    name="star-outline"
                                    size={18}
                                    color={Colors.support.warningColor_1}
                                  />
                                );
                              }
                            })}
                          </View>

                          <Text
                            style={{
                              ...typographyStyles.body_M,
                              ...colorStyles.neutralColorDark_3,
                              marginLeft: 4,
                            }}
                          >{`(${place.totalReview}) . `}</Text>
                          <Text
                            style={{
                              ...typographyStyles.body_M,
                              ...colorStyles.neutralColorDark_3,
                              marginLeft: 4,
                            }}
                          >{`${(place._distance / 1000).toFixed(1)} km`}</Text>
                        </View>

                        <Text
                          style={{
                            ...typographyStyles.body_M,
                            ...colorStyles.neutralColorDark_3,
                          }}
                        >
                          {place.category.name}
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              ...typographyStyles.body_M,
                              ...colorStyles.supportColorSuccess_1,
                            }}
                          >
                            Đang mở cửa .
                          </Text>
                          <Text
                            style={{
                              ...typographyStyles.body_M,
                              marginLeft: 4,
                            }}
                          >
                            Đóng cửa lúc 20:30
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 2,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            onFlyTo({
                              latitude: place.location.coordinates[1],
                              longitude: place.location.coordinates[0],
                              latitudeDelta: 0.005,
                              longitudeDelta: 0.005,
                            })
                          }
                        >
                          <View
                            style={{
                              height: 50,
                              width: 50,
                              borderRadius: 50,
                              borderColor: Colors.dark.neutralColor_5,
                              borderWidth: 1,
                              marginTop: 12,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FontAwesome6
                              name="diamond-turn-right"
                              size={24}
                              color={Colors.highlight.highlightColor_1}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View>
                  <Image
                    source={require("../../../../assets/images/not-found.png")}
                    style={{
                      width: 200,
                      height: 200,
                      alignSelf: "center",
                      marginTop: 100,
                    }}
                  />
                  <Text
                    style={{
                      ...typographyStyles.heading_H3,
                      marginTop: 10,
                      alignSelf: "center",
                    }}
                  >
                    Không tìm thấy kết quả nào
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    paddingTop: 0,
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
    bottom: 10,
    right: 10,
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

    borderWidth: 2,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    marginBottom: 12,
    height: 40,
  },
});
