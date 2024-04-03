<script setup>
import { ref, defineProps, watch } from "vue";
import Menu from "@/components/Menu/index.vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  selected: {
    type: [String, null],
    default: null,
  },
});

const expandMenuItems = (items, key) => {
  // goal是用來判斷是否為target item或者是與其有關的父層
  let goal = false;
  for (let item of items) {
    // 找到target 更改target的狀態
    if (item.key === key) {
      item.expanded = true;
      goal = true;
    } else {
      // 除了target，一開始都先關閉
      item.expanded = false;
    }
    // 如果有children的 會在往下找
    if (Object.hasOwn(item, "children")) {
      // 遞迴判斷 如果target為當前item的children或更下層的children時，則改狀態
      if (expandMenuItems(item.children, key)) {
        item.expanded = true;
        goal = true;
      }
    }
  }
  return goal;
};

const toggleItem = (item) => {
  expandMenuItems(props.items, item.key);
  if (item.expanded) localStorage.setItem("selectedItem", item.key);
};

watch(
  () => props.selected,
  (newValue) => {
    if (newValue) {
      expandMenuItems(props.items, newValue);
      localStorage.setItem("selectedItem", newValue);
    }
  }
);
</script>

<template>
  <ul>
    <li
      v-for="item in items"
      :key="item.key"
      :class="{ active: item.expanded }"
      @click.stop="toggleItem(item)"
    >
      {{ item.text }}
      <Menu v-if="item.children && item.expanded" :items="item.children"></Menu>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding-left: 1.5rem;
}
li {
  color: #fff;
  line-height: 1.75rem;
}

li.active {
  color: yellowgreen;
}
</style>
