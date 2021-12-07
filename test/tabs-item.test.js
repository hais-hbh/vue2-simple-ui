import sinon from "sinon";

const expect = chai.expect;
import Vue from "vue";
import TabsItem from "../src/tabs-item.vue";
Vue.component("g-tabs-item", TabsItem);

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("TabsItem", () => {
  it("存在", () => {
    expect(TabsItem).to.exist;
  });
  it("接收disabled", () => {
    const Constructor = Vue.extend(TabsItem)
    const vm = new Constructor({
        propsData: {
            disabled: true
        }
    }).$mount()
    expect(vm.$el.classList.contains("disabled")).to.eq(true)
    const callback = sinon.fake()
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.have.not.been.called
  })
  it("接收name", () => {
      const Constructor = Vue.extend(TabsItem)
      const vm = new Constructor({
          propsData: {
              name: "1"
          }
      }).$mount()
      expect(vm.$el.getAttribute("data-name")).to.eq("1")
  })
});
