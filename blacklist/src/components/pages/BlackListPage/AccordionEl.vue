<template>
  <div class="accordion">
    <template v-if="searchText">
      <accordion-item
        v-for="item in listData"
        :isSingleElement="isSingleElement"
        :key="`${item.fullName}${item.dateOfBirth}`"
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
    listData: Array,
    searchText: String
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
