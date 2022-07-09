<template>
  <button class="settings-button" type="button" @click="settingsModal.open">
    Settings
  </button>

  <transition name="fade">
    <div
      class="settings__shadow"
      v-if="settingsModal.isOpen.value"
      @click="settingsModal.close"
    ></div>
  </transition>

  <transition name="fade">
    <div class="settings" v-if="settingsModal.isOpen.value">
      <div class="settings__header blur">
        <h4>Settings</h4>

        <button type="button" @click="defaultSettings">
          Return to default
        </button>
      </div>

      <div class="settings__main">
        <div class="settings__card wallpaper">
          <h6>Wallpaper</h6>

          <div class="card__body">
            <div
              class="card__border"
              :class="{ current: item == settingsData.images.current }"
              v-for="(item, idx) in settingsData.images.data"
              :key="idx"
              @click="settingsData.images.changeBackground(idx)"
            >
              <img :src="'/src/assets/imgs/' + item" alt="" />
            </div>
          </div>
        </div>
        <div class="settings__card theme">
          <h6>Theme</h6>

          <div class="card__body">
            <label class="switch">
              <input
                type="checkbox"
                @click="toggleTheme"
                :checked="getTheme() === 'dark'"
              />
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div class="settings__card features">
          <h6>Features</h6>

          <div class="card__body">
            <label for="search">
              <p>Search Form</p>

              <input
                id="search"
                type="checkbox"
                v-model="settingsData.features.searchForm"
              />
            </label>

            <label for="interesting">
              <p>Interesting</p>

              <input
                id="interesting"
                type="checkbox"
                v-model="settingsData.features.interesting"
              />
            </label>

            <label for="favorites">
              <p>Favorites</p>

              <input
                id="favorites"
                type="checkbox"
                v-model="settingsData.features.favorites"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <div class="container main">
    <Search v-if="settingsData.features.searchForm" />
    <div v-if="settingsData.features.interesting">
      <Info v-if="network" />
    </div>
    <Favorites v-if="settingsData.features.favorites" />
  </div>
</template>

<script setup>
import Search from "./components/Search.vue";
import Info from "./components/Info.vue";
import Favorites from "./components/Favorites.vue";

import {
  onMounted,
  ref,
  reactive,
  watch,
  onBeforeMount,
  watchEffect,
} from "vue";
import { toggleTheme, getTheme, initTheme } from "./plugins/theme";

onBeforeMount(() => {
  initTheme();
});

const network = navigator.onLine;
const settingsModal = modal();
const settingsData = reactive({
  backgroundColor: "",
  images: {
    data: ["city.jpg", "nature.jpg"],

    current: localStorage.getItem("background")
      ? localStorage.getItem("background")
      : "city.jpg",

    changeBackground(idx) {
      this.current = this.data[idx];
      document.querySelector(
        "#app"
      ).style.backgroundImage = `url("/src/assets/imgs/${this.current}")`;
      localStorage.setItem("background", this.current);
    },
    initBackground() {
      document.querySelector(
        "#app"
      ).style.backgroundImage = `url("/src/assets/imgs/${this.current}")`;
    },
  },
  features: {
    searchForm: true,
    interesting: true,
    favorites: true,
  },
});

watch(
  () => settingsData.features,
  () => localStorage.setItem("features", JSON.stringify(settingsData.features)),
  { deep: true }
);

onMounted(() => {
  settingsData.images.initBackground();

  if (localStorage.getItem("features")) {
    settingsData.features = JSON.parse(localStorage.getItem("features"));
  }
});

function modal() {
  const isOpen = ref(false);

  return {
    isOpen,

    open() {
      isOpen.value = true;
    },

    close() {
      isOpen.value = false;
    },
  };
}

function defaultSettings() {
  settingsData.images.changeBackground(0);
  toggleTheme("light");
}
</script>

<style lang="scss">
body.light {
  #app {
    .settings-button {
      background: rgba(255, 255, 255, 0.6);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .settings__shadow {
      background: rgba(0, 0, 0, 0.3);
    }

    .settings {
      background: rgb(255, 255, 255);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

      &__header {
        background: rgba(0, 0, 0, 0);

        button {
          color: #000;
          background: rgba(255, 255, 255, 0.4);

          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
        }
      }

      &__main {
        & > *:not(:last-child) {
          border-bottom: 1px solid #ccc;
        }

        .wallpaper {
          .card__body {
            .card__border {
              &.current {
                background: #0091ff;
              }
            }
          }
        }

        .features {
          label {
            &:not(&:last-of-type) {
              border-bottom: 1px solid #ccc;
            }
          }
        }
      }
    }

    .main {
    }
  }
}

body.dark {
  #app {
    .settings-button {
      background: rgba(0, 0, 0, 0.4);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
      color: #fff;
    }

    .settings__shadow {
      background: rgba(0, 0, 0, 0.3);
    }

    .settings {
      background: rgb(20, 20, 20);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      color: #fff;

      &__header {
        background: rgba(0, 0, 0, 0.4);

        button {
          color: #fff;
          background: rgba(50, 50, 50, 0.3);

          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
        }
      }

      &__main {
        & > *:not(:last-child) {
          border-bottom: 1px solid #000;
        }

        .wallpaper {
          .card__body {
            .card__border {
              &.current {
                background: #0091ff;
              }
            }
          }
        }

        .features {
          label {
            &:not(&:last-of-type) {
              border-bottom: 1px solid #000;
            }
          }
        }
      }
    }
  }
}

#app {
  background-image: url("./assets/imgs/city.jpg");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  transition: 300ms;
  height: 100vh;
  overflow: auto;
  width: 100%;

  .settings-button {
    position: absolute;
    right: 0;
    left: auto;
    bottom: auto;
    z-index: 99;
    margin: 6px;

    cursor: pointer;
    backdrop-filter: blur(20px);
    border: none;
    border-radius: 6px;
    padding: 2px 4px;
  }

  .settings__shadow {
    position: absolute;
    z-index: 999;
  }

  .settings {
    position: absolute;
    z-index: 1000;

    top: 10vh;
    margin: 0 auto;

    max-width: 400px;
    height: 80vh;
    max-height: 500px;
    overflow-y: auto;
    border-radius: 6px;

    &::-webkit-scrollbar {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    img {
      width: 100%;
    }

    &__header {
      position: sticky;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      z-index: 9;
      padding: 4px;
      backdrop-filter: blur(15px);

      button {
        border: none;
        border-radius: 6px;
        cursor: pointer;
        padding: 0px 4px;
        transition: 200ms;
      }
    }

    &__main {
      padding: 4px;

      display: flex;
      flex-direction: column;
      grid-gap: 6px;

      position: relative;
      z-index: 8;

      & > *:not(:last-child) {
        padding-bottom: 6px;
      }

      .theme {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .wallpaper {
        display: flex;
        flex-direction: column;
        grid-gap: 8px;

        .card__body {
          display: grid;
          grid-template-columns: repeat(auto-fit, 100px);
          grid-gap: 4px;

          .card__border {
            cursor: pointer;
            transition: 300ms;

            &.current {
              z-index: 9;
              pointer-events: none;
              cursor: default;
            }
          }
        }
      }

      .features {
        display: flex;
        flex-direction: column;
        grid-gap: 12px;

        label {
          display: flex;
          justify-content: space-between;
          padding: 6px 0px;
          cursor: pointer;
        }
      }
    }
  }

  .main {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;

  input {
    display: none;
  }

  input:checked + .slider {
    background-color: #000;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
    content: "\f186";
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 200ms;

    &.round {
      border-radius: 34px;

      &:before {
        border-radius: 50%;
      }
    }

    &:before {
      position: absolute;
      content: "\f185";
      font-family: "Font Awesome 5 Free";
      font-weight: 400;
      transform: scale(0.8);
      top: 1px;
      transition: 200ms;
    }
  }
}

@media screen and (max-width: 401px) {
  .main {
    justify-content: start !important;
  }
}
</style>

