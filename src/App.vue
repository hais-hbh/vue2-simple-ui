<template>
  <div id="app">
    <Cascader
      :source="source"
      popover-height="200px"
      :selected.sync="selected"
    ></Cascader>
  </div>
</template>

<script>
import Cascader from "./cascader";
import db from "./db";
function ajax(parentId = 0) {
  return db.filter((item) => item.parent_id == parentId);
}
export default {
  name: "App",
  components: {
    Cascader,
  },
  data() {
    return {
      selected: [],
      source: ajax(),
    };
  },
};
</script>

<style>
#app {
  padding: 100px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  max-width: 100%;
}
html {
  --font-size: 14px;
}
body {
  font-size: var(--font-size);
}
</style>
