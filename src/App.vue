<template>
  <div id="app">
    <Cascader
      :source.sync="source"
      popover-height="200px"
      :selected.sync="selected"
      :load-data="loadData"
    ></Cascader>
  </div>
</template>

<script>
import Cascader from "./cascader";
import db from "./db";
function ajax(parentId) {
  return new Promise((sucess) => {
    setTimeout(() => {
      const result = db.filter((item) => item.parent_id === parentId);
      result.forEach(node => {
        if(db.filter(item => item.parent_id === node.id).length > 0){
          node.isLeaf = false
        }else{
          node.isLeaf = true
        }
      })
      sucess(result);
    }, 1000);
  });
}
export default {
  name: "App",
  components: {
    Cascader,
  },
  data() {
    return {
      selected: [],
      source: [],
    };
  },
  mounted() {
    ajax(0).then((result) => {
      this.source = result;
    });
  },
  methods: {
    loadData(selected, updateSource) {
      ajax(selected.id).then(result => {
        updateSource(result)
      })
    }
  }
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
