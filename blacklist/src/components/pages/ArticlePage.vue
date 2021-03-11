<template>
  <div class="article-page">
    <knowledge-base-menu
      class="article-page__menu"
      @selectActiveSection="selectActiveSection"
    />
    <div class="article">
      <div class="article__wrapper">
        <div class="article__info">
          <h4 class="article__date">{{ article.createdDate }}</h4>

          <div class="article__read-time">{{ beautifyReadTime }}</div>
        </div>
        <h1 class="article__title">{{ article.title }}</h1>
        <p class="article__description" v-html="article.description"></p>
        <div
          class="article__image-overlay"
          v-if="zoomed"
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
import { mapActions } from "vuex";
import { getUnitsDeclension } from "@/utils/helpers";
import KnowledgeBaseMenu from "Common/KnowledgeBaseMenu";

const defaultSection = "Все статьи";

export default {
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
    articleId() {
      return this.$route.params.id;
    },
    readTime() {
      const countOfChars =
        this.article.description && this.article.description.length;
      const averageReadingSpeed = 23.5;
      const time = countOfChars / averageReadingSpeed / 60;
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
    ...mapActions("articles", ["loadSections"]),
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

  &__menu {
    margin-left: 80px;
    margin-top: 94px;
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

  &__info {
    display: flex;
    align-items: center;
  }

  &__title {
    @include fontRubik(36px, $white-color2);
    line-height: 44px;
    word-break: break-all;
    letter-spacing: 0.7px;
    margin-top: 1px;
    margin-bottom: -1px;
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

    & > a {
      color: $brown-color1;
    }
  }

  &__wrapper {
    max-width: 608px;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: 69px 0 178px;
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
    max-width: 540px;
    width: 100%;
    cursor: zoom-in;
    will-change: transform;
    transition: transform $transition/2;

    &_zoomed {
      z-index: 100;
      transform: scale(1.5);
      cursor: zoom-out;
    }
  }
}
</style>
