<script setup>
import { ref, defineProps, onMounted } from "vue";
import Menu from "@/components/Menu/index.vue";
import items from "@/mock/data.json";

const props = defineProps({
  isSideBarOpened: {
    type: Boolean,
    default: false,
  },
});

const menuItems = ref(items);
const selected = ref(null);

const addPropertyToData = (data, property, value) => {
  return data.map((item) => {
    if (Object.hasOwn(item, "children")) {
      item.children = addPropertyToData(item.children, property, value);
    }
    return {
      ...item,
      [property]: value,
    };
  });
};

const flattenHandler = (data) => {
  const stack = data.toReversed();
  const flatten = [];
  while (stack.length) {
    const node = stack.pop();
    flatten.push({ key: node.key, text: node.text });
    if (Object.hasOwn(node, "children")) {
      stack.push(...node.children.reverse());
    }
  }
  return flatten;
};

menuItems.value = addPropertyToData(menuItems.value, "expanded", false);
const options = flattenHandler(menuItems.value);

onMounted(() => {
  const key = localStorage.getItem("selectedItem") ?? null;
  selected.value = key ?? options[0].key;
});
</script>

<template>
  <div class="sidebar" :class="{ open: isSideBarOpened }" @click.stop>
    <Menu :items="menuItems" :selected="selected"></Menu>
    <select v-model="selected" class="options">
      <option v-for="option in options" :value="option.key" :key="option.key">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.sidebar {
  width: 50%;
  height: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #000;
  transform: translateX(200%);
  transition: 0.1s linear;
  position: absolute;
  z-index: 1;
  opacity: 0.9;
}

.sidebar.open {
  transform: translateX(100%);
}

.options {
  width: 80%;
  height: 2rem;
  display: block;
  margin: auto;
}
</style>
