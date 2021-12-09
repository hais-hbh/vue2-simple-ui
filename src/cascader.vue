<template>
  <div class="cascader" ref="cascader" v-click-outside="close">
    <div class="trigger" @click="toggle">
      {{ result || "&nbsp;" }}
    </div>
    <div class="popover-wrapper" v-if="visiblePopover">
      <cascader-items
        class="popover"
        :selected="selected"
        @update:selected="onUpdateSelected"
        :items="source"
        :height="popoverHeight"
        :load-data="loadData"
      ></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from "./cascader-items.vue";
import ClickOutside from './click-outside'
export default {
  name: "g-cascader",
  components: { CascaderItems },
  props: {
    source: {
      type: Array,
      default: () => [],
    },
    popoverHeight: {
      type: String,
      default: "",
    },
    selected: {
      type: Array,
      default: () => [],
    },
    loadData: {
      type: Function,
      default: () => {},
    },
  },
  directives: {ClickOutside},
  data() {
    return {
      visiblePopover: false,
    };
  },
  computed: {
    result() {
      return this.selected.map((item) => item.name).join("/");
    },
  },
  methods: {
    onUpdateSelected(newSelected) {
      this.$emit("update:selected", newSelected);
      const lastItem = newSelected[newSelected.length - 1];
      const simplest = (children, id) => {
        return children.filter((item) => item.id === id)[0];
      };
      const complex = (children, id) => {
        let noChildren = [];
        let hasChildren = [];
        children.forEach((item) => {
          if (item.children) {
            hasChildren.push(item);
          } else {
            noChildren.push(item);
          }
        });
        let found = simplest(noChildren, id);
        if (found) {
          return found;
        } else {
          found = simplest(hasChildren, id);
          if (found) {
            return found;
          } else {
            for (let i = 0; i < hasChildren.length; i++) {
              found = complex(hasChildren[i].children, id);
              if (found) {
                return found;
              }
            }
            return undefined;
          }
        }
      };
      const updateSource = (result) => {
        const copy = JSON.parse(JSON.stringify(this.source));
        const toUpdate = complex(copy, lastItem.id);
        toUpdate.children = result;
        this.$emit("update:source", copy);
      };
      if (!lastItem.isLeaf) {
        this.loadData && this.loadData(lastItem, updateSource);
      }
    },
    open() {
      this.visiblePopover = true;
    },
    close() {
      this.visiblePopover = false;
    },
    toggle() {
      this.visiblePopover ? this.close() : this.open();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "var";
.cascader {
  position: relative;
  display: inline-block;
  .trigger {
    height: $input-height;
    display: inline-flex;
    align-items: center;
    padding: 0 1em;
    min-width: 10em;
    border: 1px solid $border-color;
    border-radius: $border-radius;
  }
  .popover-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    display: flex;
    margin-top: 8px;
    @extend .box-shadow;
  }
}
</style>
