<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isSideBarOpened: {
    type: Boolean,
    default: false,
  },
  animationType: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["hamburgerClick", "setAnimationType"]);

const hamburgerClick = () => {
  emit("hamburgerClick");
};

const changeAnimationType = (event) => {
  emit("setAnimationType", +event.target.value);
};
</script>

<template>
  <header class="header">
    <button
      type="button"
      class="hamburger"
      :class="{ active: isSideBarOpened }"
      @click="hamburgerClick"
    ></button>
    <div>
      動畫選擇:
      <select :value="animationType" @change="changeAnimationType">
        <option value="1">Default</option>
        <option value="2">Random</option>
        <option value="3">100顆球</option>
      </select>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

select {
  margin-right: 1rem;
  padding: 2px;
  border-radius: 5px;
}

select::before {
  content: "---------";
  display: inline-block;
  height: 10px;
}

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
