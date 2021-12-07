<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "g-tabs",
  props: {
    selected: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(value) {
        return ["horizontal", "vertical"].includes(value);
      },
    },
  },
  data() {
    return {
      eventBus: new Vue(),
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  mounted() {
    this.$children.length === 0 &&
      (() => {
       console && console.warn && console.warn("tabs没有子组件g-tabs-head或g-tabs-body");
      })();
    this.$children.forEach((vm) => {
      vm.$options.name === "g-tabs-head" &&
        vm.$children.forEach((vmChild) => {
          vmChild.$options.name === "g-tabs-item" &&
            vmChild.name === this.selected &&
            this.eventBus.$emit("update:selected", this.selected, vmChild);
        });
    });
  },
};
</script>

<style lang="scss" scoped></style>
