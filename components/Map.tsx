import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import { View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

import { useDriverStore, useLocationStore } from "@/store";
import Loading from "./Loading";
import { generateMarkersFromData } from "@/lib/map";
import mock_driver from "@/constants/mock_drivers";
import { MarkerData } from "@/types/types";
import { icons } from "@/constants";

const customMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#fcf8f6" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "on" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#d3d3d3" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d3d3d3" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#03a9f4" }],
  },
];

export default function Map() {
  const mapRef = useRef<MapView | null>(null);
  const { setUserLocation, userLatitude, userLongitude } = useLocationStore();
  const { selectedDriver, setDrivers } = useDriverStore();

  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const hasUserLocation = userLatitude !== null && userLongitude !== null;

  const defaultRegion: Region = {
    latitude: userLatitude || 9.082,
    longitude: userLongitude || 8.6753,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 4000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;

          setUserLocation({
            latitude,
            longitude,
            address: "",
          });

          const nearbyDrivers = mock_driver.map((d) => ({
            id: parseInt(d.driver_id),
            first_name: d.first_name,
            last_name: d.last_name,
            profile_image_url: d.profile_picture,
            car_image_url: d.car_image,
            car_seats: parseInt(d.car_seats),
            rating: parseFloat(d.rating),
            latitude: latitude + (Math.random() - 0.5) * 0.01,
            longitude: longitude + (Math.random() - 0.5) * 0.01,
            type: d.type,
          }));

          const newMarkers = generateMarkersFromData({
            data: nearbyDrivers,
            userLatitude: latitude,
            userLongitude: longitude,
          });

          setMarkers(newMarkers);
          setDrivers(newMarkers);
        }
      );
    };

    startTracking();

    return () => {
      locationSubscription?.remove();
    };
  }, []);

  const handleRecenter = () => {
    if (userLatitude && userLongitude && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  if (!hasUserLocation) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={{ flex: 1 }}
        mapType="standard"
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsTraffic={false}
        showsIndoors={false}
        showsBuildings={true}
        userInterfaceStyle="light"
        initialRegion={defaultRegion}
        customMapStyle={customMapStyle}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            image={
              selectedDriver === marker.id ? icons.selectedMarker : icons.marker
            }
          />
        ))}
      </MapView>

      {/* Recenter Button */}
      <TouchableOpacity
        onPress={handleRecenter}
        style={{
          position: "absolute",
          bottom: 40,
          right: 20,
          backgroundColor: "white",
          padding: 12,
          borderRadius: 28,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <Ionicons name="locate" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}
