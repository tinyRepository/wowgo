<template>
  <div class="article-page">
    <knowledge-base-menu
      class="article-page__menu"
      @selectActiveSection="selectActiveSection"
    />
    <div class="article">
      <template v-if="isAdmin">
        <button @click="removeArticle" class="article__remove"></button>
        <button class="article__edit-article" @click="goToEditArticlePage" />
      </template>
      <button class="article__print" @click="print" />

      <div class="article__wrapper">
        <div class="article__info">
          <h4 class="article__date">{{ article.createdDate }}</h4>

          <div class="article__read-time">{{ beautifyReadTime }}</div>
        </div>
        <h1 class="article__title">{{ article.title }}</h1>
        <p v-html="article.description" class="article__description" />
        <div
          v-if="zoomed"
          class="article__image-overlay"
          @click="zoomed = false"
        />
        <img
          class="article__image"
          :class="{ article__image_zoomed: zoomed }"
          :src="article.imageUrl"
          @click="zoomImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { mapActions, mapGetters } from "vuex";
import { getUnitsDeclension } from "@/utils/helpers";
import { averageReadingSpeed } from "@/utils/config";
import KnowledgeBaseMenu from "Common/KnowledgeBaseMenu";

const defaultSection = "Все статьи";

export default {
  metaInfo() {
    return {
      title: this.article.title
    };
  },

  components: {
    KnowledgeBaseMenu
  },

  data() {
    return {
      article: {},
      zoomed: false
    };
  },

  computed: {
    ...mapGetters("userData", ["isAdmin"]),
    articleId() {
      return this.$route.params.id;
    },

    articleTranslitTitle() {
      return this.$route.params.title;
    },

    countOfChars() {
      const { description } = this.article;
      const descriptionWithoutTags =
        description && description.replace(/<\/?[^>]+(>|$)/g, "");

      return descriptionWithoutTags && descriptionWithoutTags.length;
    },

    readTime() {
      const time = this.countOfChars / averageReadingSpeed / 60;
      return Math.ceil(time);
    },

    beautifyReadTime() {
      return `Время чтения ${this.readTime} ${this.getTimeDeclension}`;
    },

    getTimeDeclension() {
      return getUnitsDeclension(this.readTime, ["минута", "минуты", "минут"]);
    }
  },

  created() {
    Promise.all([this.loadSections(), this.getArticleById()]);
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    ...mapActions("articles", ["loadSections", "deleteArticle"]),
    ...mapActions("common", ["setLoading"]),
    zoomImage() {
      this.zoomed = !this.zoomed;
    },

    async getArticleById() {
      this.setLoading(true);

      await firebase
        .database()
        .ref(`articles/${this.articleId}`)
        .once("value")
        .then(snapshot => {
          if (!snapshot.val()) {
            this.$router.replace("/knowledge-base");
          }
          this.article = snapshot.val();
        })
        .finally(() => {
          this.setLoading(false);
        });
    },

    selectActiveSection(section) {
      if (section === defaultSection) {
        this.$router.push("/knowledge-base");
        return;
      }
      this.$router.push(`/knowledge-base?sectionType=${section}`);
    },

    handleScroll(event) {
      if (event) {
        this.zoomed = false;
      }
    },

    print() {
      window.print();
    },

    goToEditArticlePage() {
      this.$router.push({
        name: "create-article",
        params: {
          id: this.articleId,
          title: this.articleTranslitTitle
        }
      });
    },

    removeArticle() {
      const removeArticle = confirm("Вы уверены, что хотите удалить статью?");

      if (removeArticle) {
        this.deleteArticle(this.articleId).then(() => {
          this.$router.replace({ name: "knowledge-base" });
        });
      }
    }
  }
};
</script>

<style lang="scss">
.article-page {
  display: grid;
  width: 100%;
  grid-template-columns: 3fr 9fr 3fr;
  grid-template-rows: auto;
  margin-top: 115px;
  padding-bottom: 60px;

  @media screen and (max-width: 1279px) {
    grid-template-columns: 12fr;
    grid-template-rows: auto;
    margin-top: 0;
  }

  &__menu {
    margin-left: 80px;
    margin-top: 94px;

    @media screen and (max-width: 1279px) {
      margin: 94px 0 0;
    }
  }

  .knowledge-menu__list-button:hover {
    color: $brown-color1;
  }
}

.article {
  max-width: 1017px;
  width: 100%;
  justify-self: center;
  background: $gray-color9;
  border-radius: 10px;
  margin-top: -10px;
  position: relative;

  @media screen and (max-width: 1279px) {
    border-radius: 0;
    margin-top: 10px;
  }

  &__info {
    display: flex;
    align-items: center;
  }

  &__title {
    @include fontVerdana(24px, $white-color2, bold);
    line-height: 1.2;
    word-break: break-word;
    letter-spacing: 0.7px;
    margin-top: 1px;
    margin-bottom: -1px;

    @media screen and (max-width: 1279px) {
      font-size: 20px;
      line-height: 30px;
      word-break: initial;
    }
  }

  &__date {
    @include fontRubik(14px, $gray-color1, 300);
    line-height: 18px;
    margin: 0;
    margin-right: 40px;
  }

  &__description {
    @include fontRubik(16px, $white-color2, 300);
    white-space: break-spaces;
    line-height: 20px;

    & > p {
      margin: 0;
      word-break: break-word;
      @include fontVerdana(16px, $white-color2);
      line-height: 1.5;
    }

    & > a {
      color: $brown-color1;
    }

    & img {
      margin: 10px 0;
      max-width: 100%;
    }

    & > h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 0;
    }

    & > h3 {
      @include fontVerdana(22px, $white-color2, bold);
      line-height: 1.2;
    }

    & > blockquote {
      font-style: italic;
      line-height: 25px;
      border-left: 3px solid #000;
      margin: 10px 0;
      padding-left: 10px;
    }

    & > strong {
      font-weight: bold;
    }

    & > h3.formatted {
      margin: 0;
      font-size: 22px;
      font-weight: 300;
      display: inline-block;
    }
  }

  &__wrapper {
    max-width: 608px;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: 69px 0 178px;

    @media screen and (max-width: 1279px) {
      padding: 39px 0;
      margin: 0 15px;
    }
  }

  &__print {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    right: 42px;
    top: 28px;
    @include removeBtnDefaults();
    background: url("~@/assets/svg/print.svg") no-repeat center;

    @media screen and (max-width: 1279px) {
      display: none;
    }
  }

  &__edit-article {
    position: absolute;
    right: 82px;
    top: 28px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    @include removeBtnDefaults();
    background: url("~@/assets/svg/pencil.svg") no-repeat center;

    @media screen and (max-width: 768px) {
      right: 15px;
      top: 14px;
      width: 17px;
      height: 17px;
    }
  }

  &__remove {
    position: absolute;
    right: 120px;
    top: 23px;
    width: 30px;
    height: 30px;
    @include removeBtnDefaults();
    background-size: contain;
    background: url("~@/assets/svg/trash.svg") no-repeat center;

    @media screen and (max-width: 768px) {
      top: 6px;
      right: 50px;
    }
  }

  &__read-time {
    @include fontRubik(14px, $gray-color1, 300);
  }

  &__image-overlay {
    background: $black-color3;
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
  }

  &__image {
    max-width: 600px;
    border-radius: 5px;
    width: 100%;
    cursor: zoom-in;
    will-change: transform;
    transition: transform calc($transition / 2);

    &_zoomed {
      z-index: 100;
      transform: scale(1.5);
      cursor: zoom-out;
    }
  }
}
</style>
