import sinon from "sinon";

const expect = chai.expect;
import Vue from "vue";
import Tabs from "../src/tabs";
import TabsBody from "../src/tabs-body.vue";
import TabsHead from "../src/tabs-head.vue";
import TabsItem from "../src/tabs-item.vue";
import TabsPane from "../src/tabs-pane.vue";

Vue.component("g-tabs", Tabs);
Vue.component("g-tabs-body", TabsBody);
Vue.component("g-tabs-head", TabsHead);
Vue.component("g-tabs-item", TabsItem);
Vue.component("g-tabs-pane", TabsPane);

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Tabs", () => {
  it("存在", () => {
    expect(Tabs).to.exist;
  });
  it("接收selected", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = `
    <g-tabs selected="1">
    <g-tabs-head>
      <g-tabs-item name="1">1</g-tabs-item>
      <g-tabs-item name="2">2</g-tabs-item>
      <g-tabs-item name="3">3</g-tabs-item>
    </g-tabs-head>
    <g-tabs-body>
      <g-tabs-pane name="1">4</g-tabs-pane>
      <g-tabs-pane name="2">5</g-tabs-pane>
      <g-tabs-pane name="3">6</g-tabs-pane>
    </g-tabs-body>
  </g-tabs>
    `;
    const vm = new Vue({
      el: div,
    });
    vm.$nextTick(() => {
      const element = vm.$el.querySelector(".tabs-item[data-name='1']")
      expect(element.classList.contains('active')).to.eq(true)
    });
  });
});
