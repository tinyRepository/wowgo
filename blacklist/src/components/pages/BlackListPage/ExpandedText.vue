<template>
  <div class="expanded-text" ref="expandedText">
    <div>
      {{ formattedText }}
    </div>

    <div v-if="isLotOfContent" class="expand-button" @click="expandText">
      {{ buttonText }}
    </div>
  </div>
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

  data() {
    return {
      expanded: false,
      baseHeight: 0
    };
  },

  mounted() {
    this.baseHeight = this.$refs.expandedText.scrollHeight;
    this.setBaseHeight();
  },

  computed: {
    isLotOfContent() {
      return this.text.length > maxQuantityChars;
    },

    hideText() {
      return !this.expanded && this.isLotOfContent;
    },

    formattedText() {
      return this.hideText
        ? `${this.text.substring(0, maxQuantityChars)}...`
        : this.text;
    },

    buttonText() {
      return !this.expanded ? "Показать полностью" : "Скрыть";
    }
  },

  methods: {
    updateTextHeight() {
      if (!this.expanded) {
        this.setBaseHeight();
      } else {
        this.setMaxHeight();
      }
    },

    setBaseHeight() {
      this.$refs.expandedText.style.height = `${this.baseHeight}px`;
    },

    setMaxHeight() {
      this.$refs.expandedText.style.height = `${this.$refs.expandedText.scrollHeight}px`;
    },

    expandText() {
      this.expanded = !this.expanded;

      this.$nextTick(() => {
        this.updateTextHeight();
      });
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

.expanded-text {
  transition: height calc($transition / 2);
}
</style>
