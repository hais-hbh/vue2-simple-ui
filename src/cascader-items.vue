<template>
  <div class="cascaderItems" :style="{ height }">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="onClickLabel(item)"
      >
        {{ item.name }}
        <Icon class="icon" name="right" v-if="item.children"></Icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <g-cascader-items
        :level="level + 1"
        :items="rightItems"
        :height="height"
        :selected="selected"
        @update:selected="onUpdateSelected"
      ></g-cascader-items>
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
    level: {
      type: Number,
      default: 0,
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    rightItems() {
      const currentSelected = this.selected[this.level];
      if (currentSelected && currentSelected.children) {
        return currentSelected.children;
      } else {
        return null;
      }
    },
  },
  methods: {
    onClickLabel(item) {
      let copy = JSON.parse(JSON.stringify(this.selected));
      copy[this.level] = item;
      copy.splice(this.level + 1);
      this.$emit("update:selected", copy);
    },
    onUpdateSelected(newSelected) {
      this.$emit("update:selected", newSelected);
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
