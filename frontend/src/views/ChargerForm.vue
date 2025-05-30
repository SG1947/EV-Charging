
<template>
  <div class="form-container">
    <h2>{{ isEdit ? 'Edit' : 'Add' }} Charger</h2>
    <form @submit.prevent="save">
      <label>
        Name:
        <input v-model="form.name" placeholder="Name" required />
      </label>

      <label>
        Status:
        <select v-model="form.status" required>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </label>

      <label>
        Power Output (kW):
        <input v-model.number="form.powerOutput" type="number" required />
      </label>

      <label>
        Connector Type:
        <select v-model="form.connectorType" required>
          <option disabled value="">Select Connector Type</option>
          <option>Type 1</option>
          <option>Type 2</option>
          <option>CCS</option>
          <option>CHAdeMO</option>
          <option>Tesla</option>
        </select>
      </label>

      <label>Location (Click on map):</label>
      <div id="map" class="leaflet-map"></div>
      <p v-if="form.location.lat">Selected: {{ form.location.lat }}, {{ form.location.lng }}</p>

      <div class="form-actions">
        <button type="submit">Save</button>
        <button type="button" @click="cancel" class="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted ,nextTick} from 'vue';
import { useRoute, useRouter } from 'vue-router';


import api from '../api/http';
import L from 'leaflet';

const route = useRoute();
const router = useRouter();

const isEdit = !!route.params.id;

const form = ref({
  name: '',
  location: { lat: 0, lng: 0 },
  status: 'Active',
  powerOutput: 0,
  connectorType: '',
});

let map, marker;

onMounted(async () => {
  if (isEdit) {
    const { data } = await api.get('/stations');
    const charger = data.find(c => c._id === route.params.id);
    if (charger) {
      Object.assign(form.value, charger);

    }
  }

  await nextTick(() => {
    map = L.map('map').setView([form.value.location.lat || 20.5937, form.value.location.lng || 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    if (form.value.location.lat && form.value.location.lng) {
      marker = L.marker([form.value.location.lat, form.value.location.lng]).addTo(map);
    }

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      form.value.location = { lat, lng };

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }
    });
  });
});

const save = async () => {
  try {
    if (!form.value.location.lat || !form.value.location.lng) {
      alert("Please select a location on the map.");
      return;
    }

    if (isEdit) {
      await api.put(`/stations/${route.params.id}`, form.value);
    } else {
      await api.post('/stations', form.value);
    }
    router.push('/chargers');
  } catch (e) {
    alert('Failed to save charger');
  }
};

const cancel = () => {
  router.push('/chargers');
};
</script>



<style src="./css/ChargerForm.css"></style>
