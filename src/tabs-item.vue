<template>
  <div class="tabs-item" @click="onClick" :class="classes">
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
  data() {
    return {
      active: false,
    };
  },
  created() {
    this.eventBus.$on("update:selected", (name) => {
      this.active = name === this.name;
    });
  },
  methods: {
    onClick() {
      if (this.disabled) return;
      this.eventBus.$emit("update:selected", this.name, this);
    },
  },
  computed: {
    classes() {
      return {
        active: this.active,
        disabled: this.disabled,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$blue: blue;
$disabled-text-color: grey;
.tabs-item {
  flex-shrink: 0;
  padding: 0 1em;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  &.active {
    color: $blue;
    font-weight: bold;
  }
  &.disabled {
    color: $disabled-text-color;
    cursor: not-allowed;
  }
}
</style>
