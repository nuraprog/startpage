<template>
  <div class="modal-wrapper">
    <div class="shadow"></div>

    <div class="modal">
      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
body.light {
  .shadow {
    background: rgba(0, 0, 0, 0.2);
  }

  .modal {
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
  }
}

body.dark {
  .shadow {
    background: rgba(0, 0, 0, 0.2);
  }

  .modal {
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
    color: #fff;
  }
}

.modal-wrapper {
  position: fixed;
  z-index: 98;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
.shadow {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100vh;
}

.modal {
  position: relative;
  z-index: 100;

  backdrop-filter: blur(20px);
  border-radius: 6px;

  padding: 6px 8px;

  display: flex;
  flex-direction: column;
  grid-gap: 6px;
}
</style>
