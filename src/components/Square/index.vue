<script setup>
import Cell from "@/components/Square/Cell/index.vue";
import Ball from "@/components/Square/Ball/index.vue";
import Balls from "@/components/Square/Balls/index.vue";
import { ref, defineProps, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useTargetPosition } from "../../composables/useTargetPosition";
const props = defineProps({
  // 預設為九宮格
  cellsCount: {
    type: Number,
    default: 9,
  },
  animationType: {
    type: Number,
    default: 1,
  },
  requestAnimationFrameId: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["updateRequestAnimationFrameId"]);

const cellRef = ref(null);
const ballRef = ref(null);
const { targetPosition, setRandomTargetPosition } = useTargetPosition();

const animationCells = (cellsCount) => {
  // 這邊要以單數才會比較準確，例如9宮格, 25宮格, ....
  // 右上角格子為 總格子數開根號
  const rightTop = Math.sqrt(cellsCount);
  // 中間的格子為 總格子數 / 2 無條件進位
  const middle = Math.ceil(cellsCount / 2);
  // 右下角格子為 總格子數
  const rightBottom = cellsCount;

  return [rightTop, middle, rightBottom];
};

const getCornerCells = (cellsCount) => {
  // 左上角一定為1
  const leftTop = 1;
  // 右上角格子為 總格子數開根號
  const rightTop = Math.sqrt(cellsCount);
  // 左下角格子為 (右上角格子 * 右上角格子 - 1) + 1
  const leftBottom = rightTop * (rightTop - 1) + 1;
  // 右下角格子為 總格子數
  const rightBottom = cellsCount;

  return [leftTop, rightTop, leftBottom, rightBottom];
};

const getInitialBallPosition = (cellElement, containerElementRect) => {
  // 找出cell與container的距離
  const elementRect = cellElement.getBoundingClientRect();

  const top = elementRect.top - containerElementRect.top;
  const left = elementRect.left - containerElementRect.left;

  // 讓球置中
  const x = left + elementRect.width / 2 - 15;
  const y = top + elementRect.height / 2 - 15;

  return { x, y };
};

const setBallPosition = (ballElement, targetPosition) => {
  ballElement.style.left = targetPosition.x + "px";
  ballElement.style.top = targetPosition.y + "px";
};

const setInitialBallsPosition = () => {
  const containerElementRect = document
    .querySelector("main")
    .getBoundingClientRect();
  cornerCells.forEach((cell, index) => {
    const position = getInitialBallPosition(
      cellRef.value[cell - 1].$el,
      containerElementRect
    );
    setBallPosition(ballRef.value[index].$el, position);
  });
};

const activeCells = new Set(animationCells(props.cellsCount));
const cornerCells = getCornerCells(props.cellsCount);

watch(
  () => props.animationType,
  async (newType) => {
    await nextTick();
    if (newType !== 3) {
      // 只要不是100顆球的動畫都需要initial球的位置，而如果是default的話，則會執行animation
      setInitialBallsPosition();
    }
    if (newType === 2) {
      // random動畫
      const mainRect = document.querySelector("main").getBoundingClientRect();
      setRandomTargetPosition(mainRect);
      // 利用requestAnimationFrame來做transition的動畫
      const id = requestAnimationFrame(() => {
        cornerCells.forEach((cell, index) => {
          setBallPosition(ballRef.value[index].$el, targetPosition.value);
        });
      });
      // 更新id
      emit("updateRequestAnimationFrameId", id);
    }
  }
);

onMounted(() => {
  setInitialBallsPosition();
  window.addEventListener("resize", setInitialBallsPosition);
});

onUnmounted(() => {
  cancelAnimationFrame(props.requestAnimationFrameId);
  window.removeEventListener("resize", setInitialBallsPosition);
});
</script>

<template>
  <div class="container">
    <Cell
      ref="cellRef"
      v-for="i in cellsCount"
      :key="i"
      :active="activeCells.has(i)"
    ></Cell>
  </div>
  <template v-if="animationType !== 3">
    <Ball
      ref="ballRef"
      v-for="cell in cornerCells"
      :key="cell"
      :active="animationType"
    ></Ball>
  </template>
  <Balls v-else></Balls>
</template>

<style scoped>
.container {
  width: calc(100% - 2rem);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.box {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>
