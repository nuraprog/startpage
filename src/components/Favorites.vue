<template>
  <div class="favorites">
    <transition-group name="list">
      <div
        class="favorites__main-item blur"
        v-for="(item, idx) in favorites"
        :key="idx"
        @click="goTo(item.url)"
      >
        <button
          type="button"
          class="favorites__params"
          @click="
            addLinkModal.isOpen.value = 'edit';
            modalFields = {
              inputName: item.name,
              inputUrl: item.url,
              idx: idx,
            };
          "
        >
          <img src="../assets/ellipsis-vertical-solid.svg" />
        </button>

        <a :href="item.url">
          <div class="favorites__item">
            <img
              :src="`https://www.google.com/s2/favicons?domain=${
                item.url
              }&sz=${64}`"
            />
            <p>
              {{
                !item.name
                  ? item.url.replace(/^https?:\/\//, "").replace(/\\$/, "")
                  : item.name
              }}
            </p>
          </div>
        </a>
      </div>

      <button
        type="button"
        class="favorites__btn"
        @click="addLinkModal.isOpen.value = 'add'"
      >
        +
      </button>
    </transition-group>
  </div>

  <transition name="fade">
    <modal-window v-if="addLinkModal.isOpen.value === 'add'">
      <template #header>
        <div class="modal__header">
          <h4>Add to Favorites</h4>
        </div>
      </template>
      <template #main>
        <div class="modal__main">
          <input
            type="text"
            v-model="modalFields.inputName"
            placeholder="Name"
          />
          <input type="text" v-model="modalFields.inputUrl" placeholder="url" />
        </div>
      </template>
      <template #footer>
        <div class="modal__footer">
          <button type="button" @click="addLinkModal.close()">Cancel</button>
          <button
            type="button"
            @click="
              addToFavorites({
                name: modalFields.inputName,
                url: modalFields.inputUrl,
              })
            "
          >
            Add
          </button>
        </div>
      </template>
    </modal-window>
  </transition>

  <modal-window v-if="addLinkModal.isOpen.value === 'edit'">
    <template #header>
      <div class="modal__header">
        <h4>Edit Favorite</h4>
      </div>
    </template>
    <template #main>
      <div class="modal__main">
        <input type="text" v-model="modalFields.inputName" placeholder="Name" />
        <input type="text" v-model="modalFields.inputUrl" placeholder="url" />
      </div>
    </template>
    <template #footer>
      <div class="modal__footer">
        <button
          type="button"
          class="delete"
          @click="
            removeInFavorites(modalFields.idx);
            addLinkModal.close();
          "
        >
          Delete
        </button>

        <div class="footer-btns">
          <button type="button" @click="addLinkModal.close">Cancel</button>
          <button
            type="button"
            @click="
              editFavorite(
                {
                  name: modalFields.inputName,
                  url: modalFields.inputUrl,
                },
                modalFields.idx
              )
            "
          >
            Save
          </button>
        </div>
      </div>
    </template>
  </modal-window>
</template>

<script setup>
import { watch, ref, reactive, onBeforeMount } from "vue";
import ModalWindow from "./Modal.vue";

const modalFields = ref({
  inputName: "",
  inputUrl: "",
  idx: 0,
});

function cleanModalFields() {
  modalFields.value.inputName = "";
  modalFields.value.inputUrl = "";
}

class Modal {
  isOpen = ref(false);

  constructor(fields) {
    this.fields = reactive(fields);
  }

  open() {
    this.isOpen.value = true;
  }

  close() {
    this.isOpen.value = false;
    cleanModalFields();
  }

  getFields() {
    return modalFields;
  }
}

const addLinkModal = new Modal(modalFields.value);

const favorites = reactive([]);

onBeforeMount(() => {
  if (localStorage.getItem("nFirst") === null) {
    localStorage.setItem("nFirst", true);

    favorites.push(
      {
        name: "GitHub",
        url: "https://github.com",
      },
      {
        name: "Behance",
        url: "https://behance.net",
      },
      {
        name: "YouTube",
        url: "https://youtube.com",
      },
      {
        name: "Instagram",
        url: "https://instagram.com",
      },
      {
        name: "Amazon",
        url: "https://amazon.com",
      },
      {
        name: "Google",
        url: "https://google.com",
      },
      {
        name: "Booking",
        url: "https://booking.com",
      }
    );
  } else {
    if (localStorage.getItem("favorites") !== null) {
      favorites.push(...JSON.parse(localStorage.getItem("favorites")));
    }
  }
});

watch(favorites, () => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
});

function addToFavorites(fields) {
  if (modalFields.value.inputUrl !== "") {
    favorites.push(fields);
    addLinkModal.close();
  }
}

function removeInFavorites(idx) {
  favorites.splice(idx, 1);
}

function editFavorite(data, idx) {
  if (data.url) {
    favorites[idx] = data;
    addLinkModal.close();
  }
}
</script>

<style lang="scss" scoped>
body.light {
  .modal__main {
    input {
      background: rgba(255, 255, 255, 0.1);

      &:focus {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .modal__footer {
    button {
      background: rgba(255, 255, 255, 0);

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      &.delete {
        background: red;
        color: #fff;
      }
    }
  }

  .favorites {
    .favorites__main-item {
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

      .favorites__params {
        background: rgba(0, 0, 0, 0.1);

        &:hover {
          background: #f1f1f1;
        }
      }

      a {
        color: #fff;
      }
    }

    &__btn {
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
  }

  .modal__main {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    input {
      padding: 2px 4px;
      border-radius: 6px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      outline: none;

      &:focus {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .modal__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    grid-gap: 4px;

    button {
      padding: 4px;
      border-radius: 6px;
      // border: 1px solid #ccc;
      cursor: pointer;
      background: rgba(255, 255, 255, 0);
      backdrop-filter: blur(20px);
      border: none;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      &.delete {
        background: red;
        color: #fff;
      }
    }

    .footer-btns {
      display: flex;
      grid-gap: 4px;
    }
  }
}

body.dark {
  .modal__main {
    input {
      background: rgba(255, 255, 255, 0.1);

      &,
      &::placeholder {
        color: #e6e6e6;
      }

      &:focus {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .modal__footer {
    button {
      background: rgba(0, 0, 0, 0.5);

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      &.delete {
        background: red;
        color: #fff;
      }
    }
  }

  .favorites {
    .favorites__main-item {
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

      .favorites__params {
        background: rgba(0, 0, 0, 0.1);

        &:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      }

      a {
        color: #fff;
      }
    }

    &__btn {
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
  }

  .modal__main {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    input {
      padding: 2px 4px;
      border-radius: 6px;
      border: none;
      backdrop-filter: blur(20px);
      outline: none;
    }
  }

  .modal__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    grid-gap: 4px;

    button {
      padding: 4px;
      border-radius: 6px;
      cursor: pointer;
      backdrop-filter: blur(20px);
      border: none;

      color: #fff;
    }

    .footer-btns {
      display: flex;
      grid-gap: 4px;
    }
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

.favorites {
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  justify-content: space-between;
  grid-gap: 12px;

  .favorites__main-item {
    position: relative;

    border-radius: 6px;
    backdrop-filter: blur(20px);

    &:hover {
      .favorites__params {
        visibility: visible;
        pointer-events: all;
        opacity: 1;
      }
    }

    .favorites__params {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 0;
      left: auto;

      visibility: hidden;
      pointer-events: none;
      opacity: 0;

      transition: 200ms;

      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 4;
      border: none;
      border-radius: 6px;

      img {
        width: 12px;
        height: 12px;
      }
    }

    a {
      text-decoration: none;
    }

    .favorites__item {
      border-radius: 6px;
      height: 100px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: flex-start;
      padding: 4px 0px;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        overflow: hidden;
        text-align: center;
        width: 90px;
        text-overflow: ellipsis;
      }
    }
  }

  &__btn {
    border: none;
    backdrop-filter: blur(20px);
    height: 100px;
    border-radius: 6px;
    cursor: pointer;
  }
}

.modal__main {
  display: flex;
  flex-direction: column;
  grid-gap: 4px;

  input {
    padding: 2px 4px;
    border-radius: 6px;
    border: none;
    backdrop-filter: blur(20px);
    outline: none;
  }
}

.modal__footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  grid-gap: 4px;

  button {
    padding: 4px;
    border-radius: 6px;
    cursor: pointer;
    backdrop-filter: blur(20px);
    border: none;
  }

  .footer-btns {
    display: flex;
    grid-gap: 4px;
  }
}
</style>
