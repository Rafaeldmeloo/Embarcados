import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [objectLocation, setObjectLocation] = useState(null);
  const [objectList, setObjectList] = useState([]); // Lista de objetos

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocalização não é suportada pelo navegador.');
      return;
    }
  
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      },
      {
        enableHighAccuracy: true, // usa GPS se disponível
        maximumAge: 0,            // não usa cache
        timeout: 5000,            // tempo máximo para tentar pegar localização
      }
    );
  
    return () => {
      navigator.geolocation.clearWatch(watchId); // limpa quando desmontar
    };
  }, []);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/objetos'); // Ajuste a URL se precisar
        const data = await response.json();
        const names = data.map((obj) => obj.name);
        setObjectList(names);
      } catch (error) {
        console.error('Erro ao buscar objetos:', error);
      }
    };

    fetchObjects(); // busca imediatamente

    const interval = setInterval(fetchObjects, 5000); // busca a cada 5 segundos

    return () => clearInterval(interval); // limpa o intervalo quando desmonta
  }, []);

  const handleCreate = async () => {
    if (selectedObjects.length === 0) {
      alert('Selecione um objeto primeiro!');
      return;
    }
  
    const selectedName = selectedObjects[0]; // pega o primeiro selecionado
    
    try {
      const response = await fetch(`http://localhost:3001/registro/${selectedName}/latest`);
      const data = await response.json();
  
      console.log('Dados recebidos:', data);
  
      if (data.coordenada) {
        // separa a string em latitude e longitude
        const [latStr, lonStr] = data.coordenada.split(',').map(coord => coord.trim());
        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);
  
        if (!isNaN(lat) && !isNaN(lon)) {
          setObjectLocation([lat, lon]);
        } else {
          console.error('Coordenadas inválidas:', data.coordenada);
        }
      } else {
        console.error('Coordenada não encontrada no objeto');
      }
    } catch (error) {
      console.error('Erro ao buscar objeto:', error);
    }
  };
  

  const calculateDistance = () => {
    if (!currentLocation || !objectLocation) return null;

    const toRad = (val) => (val * Math.PI) / 180;
    const [lat1, lon1] = currentLocation;
    const [lat2, lon2] = objectLocation;

    const R = 6371; // Raio da Terra em KM
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  return (
    <div className={styles.container}>
      <Map
        setObjectLocation={setObjectLocation}
        objectLocation={objectLocation}
        currentLocation={currentLocation}
      />

      <select
        multiple
        className={styles.select}
        onChange={(e) =>
          setSelectedObjects(Array.from(e.target.selectedOptions).map((o) => o.value))
        }
      >
        {objectList.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {currentLocation && objectLocation && (
        <p>Distância até o objeto: {calculateDistance()} km</p>
      )}

      <button className={styles.button} onClick={handleCreate}>
        Achar Objeto
      </button>
    </div>
  );
}
