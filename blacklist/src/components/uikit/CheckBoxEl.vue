<template>
  <div class="checkbox">
    <label :for="id" class="checkbox-label">
      <input
        :id="id"
        type="checkbox"
        class="checkbox-input"
        :checked="value"
        v-bind="$attrs"
        @change="$emit('input', !value)"
      />

      <span class="check" />
      <span class="checkbox-text">
        <slot />
      </span>
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },

    value: {
      type: [Boolean, Array],
      required: true,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-input {
  display: none;
  &:checked + span {
    background-position: center;

    &::after {
      transform: scale(1);
    }
  }
}

.checkbox-text {
  @include fontRubik(12px, $white-color2);
  line-height: 12px;
  margin-left: 10px;
  margin-top: 3px;
  letter-spacing: 0.2px;
  user-select: none;
}

.checkbox-label {
  display: flex;
  align-items: center;
}

.check {
  width: 18px;
  height: 18px;
  cursor: pointer;
  border: 1px solid $brown-color1;
  border-radius: 4px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 3px;
    top: 3px;
    width: 10px;
    height: 10px;
    background: $brown-color1;
    border-radius: 2px;
    transition: calc($transition / 2) transform;
    transform: scale(0);
  }
}
</style>
