<template>
  <div class="tabs-item" @click="xxx">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "g-tabs-item",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: Number | String,
      required: true,
    },
  },
  inject: ["eventBus"],
  created() {
    this.eventBus.$on("update:selected", (name) => {
      console.log(name);
    });
  },
  methods: {
    xxx() {
      this.eventBus.$emit("update:selected", this.name);
    },
  },
};
</script>

<style lang="scss" scope>
.tabs-item {
}
</style>
