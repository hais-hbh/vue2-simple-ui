import sinon from "sinon";

const expect = chai.expect;
import Vue from "vue";
import Popover from "../src/popover";

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Popover", () => {
  it("存在.", () => {
    expect(Popover).to.exist;
  });
  it("接收position", (done) => {
    Vue.component("g-popover", Popover);
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = `
        <g-popover position="right" ref="test">
          <template slot="content">
            <div>popover内容</div>
          </template>
          <button>right</button>
        </g-popover>
    `;
    const vm = new Vue({
      el: div,
    });
    vm.$el.querySelector("button").click();
    vm.$nextTick(() => {
      const { contentWrapper } = vm.$refs.test.$refs;
      expect(contentWrapper.classList.contains("position-right")).to.be.true;
      done();
    });
  });
  it("接收trigger", (done) => {
    Vue.component("g-popover", Popover);
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = `
        <g-popover position="right" ref="test" trigger="hover">
          <template slot="content">
            <div>popover内容</div>
          </template>
          <button>right</button>
        </g-popover>
    `;
    const vm = new Vue({
      el: div,
    });
    const event = new Event("mouseenter")
    vm.$refs.test.$el.dispatchEvent(event)
    vm.$nextTick(() => {
        const {contentWrapper} = vm.$refs.test.$refs
        expect(contentWrapper).to.exist
        done()
    })
  });
});
