<template>
  <div class="cascader">
    <div class="trigger" @click="visiblePopover = !visiblePopover">
      {{ result || "&nbsp;" }}
    </div>
    <div class="popover-wrapper" v-if="visiblePopover">
      <cascader-items
        class="popover"
        :selected="selected"
        @update:selected="onUpdateSelected"
        :items="source"
        :height="popoverHeight"
      ></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from "./cascader-items.vue";
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
  },
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import "var";
.cascader {
  position: relative;
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
