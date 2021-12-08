<template>
  <div class="cascader">
    <div class="trigger" @click="visiblePopover = !visiblePopover"></div>
    <div class="popover" v-if="visiblePopover">
      <cascader-items :items="source"></cascader-items>
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
  .trigger {
    border: 1px solid red;
    height: 32px;
    width: 100px;
  }
  .popover {
    border: 2px solid green;
    height: 200px;
    display: flex;
    .label {
      white-space: nowrap;
    }
  }
}
</style>
