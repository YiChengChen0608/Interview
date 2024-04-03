<script setup>
import Cell from "@/components/Square/Cell/index.vue";
import { ref, defineProps, onMounted } from "vue";
const props = defineProps({
  // 預設為九宮格
  cellsCount: {
    type: Number,
    default: 9,
  },
});

const cellRef = ref(null);

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

const activeCells = new Set(animationCells(props.cellsCount));
const cornerCells = new Set(getCornerCells(props.cellsCount));
</script>

<template>
  <div class="container">
    <Cell
      ref="cellRef"
      v-for="i in cellsCount"
      :key="i"
      :active="activeCells.has(i)"
    ></Cell>
    <!-- <div class="box"></div> -->
  </div>
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
