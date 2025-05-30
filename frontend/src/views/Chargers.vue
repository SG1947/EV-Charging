<template>
  <div>
    

    <!-- Filter Section -->
    <div class="filters-container">
      <label>
        Status:
        <select v-model="filters.status">
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>

      <label>
        Connector:
        <select v-model="filters.connectorType">
          <option value="">All</option>
          <option>Type 1</option>
          <option>Type 2</option>
          <option>CCS</option>
          <option>CHAdeMO</option>
          <option>Tesla</option>
        </select>
      </label>

      <label>
        Min Power (kW):
        <input type="number" v-model.number="filters.minPower" />
      </label>

      <label>
        Max Power (kW):
        <input type="number" v-model.number="filters.maxPower" />
      </label>
    </div>
    
    
    <h1 class="title">Charging Stations</h1>
    <!-- Station List -->
    <div class="card-grid">
      <div class="station-card" v-for="station in filteredStations" :key="station._id">
        <div class="station-details">
          <h3>{{ station.name }}</h3>
          <p><strong>Status:</strong> {{ station.status }}</p>
          <p><strong>Power:</strong> {{ station.powerOutput }} kW</p>
          <p><strong>Connector:</strong> {{ station.connectorType }}</p>
        </div>
        <div class="card-actions" v-if="auth.isLoggedIn">
          <button @click="edit(station._id)">Edit</button>
          <button @click="remove(station._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <MapView /> 
</template>


<script setup>
import MapView from './MapView.vue';
import { onMounted, ref, computed } from 'vue';
import api from '../api/http';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const stations = ref([]);
const router = useRouter();
const auth = useAuthStore();

const filters = ref({
  status: '',
  connectorType: '',
  minPower: 0,
  maxPower: 1000
});

const fetchStations = async () => {
  const { data } = await api.get('/stations');
  stations.value = data;
};

const filteredStations = computed(() => {
  return stations.value.filter(s => {
    const statusMatch = !filters.value.status || s.status === filters.value.status;
    const connectorMatch = !filters.value.connectorType || s.connectorType === filters.value.connectorType;
    const minPowerMatch = s.powerOutput >= filters.value.minPower;
    const maxPowerMatch = s.powerOutput <= filters.value.maxPower;
    return statusMatch && connectorMatch && minPowerMatch && maxPowerMatch;
  });
});

const edit = (id) => router.push(`/chargers/edit/${id}`);

const remove = async (id) => {
  await api.delete(`/stations/${id}`);
  fetchStations();
};

const logout = () => {
  auth.logout();
  router.push('/chargers');
};

onMounted(fetchStations);
</script>
<style src="./css/Chargers.css"></style>
