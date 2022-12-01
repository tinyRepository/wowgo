<template>
  <div class="switch-container">
    <label class="switch">
      <input
        type="checkbox"
        :checked="value"
        v-bind="$attrs"
        v-on="listeners"
        class="switch__input"
      />
      <span class="switch__slider" />
    </label>
    <div class="switch__label">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSwitch",
  inheritAttrs: false,

  model: {
    event: "change"
  },

  props: {
    value: Boolean
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        change: this.onChange
      };
    }
  },

  methods: {
    onChange() {
      this.$emit("change", !this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
$width: 48px;
$height: 28px;
$padding: 2px;
$content-size: $width - $padding * 2;
$slider-size: $height - $padding * 2;
.switch {
  position: relative;
  display: inline-block;
  width: $width;
  height: $height;
  &__input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  &__slider {
    border-radius: $height;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $white-color1;
    transition: background-color calc($transition / 2);
    box-shadow: 0px 0px 4px rgba(50, 50, 71, 0.08),
      0px 4px 8px rgba(50, 50, 71, 0.06);
    &::before {
      position: absolute;
      content: "";
      border-radius: 50%;
      height: $slider-size;
      width: $slider-size;
      left: $padding;
      bottom: $padding;
      background-color: $gray-color4;
      transition: transform calc($transition / 2),
        background-color calc($transition / 2);
    }
  }
  &__input:not(:disabled) + &__slider {
    cursor: pointer;
  }
  &__input:checked + &__slider {
    background-color: $gray-color4;
  }
  &__input:disabled + &__slider {
    background-color: $gray-color1;
  }
  &__input:checked + &__slider:before {
    transform: translateX($content-size - $slider-size);
    background: $white-color1;
  }
  &__label {
    margin-left: 24px;
  }
}

.switch-container {
  align-items: center;
}
</style>
