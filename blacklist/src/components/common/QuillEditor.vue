<template>
  <div :class="$style.editorWrapper">
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      @change="onEditorChange($event)"
      :class="$style.editor"
    />
    <span v-show="showError" :class="$style.errorText">Заполните поле!</span>
  </div>
</template>

<script>
import Vue from "vue";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

Vue.use(VueQuillEditor);

export default {
  props: {
    value: String,
    validationObj: Object
  },

  computed: {
    content: {
      get() {
        return this.value;
      },

      set(value) {
        this.onEditorChange(value);
      }
    },

    showError() {
      const { $invalid, $dirty } = this.validationObj;
      return $invalid && $dirty;
    }
  },

  methods: {
    onEditorChange({ html }) {
      this.$emit("update-description", html);
    }
  }
};
</script>

<style lang="scss" module>
.editor {
  border-radius: 5px;
  background: $white-color1;
}

.editorWrapper {
  position: relative;
}

.errorText {
  @include fontRubik(12px, $red-color1, 300);
  position: absolute;
  left: 0;
  right: 0;
  bottom: -21px;
}
</style>
