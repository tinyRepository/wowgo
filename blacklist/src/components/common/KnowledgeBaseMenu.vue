<template>
  <section class="knowledge-menu">
    <ul class="knowledge-menu__list">
      <li
        v-for="(section, index) in sectionsMenu"
        :key="index"
        class="knowledge-menu__list-item"
      >
        <button
          @click="selectActiveSection(section.title)"
          class="knowledge-menu__list-button"
          :class="{
            'knowledge-menu__list-button_active':
              section.title === activeSection
          }"
        >
          {{ section.title }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from "vuex";
const defaultSection = { title: "Все статьи" };

export default {
  props: {
    activeSection: String
  },
  computed: {
    ...mapState("articles", ["sections"]),
    sectionsMenu() {
      return [defaultSection, ...this.sections];
    }
  },
  methods: {
    selectActiveSection(title) {
      this.$emit("selectActiveSection", title);
    }
  }
};
</script>

<style lang="scss" scoped>
.knowledge-menu {
  &__list {
    list-style: none;
    padding: 0;
    margin-top: 0;

    @media screen and (max-width: 1279px) {
      display: flex;
      overflow-x: auto;
      padding-left: 15px;
      max-width: 100vw;
      margin-bottom: 6px;
    }
  }

  &__list-button {
    @include removeBtnDefaults;
    @include fontRubik(16px, $white-color2, 300);
    letter-spacing: 1px;
    line-height: 18px;
    margin-bottom: 19px;
    transition: color, $transition/2;

    @media screen and (max-width: 1279px) {
      padding: 3px 9px;
      border-radius: 10px;
      background: $gray-color11;
      font-size: 11px;
      letter-spacing: 0;
      line-height: 19px;
      // margin-bottom: 5px;

      &_active {
        background: $brown-color1;
        color: $white-color1 !important;
      }
    }

    &_active {
      color: $brown-color1;
    }
  }

  &__list-item {
    @media screen and (max-width: 1279px) {
      white-space: nowrap;
      margin-right: 8px;

      &:last-child {
        padding-right: 15px;
      }
    }
  }
}
</style>
