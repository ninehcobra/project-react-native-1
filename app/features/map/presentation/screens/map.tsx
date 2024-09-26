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
  ImageSourcePropType,
} from "react-native";
import MapView, { Circle, LatLng, Marker } from "react-native-maps";
import { TextInput } from "react-native-paper";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFindNearByQuery } from "@/services/near-by.service";
import { IFindNearByPayLoad } from "@/types/near-by";
import { IBusiness } from "@/types/business";
import RNPickerSelect from "react-native-picker-select";
import { SvgUri } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBusiness } from "@/redux/slices/selected-business.slice";
import SearchModal from "../components/SearchModal";
import DetailModal from "../components/DetailModal";

import { RADIUSOPTIONS } from "@/constants/radius";
import { MAPTYPES, MAPTYPESLIST } from "@/constants/map";
import { Colors } from "@/constants/colors";
import { RootState } from "@/redux/store";
import {
  IPreviewImage,
  setPreviewImage,
} from "@/redux/slices/preview-image.slice";
import ImagePreviewModal from "../components/ImagePreviewModal";

export default function Map({
  navigation,
}: {
  navigation: any;
}): React.ReactNode {
  const [mapType, setMapType] = useState<
    MAPTYPES.HYBRID | MAPTYPES.STANDARD | MAPTYPES.TERRAIN | MAPTYPES.SATELLITE
  >(MAPTYPES.TERRAIN);

  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedRadius, setSelectedRadius] = useState<number>(5);

  const [searchResult, setSearchResult] = useState<boolean>(false);

  const [isGetData, setIsGetData] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleOnClosePreviewImage = (value: boolean): void => {
    dispatch(setPreviewImage({ isPreview: value, image: null }));
  };

  const imagePreview: IPreviewImage = useSelector(
    (state: RootState) => state.previewImage
  );

  const [queryData, setQueryData] = useState<IFindNearByPayLoad>({
    latitude: position[0],
    longitude: position[1],
    radius: selectedRadius,
    q: "",
    limit: 200,
  });
  const {
    data: searchResponse,
    isSuccess,
    isError,
    error,
    refetch,
  } = useFindNearByQuery(queryData, {
    skip: !isSearching,
  });

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
    } else if (isError) {
    }
  }, [isSuccess, isError]);

  const mapRef = useRef<MapView>(null);
  const cycleMapType = () => {
    const currentIndex = MAPTYPESLIST.indexOf(mapType);
    const nextIndex = (currentIndex + 1) % MAPTYPESLIST.length;
    setMapType(MAPTYPESLIST[nextIndex]);
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
      setIsGetData(true);
      setTimeout(() => {
        setIsGetData(false);
      }, 500);
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

  const handleClickPopUp = (business: IBusiness): void => {
    dispatch(
      setSelectedBusiness({
        selectedBusinessId: business.id,
        selectedBusinessData: business,
      })
    );

    setModalVisible(true);
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
            onPress={() => handleClickPopUp(place)}
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

      <DetailModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
          items={RADIUSOPTIONS}
          value={selectedRadius}
          style={pickerSelectStyles}
          placeholder={{ label: "Chọn bán kính", value: null }}
        />
      </View>

      <SearchModal
        isGetData={isGetData}
        setSearchResult={setSearchResult}
        searchResult={searchResult}
        searchResponse={searchResponse}
        onFlyTo={onFlyTo}
      />

      <ImagePreviewModal
        isOpen={imagePreview.isPreview}
        imageSource={imagePreview.image}
        setIsOpen={handleOnClosePreviewImage}
      />
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
