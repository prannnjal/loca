"use client"

import { useState, useCallback, useRef } from "react"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

// Sample cafe locations across India
const cafeLocations = [
  { id: 1, name: "ZOCA Cafe - Delhi", address: "Connaught Place, New Delhi", lat: 28.6329, lng: 77.2195 },
  { id: 2, name: "ZOCA Cafe - Mumbai", address: "Bandra West, Mumbai", lat: 19.0596, lng: 72.8295 },
  { id: 3, name: "ZOCA Cafe - Bangalore", address: "Indiranagar, Bangalore", lat: 12.9784, lng: 77.6408 },
  { id: 4, name: "ZOCA Cafe - Chennai", address: "Nungambakkam, Chennai", lat: 13.0569, lng: 80.2425 },
  { id: 5, name: "ZOCA Cafe - Kolkata", address: "Park Street, Kolkata", lat: 22.5726, lng: 88.3639 },
  { id: 6, name: "ZOCA Cafe - Hyderabad", address: "Jubilee Hills, Hyderabad", lat: 17.4344, lng: 78.3866 },
  { id: 7, name: "ZOCA Cafe - Pune", address: "Koregaon Park, Pune", lat: 18.5362, lng: 73.8913 },
  { id: 8, name: "ZOCA Cafe - Jaipur", address: "C Scheme, Jaipur", lat: 26.9124, lng: 75.7873 },
]

const containerStyle = {
  width: "100%",
  height: "500px",
}

// Center the map on India
const center = {
  lat: 20.5937,
  lng: 78.9629,
}

export default function LocationMap() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const mapRef = useRef(null)

  // Load the Google Maps JavaScript API
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY", // Replace with your actual API key in production
  })

  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = null
  }, [])

  const handleMarkerClick = (location) => {
    setSelectedLocation(location)
  }

  const handleInfoWindowClose = () => {
    setSelectedLocation(null)
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })

          if (mapRef.current) {
            mapRef.current.panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
            mapRef.current.setZoom(12)
          }
        },
        (error) => {
          console.error("Error getting user location:", error)
          alert("Unable to get your location. Please check your browser permissions.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }

  const findNearestCafe = () => {
    if (!userLocation) {
      alert("Please share your location first.")
      return
    }

    let nearestCafe = null
    let shortestDistance = Number.POSITIVE_INFINITY

    cafeLocations.forEach((cafe) => {
      const distance = calculateDistance(userLocation.lat, userLocation.lng, cafe.lat, cafe.lng)

      if (distance < shortestDistance) {
        shortestDistance = distance
        nearestCafe = cafe
      }
    })

    if (nearestCafe) {
      setSelectedLocation(nearestCafe)
      if (mapRef.current) {
        mapRef.current.panTo({ lat: nearestCafe.lat, lng: nearestCafe.lng })
        mapRef.current.setZoom(15)
      }
    }
  }

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  if (loadError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-center">
        Error loading maps. Please try again later.
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="h-[500px] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
          <p className="mt-4 text-gray-700">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 mb-4">
        <Button onClick={getUserLocation} className="flex items-center gap-2 bg-black hover:bg-gray-800">
          <MapPin className="h-4 w-4" />
          Share My Location
        </Button>
        <Button
          onClick={findNearestCafe}
          variant="outline"
          className="flex items-center gap-2 border-black text-black hover:bg-black hover:text-white"
          disabled={!userLocation}
        >
          <Navigation className="h-4 w-4" />
          Find Nearest Cafe
        </Button>
      </div>

      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onMapLoad}
          onUnmount={onUnmount}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {/* User location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: "M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                fillColor: "#3b82f6",
                fillOpacity: 1,
                strokeColor: "#1d4ed8",
                strokeWeight: 1,
                scale: 2,
                anchor: { x: 10, y: 20 },
              }}
            />
          )}

          {/* Cafe location markers */}
          {cafeLocations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleMarkerClick(location)}
              icon={{
                path: "M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                fillColor: "#000000",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
                scale: 2,
                anchor: { x: 10, y: 20 },
              }}
            />
          ))}

          {/* Info window for selected location */}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-bold text-gray-900">{selectedLocation.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{selectedLocation.address}</p>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800"
                  >
                    Get Directions
                  </a>
                  <button
                    className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200"
                    onClick={handleInfoWindowClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <p>
          <strong>Note:</strong> In a production environment, you would need to replace "YOUR_API_KEY" with an actual
          Google Maps API key. For security reasons, you should restrict the API key to your domain and enable only the
          necessary Google Maps services.
        </p>
      </div>
    </div>
  )
}
