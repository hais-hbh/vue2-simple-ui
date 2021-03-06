<template>
  <div class="cascaderItems" :style="{ height }">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="onClickLabel(item)"
      >
        <span class="name">{{ item.name }}</span>
        <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <Icon class="loading" name="loading"></Icon>
          </template>
          <template v-else>
            <Icon
              class="next"
              name="right"
              v-if="rightArrowVisible(item)"
            ></Icon>
          </template>
        </span>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <g-cascader-items
        :level="level + 1"
        :items="rightItems"
        :height="height"
        :selected="selected"
        @update:selected="onUpdateSelected"
        :loading-item="loadingItem"
        :load-data="loadData"
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
    loadData: {
      type: Function,
      default: () => {},
    },
    loadingItem: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    rightItems() {
      if (this.selected[this.level]) {
        const selected = this.items.filter(
          (item) => item.name === this.selected[this.level].name
        );
        if (
          selected &&
          selected[0].children &&
          selected[0].children.length > 0
        ) {
          return selected[0].children;
        }
      }
      return null;
    },
  },
  methods: {
    rightArrowVisible(item) {
      return this.loadData ? !item.isLeaf : item.children;
    },
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
    overflow: auto;
  }
  .label {
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background: $grey;
    }
    > .name {
      margin-left: 1em;
      user-select: none;
    }
    .icons {
      margin-left: auto;
      .next{
        transform: scale(.5);
      }
      .loading{
        animation: loading 2s infinite linear;
      }
    }
  }
  .right {
    height: 100%;
    border-left: 1px solid $border-color-light;
  }
}
</style>
