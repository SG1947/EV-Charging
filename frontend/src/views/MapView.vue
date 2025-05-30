<template>
  <div class="map-container">
    <h2 class="title">Charging Stations Map</h2>
    <div id="map" class="leaflet-map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import api from '../api/http';
import 'leaflet/dist/leaflet.css'; // This is often missed

// Import the marker icon images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet’s broken default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
onMounted(async () => {
  const { data } = await api.get('/stations');

  const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India or your region

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  data.forEach(station => {
    const { lat, lng } = station.location;
    const marker = L.marker([lat, lng]).addTo(map);

    const popupContent = `
      <strong>${station.name}</strong><br>
      Status: ${station.status}<br>
      Power: ${station.powerOutput} kW<br>
      Connector: ${station.connectorType}
    `;

    marker.bindPopup(popupContent);
  });
});
</script>


<style src="./css/MapView.css"></style>
