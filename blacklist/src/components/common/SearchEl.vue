<template>
  <div class="search-wrapper">
    <input
      ref="field"
      type="text"
      class="search"
      v-model="searchText"
      :placeholder="placeholder"
      :class="{ search_filled: searchText }"
    />
    <div class="search-clear" v-if="searchText" @click="clearText"></div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
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
  },
  methods: {
    clearText() {
      this.searchText = "";
      this.$refs.field.focus();
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
  width: 100%;
  background: $gray-color1 url("~@/assets/svg/search.svg") right 10px center
    no-repeat;
  &::placeholder {
    color: $white-color1;
  }

  &_filled {
    background-image: none;
  }
}

.search-wrapper {
  max-width: 325px;
  width: 100%;
  position: relative;
}

.search-clear {
  width: 14px;
  height: 14px;
  cursor: pointer;
  position: absolute;
  right: 19px;
  top: calc(50% - 7px);
  background: url("~@/assets/svg/close.svg") center;
}
</style>
