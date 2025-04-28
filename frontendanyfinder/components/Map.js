import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const userIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const objectIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map({ setObjectLocation, objectLocation, currentLocation }) {
  const [position, setPosition] = useState(currentLocation || [-23.55, -46.63]);
  const [autoCenter, setAutoCenter] = useState(true); // <- novo estado

  function LocationMarker() {
    const map = useMap();
  
    useMapEvents({
      dragstart() {
        setAutoCenter(false);
      },
      // Removido o clique para alterar o objeto!
    });
  
    useEffect(() => {
      if (autoCenter) {
        if (currentLocation && objectLocation) {
          const bounds = L.latLngBounds([currentLocation, objectLocation]);
          map.fitBounds(bounds, { padding: [50, 50] });
        } else if (objectLocation) {
          map.setView(objectLocation, 15);
        } else if (currentLocation) {
          map.setView(currentLocation, 15);
        }
      }
    }, [currentLocation, objectLocation, map, autoCenter]);
  
    return (
      <>
        {objectLocation && <Marker position={objectLocation} icon={objectIcon} />}
        {currentLocation && <Marker position={currentLocation} icon={userIcon} />}
      </>
    );
  }

  function handleRecentralizar() {
    setAutoCenter(true); // reativa o autoCenter
  }

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>

      {/* Botão de recentralizar */}
      <button
        onClick={handleRecentralizar}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1000,
          padding: '8px 12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Recentralizar
      </button>
    </div>
  );
}
