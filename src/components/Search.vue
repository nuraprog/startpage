<template>
  <div class="search-bar">
    <input
      v-model="field"
      @keypress.enter="search"
      type="text"
      placeholder="Search in the Web"
    />

    <button @click="search" type="button">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const field = ref("");

function search() {
  if (field.value) {
    window.location = `https://google.com/search?q=${field.value}`;
  }
}
</script>

<style lang="scss" scoped>
body.light {
  .search-bar {
    input {
      background: rgba(255, 255, 255, 0.3);

      &::placeholder,
      & {
        color: #fff;
      }

      &:hover {
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
      }

      &:focus {
        background: rgba(0, 0, 0, 0.4);
      }
    }

    button {
      background: rgba(255, 255, 255, 0.9);

      &::placeholder {
        color: #aaa;
      }

      &:hover {
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

body.dark {
  .search-bar {
    input {
      background: rgba(0, 0, 0, 0.3);

      &::placeholder,
      & {
        color: #fff;
      }

      &:hover {
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
      }

      &:focus {
        background: rgba(0, 0, 0, 0.4);
      }
    }

    button {
      background: rgba(0, 0, 0, 0.9);

      & {
        color: #fff;
      }

      &:hover {
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.search-bar {
  width: 70%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: auto 50px;
  grid-template-rows: repeat(3, 25px);
  align-items: center;

  input {
    width: 100%;
    height: 100%;
    border: none;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    transition: 300ms;

    backdrop-filter: blur(20px);
    outline: none;
    padding: 2px 6px;
  }

  button {
    border: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    height: 100%;
    cursor: pointer;
    backdrop-filter: blur(20px);
    transition: 300ms;

    i {
      transform: scale(0.7);
      transition: 100ms;
    }

    &:active {
      i {
        transform: scale(0.5);
      }
    }

    img {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
