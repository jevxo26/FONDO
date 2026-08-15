"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { io, Socket } from "socket.io-client";

// Custom Bike/Rider Icon with Heading Rotation Style
const createRiderIcon = (heading: number | null) => {
    const rotationDegrees = heading || 0;
    return L.divIcon({
        className: "custom-rider-marker",
        html: `
      <div style="transform: rotate(${rotationDegrees}deg); transition: transform 0.3s ease-out; display: flex; align-items: center; justify-content: center;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="#000000" stroke="#FFFFFF" stroke-width="2"/>
          <path d="M12 3L16.5 17L12 14L7.5 17L12 3Z" fill="#22C55E"/>
        </svg>
      </div>
    `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
    });
};

// Customer Destination Icon
const destinationIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface LiveTrackingMapProps {
    trackingSessionId: string;
    destinationCoords?: [number, number]; // [lat, lng]
    socketUrl?: string;
}

interface RiderLocationState {
    latitude: number;
    longitude: number;
    heading: number | null;
    speed: number | null;
}

export default function LiveTrackingMap({
    trackingSessionId,
    destinationCoords = [22.356851, 91.783182], // Default Chattagram Destination
    socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
}: LiveTrackingMapProps) {
    const [riderLocation, setRiderLocation] = useState<RiderLocationState | null>(null);
    const [routeHistory, setRouteHistory] = useState<[number, number][]>([]);

    useEffect(() => {
        // Connect to WebSocket room as a Listener (Customer/Admin)
        const socket: Socket = io(socketUrl, {
            transports: ["websocket"],
            query: { trackingSessionId },
        });

        socket.on("connect", () => {
            console.log("Customer Map Socket Connected:", socket.id);
            socket.emit("join:tracking-session", { trackingSessionId });
        });

        // Listen to live location updates emitted by the rider
        socket.on("client:location-broadcast", (data: RiderLocationState) => {
            setRiderLocation(data);
            setRouteHistory((prev) => [...prev, [data.latitude, data.longitude]]);
        });

        return () => {
            socket.disconnect();
        };
    }, [trackingSessionId, socketUrl]);

    // Center position: Rider position or default destination
    const defaultCenter: [number, number] = riderLocation
        ? [riderLocation.latitude, riderLocation.longitude]
        : destinationCoords;

    return (
        <div className="h-full w-full relative">
            <MapContainer
                center={defaultCenter}
                zoom={15}
                scrollWheelZoom={true}
                className="h-full w-full rounded-3xl z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Rider Live Location Marker */}
                {riderLocation && (
                    <Marker
                        position={[riderLocation.latitude, riderLocation.longitude]}
                        icon={createRiderIcon(riderLocation.heading)}
                    >
                        <Popup>
                            <div className="text-xs space-y-1">
                                <p className="font-bold">Rider in Motion</p>
                                <p>Speed: {riderLocation.speed ? `${(riderLocation.speed * 3.6).toFixed(1)} km/h` : "N/A"}</p>
                            </div>
                        </Popup>
                    </Marker>
                )}

                {/* Customer Destination Marker */}
                <Marker position={destinationCoords} icon={destinationIcon}>
                    <Popup>Delivery Address</Popup>
                </Marker>

                {/* Traveled Route Line */}
                {routeHistory.length > 0 && (
                    <Polyline positions={routeHistory} color="#22C55E" weight={4} opacity={0.7} />
                )}
            </MapContainer>
        </div>
    );
}