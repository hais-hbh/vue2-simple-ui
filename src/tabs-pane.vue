<template>
  <div class="tabs-pane" :class="classes" v-if="active" :data-name="name">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "g-tabs-pane",
  inject: ["eventBus"],
  props: {
    name: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    classes() {
      return {
        active: this.active,
      };
    },
  },
  created() {
    this.eventBus.$on("update:selected", (name) => {
      this.active = name === this.name;
    });
  },
};
</script>

<style lang="scss" scoped>
.tabs-pane {
  padding: 1rem;
}
</style>
