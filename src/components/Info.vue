<template>
  <div class="info">
    <div class="info__weather">
      <h4 class="weather__title">
        14&deg; C
        <img src="https://openweathermap.org/img/wn/03d@2x.png" />
      </h4>
      <div class="weather__other">
        <h6>London, UK</h6>
        <strong class="stronged">Cloudy</strong>
        <p>Wind: 24km/h</p>
      </div>
    </div>
    <div class="info__block">
      <strong>Fact:</strong>
      <br />
      <p>{{ fact }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";

const fact = ref("");

async function fetchFacts() {
  const response = await fetch("https://api.api-ninjas.com/v1/facts?limit=1", {
    headers: {
      "X-Api-Key": "03JfYKmfJUBuE0uHRw3LWQ==kYILicr6xYCborBf",
    },
  });

  fact.value = await response.json();
  fact.value = fact.value[0].fact;
}

async function fetchWeather(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=2137fbeb1b0b373eee831fa216fd34d9`
  );
  const weather = await response.json();
  console.log(weather);
}

async function fetchIP() {
  const response = await fetch("http://ip-api.com/json");
  const ip = await response.json();
  fetchWeather(ip.lat, ip.lon);
}

onMounted(() => {
  fetchFacts();
  fetchIP();
});
</script>

<style lang="scss" scoped>
body.light {
  .info {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);

    * {
      color: #fff;
    }
  }
}

body.dark {
  .info {
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);

    * {
      color: #fff;
    }
  }
}

.info {
  border-radius: 6px;
  backdrop-filter: blur(20px);
  width: 70%;
  margin: 0 auto;
  padding: 6px;

  display: grid;
  grid-template-columns: auto 70%;
  justify-content: space-between;
  align-items: center;

  &__weather {
    display: flex;
    flex-direction: column;
    width: 100%;

    .weather__title {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      img {
        height: 60px;
      }
    }
  }
}
</style>
