<script setup>
import { useTargetPosition } from "@/composables/useTargetPosition";
import { onMounted, onUnmounted, ref } from "vue";

const canvas = ref(null);
const ctx = ref(null);
const balls = [];
let requestAnimationFrameId = 0;

const { targetPosition, setRandomTargetPosition } = useTargetPosition();

const createBalls = (balls) => {
  for (let i = 0; i < 100; i++) {
    balls.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      radius: 15,
    });
  }
};

const updateBall = (ball) => {
  const x = targetPosition.value.x - ball.x;
  const y = targetPosition.value.y - ball.y;

  // 畢氏定理!?
  const distanceToTarget = Math.sqrt(x * x + y * y);
  // 計算球到目標的方向向量
  const dx = x / distanceToTarget;
  const dy = y / distanceToTarget;

  // 以requestAnimationFrame的預設60來看，以每秒100像素，大概速度為1.67
  const speed = 1.67;

  // 更新球的位置
  ball.x += dx * speed;
  ball.y += dy * speed;

  // 當distanceToTarget小於每一幀移動的距離時
  if (distanceToTarget <= speed) return true;
  return false;
};

const drawBall = (ball) => {
  if (!ctx.value) return;

  ctx.value.beginPath();
  ctx.value.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.value.fillStyle = "#a5f12b";
  ctx.value.fill();
  ctx.value.closePath();

  ctx.value.font = "16px arial";
  ctx.value.textAlign = "center";
  ctx.value.textBaseline = "middle";
  ctx.value.fillStyle = "#000";
  ctx.value.fillText("0", ball.x, ball.y);
};

const animate = () => {
  if (!ctx.value || !canvas.value) return;

  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

  let goal = true;
  balls.forEach((ball) => {
    const ballGoal = updateBall(ball);
    drawBall(ball);

    if (!ballGoal) goal = false;
  });

  requestAnimationFrameId = requestAnimationFrame(animate);
  if (goal) cancelAnimationFrame(requestAnimationFrameId);
};

onMounted(() => {
  const mainRect = document.querySelector("main").getBoundingClientRect();
  canvas.value.width = mainRect.width;
  canvas.value.height = mainRect.height;
  setRandomTargetPosition(mainRect);
  ctx.value = canvas.value.getContext("2d");
  createBalls(balls);
  animate();
});

onUnmounted(() => {
  cancelAnimationFrame(requestAnimationFrameId);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped>
canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
