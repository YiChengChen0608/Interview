<script setup>
import { onMounted, ref } from "vue";
import Header from "@/components/Header/index.vue";
import Sidebar from "@/components/Sidebar/index.vue";

// 側邊欄
const isSideBarOpened = ref(false);
const hamburgerClick = () => {
  event.stopPropagation();
  isSideBarOpened.value = !isSideBarOpened.value;
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
    @hamburgerClick="hamburgerClick"
  ></Header>

  <main>
    <Sidebar :isSideBarOpened="isSideBarOpened"></Sidebar>
  </main>
</template>

<style scoped>
/* 30px為 header */
main {
  height: calc(100vh - 2rem);
  overflow-x: hidden;
}
</style>
