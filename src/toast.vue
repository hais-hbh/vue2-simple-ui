<template>
  <div class="toast" ref="toast" :class="toastClasses">
    <div class="message">
      <div v-html="$slots.default[0]" v-if="enableHtml"></div>
      <slot v-else></slot>
    </div>
    <div class="line" ref="line"></div>
    <span class="close" v-if="closeButton" @click="onClickClose">{{
      closeButton.text
    }}</span>
  </div>
</template>

<script>
export default {
  name: "g-toast",
  props: {
    autoClose: {
      type: Boolean,
      default: true,
    },
    autoCloseDelay: {
      type: Number,
      default: 5,
    },
    closeButton: {
      type: Object,
      default: () => ({
        text: "关闭",
        callback: undefined,
      }),
    },
    enableHtml: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "bottom", "middle"].includes(value);
      },
    },
  },
  mounted() {
    this.updateStyle();
    this.execAutoClose();
  },
  computed: {
    toastClasses() {
      return {
        [`position-${this.position}`]: true,
      };
    },
  },
  methods: {
    execAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close();
        }, this.autoCloseDelay * 1000);
      }
    },
    updateStyle() {
      this.$nextTick(() => {
        this.$refs.line.style.height =
          this.$refs.toast.getBoundingClientRect().height + "px";
      });
    },
    close() {
      this.$el.remove();
      this.$destroy();
    },
    onClickClose() {
      this.close();
      this.closeButton &&
        typeof this.closeButton.callback === "function" &&
        this.closeButton.callback();
    },
  },
};
</script>

<style lang="scss" scope>
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
.toast {
  position: fixed;
  left: 50%;
  font-size: $font-size;
  line-height: 1.8;
  min-height: $toast-min-height;
  display: flex;
  align-items: center;
  background: $toast-bg;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: #fff;
  padding: 0 10px;
  .message {
    padding: 8px 0;
  }
  .close {
    padding-left: 16px;
    flex-shrink: 0;
  }
  .line {
    height: 100%;
    border: 1px solid #666;
    margin-left: 16px;
    background: #666;
  }
  &.position-top {
    top: 0;
    transform: translateX(-50%);
  }
  &.position-bottom {
    bottom: 0;
    transform: translateX(-50%);
  }
  &.position-middle {
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
