<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="cell" :class="{ active }"></div>
</template>

<style scoped>
.cell {
  height: 100px;
  border: black solid 2px;
  background: radial-gradient(
    circle,
    rgba(113, 81, 95, 1) 81%,
    rgba(0, 0, 0, 1) 100%
  );
}

.cell.active {
  animation-name: opacity;
  animation-duration: 0.4s;
  animation-iteration-count: infinite;
}

@keyframes opacity {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.6;
  }
}
</style>
