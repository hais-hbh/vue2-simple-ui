<template>
  <button class="g-button" :class="{[`icon-${iconPosition}`]: true}" @click="$emit('click')">
    <g-icon v-if="icon && !loading" :name="icon" class="icon"></g-icon>
    <g-icon v-if="loading" class="loading icon" name="loading"></g-icon>
    <span class="content">
      <slot/>
    </span>

  </button>
</template>

<script>
export default {
  props: {
    icon: String,
    iconPosition: {
      type: String,
      default: "left",
      validator(value) {
        return !(value !== 'left' && value !== 'right');
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@keyframes loading {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.g-button {
  font: inherit;
  height: var(--button-height);
  padding: 0 1em;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background: var(--button-bg);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  &:hover {
    border-color: var(--border-color-hover);
  }

  &:active {
    background: var(--button-active-bg);
  }

  &:focus {
    outline: none;
  }

  > .icon{
    order: 1;
    margin-right: .3em;
  }
  > .loading{
    animation: loading 1s infinite linear;
  }

  > .content {
    order: 2;
  }

  &.icon-right {
    > .icon {
      order: 2;
      margin-left: .3em;
      margin-right: 0;
    }
    >.content{
      order: 1;
    }
  }
}

</style>
