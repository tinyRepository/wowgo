<template>
  <div class="expanded-text">
    <div>
      {{ formattedText }}
    </div>

    <div
      v-if="isLotOfContent"
      class="expand-button"
      @click="expanded = !expanded"
    >
      {{ buttonText }}
    </div>
  </div>
</template>

<script>
const maxQuantityChars = 40;

export default {
  data() {
    return {
      expanded: true
    };
  },
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
      const hideText = this.expanded && this.isLotOfContent;
      return hideText
        ? `${this.text.substring(0, maxQuantityChars)}...`
        : this.text;
    },
    buttonText() {
      return this.expanded ? "Показать полностью" : "Скрыть";
    }
  }
};
</script>

<style lang="scss" scoped>
.expand-button {
  display: initial;
  margin-top: 3px;
  color: $brown-color1;
  position: relative;
  cursor: pointer;
  user-select: none;

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
</style>
