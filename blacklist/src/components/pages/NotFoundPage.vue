<template>
  <div class="not-found">Страница не найдена</div>
</template>

<style lang="scss" scoped>
.not-found {
  @include fontRubik(40px, $white-color1);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - #{$header-height});

  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
}
</style>
