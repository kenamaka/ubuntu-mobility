import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import * as Location from "expo-location";
import { useDriverStore, useLocationStore } from "@/store";
import Loading from "./Loading";
import { generateMarkersFromData } from "@/lib/map";
import mock_driver from "@/constants/mock_drivers";
import { MarkerData } from "@/types/types";
import { icons } from "@/constants";

const customMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#dce4f1" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "on" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#c4c4c4" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#c4c4c4" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: " #defff0" }],
  },
];

type MapProps = {
  onRecenterRef?: (fn: () => void) => void;
};

export default function Map({ onRecenterRef }: MapProps) {
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
        async (location) => {
          const { latitude, longitude } = location.coords;

          let fullAddress = null;
          try {
            const results = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });

            if (results.length > 0) {
              fullAddress = results[0];
            }
          } catch (error) {
            console.error("Failed to reverse geocode:", error);
          }

          setUserLocation({
            latitude,
            longitude,
            address: `${fullAddress?.streetNumber || ""}, ${
              fullAddress?.street || ""
            }`,
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

  useEffect(() => {
    if (onRecenterRef) {
      onRecenterRef(handleRecenter);
    }
  }, [userLatitude, userLongitude]);

  return (
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
  );
}
