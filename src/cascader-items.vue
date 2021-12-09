<template>
  <div class="cascaderItems" :style="{ height }">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="leftSelected = item"
      >
        {{ item.name }}
        <Icon class="icon" name="right" v-if="item.children"></Icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <g-cascader-items :items="rightItems" :height="height"></g-cascader-items>
    </div>
  </div>
</template>

<script>
import Icon from "./icon.vue";
export default {
  name: "g-cascader-items",
  components: { Icon },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String,
      default: "",
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
@import "var";
.cascaderItems {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100px;
  .left {
    height: 100%;
    padding: 0.3em 0;
  }
  .label {
    padding: 0.3em 1em;
    display: flex;
    align-items: center;
    .icon {
      margin-left: 1em;
      transform: scale(0.5);
    }
  }
  .right {
    height: 100%;
    border-left: 1px solid $border-color-light;
  }
}
</style>
