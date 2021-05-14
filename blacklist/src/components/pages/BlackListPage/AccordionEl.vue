<template>
  <div class="accordion">
    <template v-if="searchText">
      <accordion-item
        v-for="item in listData"
        :key="item.id"
        :is-single-element="isSingleElement"
        :item="item"
      />
      <div class="accordion__stub-text" v-if="!listData.length">
        Ничего не найдено...
      </div>
    </template>
  </div>
</template>

<script>
import AccordionItem from "./AccordionItem";

export default {
  components: {
    AccordionItem
  },

  props: {
    listData: {
      type: Array,
      default: () => []
    },

    searchText: {
      type: String,
      default: ""
    }
  },

  computed: {
    isSingleElement() {
      return this.listData.length === 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.accordion {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__stub-text {
    @include fontRubik(15px, $white-color1);
    text-align: center;
  }
}
</style>
