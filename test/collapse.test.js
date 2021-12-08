import sinon from "sinon";

const expect = chai.expect;
import Vue from "vue";
import Collapse from "../src/collapse";
import CollapseItem from "../src/collapseItem";
Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.component("g-collapse", Collapse);
Vue.component("g-collapse-item", CollapseItem);
describe("Collapse", () => {
  it("存在.", () => {
    expect(Collapse).to.exist;
  });
  it("接收selected", (done) => {
    const div = document.createElement(div);
    document.body.appendChild(div);
    div.innerHTML = `
    <g-collapse :selected.sync="xxx">
        <g-collapse-item title="标题1" name="1"><span id="content-1">内容1</span></g-collapse-item>
        <g-collapse-item title="标题2" name="2"><span id="content-2">内容2</span></g-collapse-item>
        <g-collapse-item title="标题3" name="3"><span id="content-3">内容3</span>/g-collapse-item>
    </g-collapse>
        `;
    const vm = new Vue({
      el: div,
      data: {
        xxx: ["1", "2"],
      },
    });
    vm.$nextTick(() => {
      expect(vm.$el.querySelector("#content-1")).to.exist;
      expect(vm.$el.querySelector("#content-2")).to.exist;
      expect(vm.$el.querySelector("#content-3")).to.not.exist;
      done();
    });
  });
  it("接收single", (done) => {
    const div = document.createElement(div);
    document.body.appendChild(div);
    div.innerHTML = `
    <g-collapse :selected.sync="xxx" single>
        <g-collapse-item title="标题1" name="1"><span id="content-1">内容1</span></g-collapse-item>
        <g-collapse-item title="标题2" name="2"><span id="content-2">内容2</span></g-collapse-item>
        <g-collapse-item title="标题3" name="3"><span id="content-3">内容3</span>/g-collapse-item>
    </g-collapse>
        `;
    const vm = new Vue({
      el: div,
      data: {
        xxx: ["1"],
      },
    });
    vm.$el.querySelector("[data-name='2']").click()
    vm.$nextTick(() => {
      expect(vm.$el.querySelector("#content-1")).to.not.exist;
      expect(vm.$el.querySelector("#content-2")).to.exist;
      expect(vm.$el.querySelector("#content-3")).to.not.exist;
      done();
    });
  });
});
