"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons missing in Next.js/Webpack environments
const initMarkerIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
};

export default function Map() {
  useEffect(() => {
    initMarkerIcon();
  }, []);

  // Coordinates for House 14, Road 11, Banani, Dhaka
  const position: [number, number] = [23.7937, 90.4066];

  return (
    <MapContainer 
      center={position} 
      zoom={14} 
      scrollWheelZoom={false}
      className="w-full h-full z-0"
    >
      {/* 
        Using CartoDB Positron tile layer for a cleaner, muted look 
        that matches the warm design aesthetic of the site.
      */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position}>
        <Popup className="font-sans text-sm">
          <strong>Food Flow</strong> <br />
          House 14, Road 11 <br />
          Banani, Dhaka 1213
        </Popup>
      </Marker>
    </MapContainer>
  );
}