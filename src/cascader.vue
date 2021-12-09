<template>
  <div class="cascader">
    <div class="trigger" @click="visiblePopover = !visiblePopover"></div>
    <div class="popover-wrapper" v-if="visiblePopover">
      <cascader-items
        :items="source"
        class="popover"
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
  },
  data() {
    return {
      visiblePopover: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "var";
.cascader {
  position: relative;
  .trigger {
    border: 1px solid black;
    height: 32px;
    width: 100px;
  }
  .popover-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    display: flex;
    @extend .box-shadow;
  }
}
</style>
