<template>
  <input
    type="text"
    v-model="searchText"
    :placeholder="placeholder"
    class="search"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Поиск"
    }
  },
  computed: {
    searchText: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  border-radius: 10px;
  @include fontRubik(14px, $white-color1);
  line-height: 18px;
  border: none;
  -moz-appearance: textfield;
  outline: none;
  padding: 16px 50px 16px 20px;
  max-width: 325px;
  width: 100%;
  background: $gray-color1 url("~@/assets/svg/search.svg") right 10px center
    no-repeat;
  &::placeholder {
    color: $white-color1;
  }
}
</style>
