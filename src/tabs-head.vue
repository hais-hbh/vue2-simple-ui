<template>
  <div class="tabs-head">
    <slot></slot>
    <slot name="actions"></slot>
  </div>
</template>

<script>
export default {
  name: "g-tabs-head",
  inject: ["eventBus"],
};
</script>

<style lang="scss" scope>
.tabs-head {
}
</style>
