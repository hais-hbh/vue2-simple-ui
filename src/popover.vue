<template>
  <div class="popover" ref="popover">
    <div
      class="content-wrapper"
      v-if="visible"
      ref="contentWrapper"
      :class="{ [`position-${position}`]: true }"
    >
      <slot name="content" :close="close"></slot>
    </div>
    <span ref="triggerWrapper" style="display: inline-block">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "g-popover",
  data() {
    return {
      visible: false,
    };
  },
  props: {
    position: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "bottom", "left", "right"].includes(value);
      },
    },
    trigger: {
      type: String,
      default: "click",
      validator(value) {
        return ["click", "hover"].includes(value);
      },
    },
  },
  mounted() {
    if (this.trigger === "click") {
      this.$refs.popover.addEventListener("click", this.onClick);
    } else {
      this.$refs.popover.addEventListener("mouseenter", this.open);
      this.$refs.popover.addEventListener("mouseleave", this.close);
    }
  },
  destroyed() {
    if (this.trigger === "click") {
      this.$refs.popover.removeEventListener("click", this.onClick);
    } else {
      this.$refs.popover.removeEventListener("mouseenter", this.open);
      this.$refs.popover.removeEventListener("mouseleave", this.close);
    }
  },
  methods: {
    positionContent() {
      const { contentWrapper, triggerWrapper } = this.$refs;
      document.body.appendChild(contentWrapper);
      const { left, top, height, width } =
        triggerWrapper.getBoundingClientRect();
      const { height: height2 } = contentWrapper.getBoundingClientRect();
      // 表驱动编程
      const positions = {
        top: { top: top + window.scrollY, left: left + window.scrollX },
        bottom: {
          top: top + height + window.scrollY,
          left: left + window.scrollX,
        },
        left: {
          top: top - (height2 - height) / 2 + window.scrollY,
          left: left + window.scrollX,
        },
        right: {
          top: top - (height2 - height) / 2 + window.scrollY,
          left: left + window.scrollX + width,
        },
      };
      contentWrapper.style.top = positions[this.position].top + "px";
      contentWrapper.style.left = positions[this.position].left + "px";
    },
    onClickDocument(e) {
      if (
        this.$refs.popover &&
        (this.$refs.popover === e.target ||
          this.$refs.popover.contains(e.target))
      ) {
        return;
      }
      if (
        this.$refs.contentWrapper &&
        (this.$refs.contentWrapper === e.target ||
          this.$refs.contentWrapper.contains(e.target))
      ) {
        return;
      }
      this.close();
    },
    open() {
      this.visible = true;
      this.$nextTick(() => {
        this.positionContent();
        document.addEventListener("click", this.onClickDocument);
      });
    },
    close() {
      this.visible = false;
      document.removeEventListener("click", this.onClickDocument);
    },
    onClick(event) {
      if (this.$refs.triggerWrapper.contains(event.target)) {
        this.visible ? this.close() : this.open();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$border-color: #333;
$border-radius: 4px;
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper {
  position: absolute;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
  background: white;
  animation: fade-in .7s;

  padding: 0.5em 1em;
  max-width: 20em;
  word-break: break-all;
  &::before,
  &::after {
    content: "";
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
  }
  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before,
    &::after {
      left: 10px;
    }
    &::before {
      border-top-color: black;
      border-bottom: none;
      top: 100%;
    }
    &::after {
      border-top-color: white;
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before,
    &::after {
      left: 10px;
    }
    &::before {
      border-bottom-color: black;
      border-top: none;
      bottom: 100%;
    }
    &::after {
      border-bottom-color: white;
      bottom: calc(100% - 1px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before,
    &::after {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      border-left-color: black;
      border-right: none;
    }
    &::after {
      border-left-color: white;
      left: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before,
    &::after {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      border-right-color: black;
      border-left: none;
    }
    &::after {
      border-right-color: white;
      right: calc(100% - 1px);
    }
  }
}
</style>
