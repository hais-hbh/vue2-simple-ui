<template>
  <div class="cascaderItems">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="leftSelected = item"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <g-cascader-items :items="rightItems"></g-cascader-items>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-cascader-items",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      leftSelected: null,
    };
  },
  computed: {
    rightItems() {
      if (this.leftSelected && this.leftSelected.children) {
        return this.leftSelected.children;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cascaderItems {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .left {
    border: 1px solid red;
  }
  .right {
    margin-top: -1px;
  }
}
</style>
