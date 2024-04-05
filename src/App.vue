<script setup>
import { onMounted, ref } from "vue";
import Header from "@/components/Header/index.vue";
import Sidebar from "@/components/Sidebar/index.vue";
import Square from "@/components/Square/index.vue";

// 側邊欄
const isSideBarOpened = ref(false);
const hamburgerClick = () => {
  event.stopPropagation();
  isSideBarOpened.value = !isSideBarOpened.value;
};

// 動畫類型  1: default 2: random 3: 100顆球，方便起見就不設置常數，用數字代替
const animationType = ref(1);
const requestAnimationFrameId = ref(0);

const setAnimationType = (type) => {
  // 如果有正在執行的動畫，切換之前，先cancel掉
  if (requestAnimationFrameId.value) {
    cancelAnimationFrame(requestAnimationFrameId.value);
    requestAnimationFrameId.value = 0;
  }
  animationType.value = type;
};

const updateRequestAnimationFrameId = (id) => {
  requestAnimationFrameId.value = id;
};

onMounted(() => {
  window.addEventListener("click", () => {
    isSideBarOpened.value = false;
  });
});
</script>

<template>
  <Header
    :isSideBarOpened="isSideBarOpened"
    :animationType="animationType"
    @hamburgerClick="hamburgerClick"
    @setAnimationType="setAnimationType"
  ></Header>

  <main>
    <Sidebar :isSideBarOpened="isSideBarOpened"></Sidebar>
    <Square
      :animationType="animationType"
      :requestAnimationFrameId="requestAnimationFrameId"
      @updateRequestAnimationFrameId="updateRequestAnimationFrameId"
    ></Square>
  </main>
</template>

<style scoped>
/* 30px為 header */
main {
  height: calc(100vh - 2rem);
  position: relative;
  background-color: darkgrey;
  overflow: hidden;
  padding: 0 1rem;
}
</style>
