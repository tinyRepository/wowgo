<template>
  <div id="app">
    <the-header class="main-header" />
    <the-spinner v-if="loading" />
    <transition name="fade" mode="out-in">
      <main id="maincontent">
        <router-view class="content-block" />
      </main>
    </transition>
    <the-footer class="main-footer" />
  </div>
</template>

<script>
import TheHeader from "Common/TheHeader";
import TheFooter from "Common/TheFooter";
import { mapGetters } from "vuex";

export default {
  metaInfo() {
    return {
      title: this.metaTitle || "Wowgo",
      titleTemplate: "%s | Чёрный список"
    };
  },

  components: {
    TheHeader,
    TheFooter
  },

  computed: {
    ...mapGetters("common", ["loading"]),

    metaTitle() {
      const { title } = this.$route.meta;
      return title;
    }
  },

  watch: {
    loading(val) {
      const html = document.querySelector("html");

      if (val) {
        html.classList.add("stop");
      } else {
        html.classList.remove("stop");
      }
    }
  }
};
</script>

<style lang="scss">
.main-header {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: $black-color2;
}

.main-footer {
  @media screen and (max-width: 768px) {
    display: none;
  }
}

.content-block {
  margin-top: 70px;
  max-width: 1920px;
  margin: 70px auto 0;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity $transition/3 ease;
}

.fade-leave-active {
  transition: opacity $transition/3 ease;
  opacity: 0;
}

.spinner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $black-color1;
}
</style>
