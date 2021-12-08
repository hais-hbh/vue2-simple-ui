<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "g-collapse",
  props: {
    single: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
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
    this.eventBus.$emit("update:selected", this.selected);
    this.listenAdd();
    this.listenRemove();
  },
  methods: {
    doEmit(data) {
      this.$emit("update:selected", data);
      this.eventBus.$emit("update:selected", data);
    },
    listenAdd() {
      this.eventBus.$on("update:AddSelected", (name) => {
        let selectedCopy = JSON.parse(JSON.stringify(this.selected));
        if (this.single) {
          selectedCopy = [name];
        } else {
          selectedCopy.push(name);
        }
        this.doEmit(selectedCopy);
      });
    },
    listenRemove() {
      this.eventBus.$on("update:removeSelected", (name) => {
        let selectedCopy = JSON.parse(JSON.stringify(this.selected));
        const index = selectedCopy.indexOf(name);
        selectedCopy.splice(index, 1);
        this.doEmit(selectedCopy);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$grey: #ddd;
$border-radius: 4px;
.collapse {
  border: 1px solid $grey;
  border-radius: $border-radius;
}
</style>
