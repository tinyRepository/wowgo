<template>
  <div class="form-group">
    <label
      v-if="label"
      :for="selectId"
      class="form-group__label"
      :class="{ 'form-group__label_white': whiteLabel }"
    >
      {{ label }}
    </label>
    <multiselect
      :searchable="false"
      :track-by="trackBy"
      :label="optionLabel"
      :id="selectId"
      :value="value"
      @input="onChange"
      placeholder="Выберите из списка"
      :options="options"
      :allow-empty="false"
      :preselect-first="selectFirstByDefault"
      class="multiselect"
    >
    </multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  props: {
    whiteLabel: Boolean,
    trackBy: {
      type: String,
      default: "value"
    },
    optionLabel: {
      type: String,
      default: "value"
    },
    value: Object,
    options: Array,
    selectId: String,
    label: String,
    selectFirstByDefault: Boolean
  },
  methods: {
    onChange(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss">
.form-group {
  position: relative;
  &__label {
    @include fontSans(15px, $black-color2, bold);
    line-height: 20px;
    letter-spacing: -0.4px;
    position: absolute;
    left: 0px;
    top: -35px;
    &_white {
      color: $white-color1;
    }
  }
}
.multiselect {
  cursor: pointer;
  background: $white-color2;
  appearance: none;
  border-radius: 5px;
  @include fontRubik(13px, $black-color1, 300);
  outline: none;
  padding: 17px 20px;
  min-width: 180px;
  border: 1px solid $gray-color3;
  height: 50px;
  width: 100%;
  position: relative;
  display: flex;
  &__content-wrapper {
    min-height: 50px;
    overflow-y: auto;
    position: absolute;
    top: 49px;
    left: 0;
    background: $white-color2;
    width: 100%;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.09);
    border-radius: 5px;
    z-index: 1;
  }
  &__content {
    padding: 10px 0;
    margin: 0;
    list-style: none;
    width: 100%;
    position: relative;
  }
  &__content-wrapper {
    border: 1px solid $gray-color3;
  }
  &__element {
    transition: background-color $transition/2;
    &:hover {
      background: $brown-color1;
    }
  }
  &__option {
    display: block;
    padding: 7px 20px;
  }
  &__select {
    background: url("~@/assets/svg/arrow.svg") no-repeat;
    background-size: contain;
    width: 12px;
    height: 6px;
    display: block;
    right: 24px;
    align-self: center;
    position: absolute;
    transition: transform $transition;
  }
}
.multiselect--active {
  .multiselect__select {
    transform: rotate(180deg);
  }
}
</style>
