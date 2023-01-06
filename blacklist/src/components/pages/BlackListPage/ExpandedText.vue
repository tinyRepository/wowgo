<template>
  <VTooltip :triggers="triggers" class="expand-component">
    <div class="expanded-text" ref="expandedText">
      <div class="content">
        {{ formattedText }}
      </div>
      <div class="expand-button" v-if="isLotOfContent">
        Показать полностью
      </div>
    </div>
    <template #popper>
      {{ text }}
    </template>
  </VTooltip>
</template>

<script>
const maxQuantityChars = 40;

export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  },

  computed: {
    isLotOfContent() {
      return this.text.length > maxQuantityChars;
    },

    formattedText() {
      return this.isLotOfContent
        ? `${this.text.substring(0, maxQuantityChars)}...`
        : this.text;
    },

    isMobile() {
      return window.innerWidth < 1200;
    },

    triggers() {
      return this.isMobile ? ["click"] : ["hover"];
    }
  }
};
</script>

<style lang="scss" scoped>
.expand-button {
  display: initial;
  width: max-content;
  margin-top: 3px;
  color: $brown-color1;
  position: relative;
  cursor: pointer;
  user-select: none;
  top: -1px;
  position: relative;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 1px;
    border-bottom: 1px dashed $brown-color2;
    width: 100%;
  }
}

.expanded-text {
  transition: height calc($transition / 2);
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>

<style lang="scss">
.v-popper__popper {
  .v-popper {
    &__wrapper {
      max-width: 400px;
    }

    &__inner {
      text-align: center;
      padding: 15px;
      background: rgba(0, 0, 0, 0.95);
      @include fontRubik(14px, $white-color1, 300);
    }
  }
}

@-moz-document url-prefix() {
  .expand-component {
    overflow-y: hidden;
  }
}
</style>
