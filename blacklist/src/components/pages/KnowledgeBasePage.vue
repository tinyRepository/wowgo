<template>
  <div class="knowledge-base">
    <search-el
      v-model="searchText"
      placeholder="Поиск по заголовку статьи"
      class="knowledge-base__search"
    />

    <div v-if="!notFound" class="stub-text">
      Ничего не найдено...
    </div>

    <div class="knowledge-base__content">
      <knowledge-base-menu
        :active-section="activeSection"
        @selectActiveSection="selectActiveSection"
        class="knowledge-base__menu"
      />

      <section v-if="notFound" class="knowledge-base__cards">
        <router-link
          v-for="article in selectedItems"
          :key="article.id"
          class="knowledge-base__article"
          :to="`/knowledge-base/${article.id}`"
        >
          <skeleton-image
            :src="article.imageUrl"
            class="knowledge-base__skeleton"
          />

          <div class="knowledge-base__article-content">
            <div class="knowledge-base__article-title">
              {{ article.title }}
            </div>
            <div class="knowledge-base__article-description">
              {{ article.shortDescription }}
            </div>
          </div>
        </router-link>
      </section>

      <router-link
        v-if="isAdmin"
        :to="{ name: 'create-article' }"
        class="knowledge-base__button"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import KnowledgeBaseMenu from "Common/KnowledgeBaseMenu";
import SkeletonImage from "Common/SkeletonImage";

const defaultSection = { title: "Все статьи" };

export default {
  components: { SkeletonImage, KnowledgeBaseMenu },

  data() {
    return {
      searchText: "",
      activeSection: defaultSection.title,
      selectedItems: []
    };
  },

  computed: {
    ...mapGetters("userData", ["isAdmin"]),
    ...mapState("articles", ["articles"]),
    notFound() {
      return this.selectedItems.some(item =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },

    sectionType() {
      return this.$route.query.sectionType;
    }
  },

  watch: {
    searchText(val) {
      if (val) {
        const filterdList = this.articles.filter(item => {
          return item.title.toLowerCase().includes(val.toLowerCase());
        });
        this.activeSection = defaultSection.title;
        this.selectedItems = filterdList;
      } else {
        this.selectedItems = this.articles;
      }
    }
  },

  created() {
    this.loadArticles().then(() => {
      this.selectedItems = [...this.articles];

      if (this.sectionType) {
        this.selectActiveSection(this.sectionType);
      }
    });
  },

  methods: {
    ...mapActions("articles", ["loadArticles"]),
    selectActiveSection(title) {
      this.activeSection = title;
      this.searchText = "";

      if (title == defaultSection.title) {
        this.selectedItems = this.articles;
        return;
      }
      this.selectedItems = this.articles.filter(article => {
        return article.section.title === title;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.knowledge-base {
  max-width: 1920px;
  margin: 115px auto 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1279px) {
    margin: 75px auto 50px;
  }

  &__search {
    margin-bottom: 40px;

    @media screen and (max-width: 1279px) {
      margin-bottom: 18px;
      margin-top: 50px;

      &.search {
        max-width: 250px;
        padding: 10px;
        font-weight: 300;
        background-size: 20px;
        font-size: 11px;
        letter-spacing: 0.5px;
      }
    }
    @media screen and (max-width: 768px) {
      margin-top: 20px;
    }
  }

  &__content {
    display: grid;
    width: 100%;
    grid-template-columns: 3fr 9fr 3fr;
    grid-template-rows: auto;

    @media screen and (max-width: 1279px) {
      grid-template-columns: 12fr;
      grid-template-rows: auto;

      .knowledge-base {
        &__menu {
          width: 100%;
          overflow-x: auto;
          padding-left: 0;
        }
      }
    }
  }

  &__menu {
    margin-left: 80px;

    @media screen and (max-width: 1279px) {
      margin: 10px 0;
    }
  }

  &__button {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    outline: none;
    z-index: 99;
    border: none;
    cursor: pointer;
    background: $brown-color1 url("~@/assets/svg/plus.svg") no-repeat center;
    position: fixed;
    bottom: 50px;
    margin-left: 80px;

    @media screen and (max-width: 1279px) {
      width: 50px;
      height: 50px;
      margin-left: 13px;
    }
  }

  &__article {
    display: inline-flex;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 10px;
    height: 244px;
    margin-bottom: 13px;
    position: relative;
    padding: 77px 30px;
    text-decoration: none;
    user-select: none;

    overflow: hidden;
    background-color: $gray-color10;

    @media screen and (min-width: 1280px) {
      &:nth-child(2n + 1) {
        width: 30%;
      }
      &:nth-child(2n) {
        width: calc(70% - 16px);
      }
      &:nth-child(3n) {
        width: 100%;
      }
      &:nth-child(3n + 1) {
        margin-right: 16px;
      }
      &:only-child {
        width: 100%;
        margin: 0;
      }
    }

    @media screen and (max-width: 1279px) {
      padding: 8px 15px;
      background: $gray-color11;
      max-width: 630px;
      height: auto;
      margin: 0 auto 12px !important;
      display: flex;

      &::before {
        max-height: 89px;
      }
    }

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background: $black-color3;
    }
  }

  &__article-content {
    word-break: break-all;
    position: relative;
    z-index: 2;

    @media screen and (max-width: 1279px) {
      margin-top: 87px;
    }
  }

  &__article-title {
    @include fontRubik(26px, $white-color2);
    margin-bottom: 7px;
    line-height: 20px;
    text-shadow: 0px 1px 1px rgba(33, 34, 38, 0.8);

    @media screen and (max-width: 1279px) {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 0px;
      letter-spacing: 0.3px;
    }
  }

  &__article-description {
    @include fontRubik(14px, $white-color2, 300);
    word-break: break-all;
    line-height: 20px;

    @media screen and (max-width: 1279px) {
      font-size: 12px;
      line-height: 14px;
    }
  }

  &__cards {
    @media screen and (max-width: 1279px) {
      margin: 0 25px;
      margin-top: -5px;
    }
  }

  &__skeleton {
    @media screen and (max-width: 1279px) {
      max-height: 89px;

      /deep/ .skeleton-image {
        border-radius: 10px;
      }
    }
  }

  .stub-text {
    @include fontRubik(18px, $white-color1);
    position: absolute;
    top: 200px;

    @media screen and (max-width: 1279px) {
      top: 180px;
      font-size: 13px;
    }

    @media screen and (max-width: 768px) {
      top: 152px;
    }
  }
}
</style>
