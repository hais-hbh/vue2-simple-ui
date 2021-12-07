<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="line" ref="line" v-if="visibleLine"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-tabs-head",
  inject: ["eventBus"],
  data() {
    return {
      visibleLine: false,
    };
  },
  mounted() {
    this.eventBus.$on("update:selected", (item, vm) => {
      this.visibleLine = true;
      const { width, left } = vm.$el.getBoundingClientRect();
      this.$nextTick(() => {
        this.$refs.line.style.width = width + "px";
        // this.$refs.line.style.left = left + 'px' // 重绘重排
        this.$refs.line.style.transform = `translateX(${left}px)`;
      });
    });
  },
};
</script>

<style lang="scss" scoped>
$tab-height: 40px;
$blue: blue;
$border-color: #ddd;
.tabs-head {
  display: flex;
  height: $tab-height;
  justify-content: flex-start;
  position: relative;
  border-bottom: 1px solid $border-color;
  > .line {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid $blue;
    transition: all 0.25s;
  }
  > .actions-wrapper {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
  }
}
</style>
