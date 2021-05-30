<template>
  <footer :class="$style.footer">
    <ul :class="$style.list">
      <li v-for="link in links" :key="link.text" :class="$style.listItem">
        <router-link
          v-if="!link.externalHref"
          :to="link.href"
          :class="$style.link"
          class="link"
          >{{ link.text }}</router-link
        >
        <a
          v-else
          :href="link.externalHref"
          target="_blank"
          :class="$style.link"
          >{{ link.text }}</a
        >
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { text: "Политика конфиденциальности", href: "/privacy-policy" },
        {
          text: "Сообщество",
          externalHref: "https://t.me/joinchat/U3w9KzSYwFZRGTnF"
        },
        { text: "Контакты", href: "/contacts" }
      ]
    };
  }
};
</script>

<style lang="scss" module>
.footer {
  position: fixed;
  background-color: $black-color2;
  z-index: 1;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top: 1px solid $gray-color13;
}

.list {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 4px 80px;

  @media screen and (max-width: 960px) {
    padding: 4px 20px;
    justify-content: space-between;
  }
}

.listItem {
  line-height: 22px;
  list-style: none;

  &:not(:last-child) {
    margin-right: 30px;

    @media screen and (max-width: 960px) {
      margin-right: 0;
    }
  }
}

.link {
  @include font(12px, $white-color2);
  text-decoration: none;
  user-select: none;
}
</style>

<style lang="scss" scoped>
.link {
  &.router-link-active {
    color: $brown-color1;
  }
}
</style>
