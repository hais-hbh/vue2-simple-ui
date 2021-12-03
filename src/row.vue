<template>
<div class="row">
  <slot/>
</div>
</template>

<script>
export default {
  name: "g-row"
}
</script>

<style lang="scss" scoped>
.row{
  display: flex;
}
</style>
