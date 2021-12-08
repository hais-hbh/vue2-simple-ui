<template>
  <div class="cascaderItem">
    {{ sourceItem.name }}
    <div v-if="sourceItem.children">
      <g-cascader-item
        v-for="(item, index) in sourceItem.children"
        :sourceItem="item"
        :key="index"
      ></g-cascader-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-cascader-item",
  props: {
    sourceItem: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.cascaderItem {
  border: 1px solid red;
  margin: 10px;
}
</style>
