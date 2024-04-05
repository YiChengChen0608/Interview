<script setup>
const props = defineProps({
  active: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <div
    class="ball"
    :class="{ default_active: active === 1, random_active: active === 2 }"
  >
    0
  </div>
</template>

<style scoped>
.ball {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #a5f12b;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
}

.ball.random_active {
  transition: all 2s linear;
}

.ball.default_active {
  animation-name: ball;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

@keyframes ball {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(400%);
  }
}
</style>
