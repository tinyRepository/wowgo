<template>
  <div id="app">
    <Header class="main-header" />
    <spinner-el v-if="loading" />
    <transition name="fade" mode="out-in">
      <router-view class="content-block" />
    </transition>
    <Mertrika />
  </div>
</template>

<script>
import Header from "Common/Header";
import Mertrika from "Common/YaMetrika";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("common", ["loading"])
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
  },
  components: {
    Header,
    Mertrika
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
.content-block {
  margin-top: 70px;
  max-width: 1920px;
  margin: 70px auto 0;
}
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity $transition/2 ease;
}

.fade-leave-active {
  transition: opacity $transition/2 ease;
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
