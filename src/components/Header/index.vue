<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isSideBarOpened: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["hamburgerClick"]);

const hamburgerClick = () => {
  emit("hamburgerClick");
};
</script>

<template>
  <header>
    <button
      type="button"
      class="hamburger"
      :class="{ active: isSideBarOpened }"
      @click="hamburgerClick"
    ></button>
  </header>
</template>

<style scoped>
.hamburger {
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  position: relative;
}

.hamburger::before,
.hamburger::after {
  transition: 0.2s linear;
}

.hamburger::before {
  position: absolute;
  content: "";
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.25rem;
  height: 2px;
  background: #000;
  box-shadow: #000 0 6px 0 0, #000 0 -6px 0 0;
}

.hamburger.active::before {
  transform: translate(-50%, -50%) rotate(45deg);
  box-shadow: none;
}

.hamburger::after {
  position: absolute;
  content: "";
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.25rem;
  height: 2px;
  background: #000;
  opacity: 0;
}

.hamburger.active::after {
  transform: translate(-50%, -50%) rotate(-45deg);
  opacity: 1;
}
</style>
