<template>
  <div class="tabs-pane">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "g-tabs-pane",
  inject: ["eventBus"],
  props: {
    name: {
      type: Number | String,
      required: true,
    },
  },
  created() {
    this.eventBus.$on("update:selected", (name) => {
      console.log(name);
    });
  },
};
</script>

<style lang="scss" scope>
.tabs-pane {
}
</style>
