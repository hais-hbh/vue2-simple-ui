<template>
  <svg class="g-icon">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>
<script>
import "./customIcon"
export default {
  name: "g-icon",
  props: {
    name: String
  }
}
</script>

<style lang="scss" scoped>
.g-icon {
  width: 1em;
  height: 1em;
}
</style>
