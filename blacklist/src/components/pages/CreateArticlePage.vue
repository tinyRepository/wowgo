<template>
  <div class="create-article">
    <form novalidate @submit.stop.prevent class="create-article__form">
      <h1 class="create-article__title">Создание статьи</h1>

      <base-input
        v-model.trim="$v.form.title.$model"
        :validationObj="$v.form.title"
        class="create-article__form-input"
        type="text"
        name="title"
        inputId="title"
        whiteLabel
        placeholder="Введите заголовок"
        label="Заголовок"
      />

      <base-input
        v-model="$v.form.shortDescription.$model"
        :validationObj="$v.form.shortDescription"
        class="create-article__form-input"
        type="text"
        name="shortDescription"
        inputId="shortDescription"
        whiteLabel
        placeholder="Введите краткое описание"
        label="Краткое описание"
      />

      <select-box
        v-model="$v.form.section.$model"
        :validationObj="$v.form.section"
        whiteLabel
        class="create-article__select-box"
        label="Выбирете тип статьи"
        selectFirstByDefault
        :options="sections"
        trackBy="title"
        optionLabel="title"
        taggable
        searchable
        @tag="createSection"
      >
      </select-box>

      <div class="create-article__editor">
        <div class="quill-editor-label">
          Введите описание
        </div>
        <quill-editor
          v-model="form.description"
          class="quill-editor"
          :validationObj="$v.form.description"
          @update-description="updateDescription"
        />
      </div>

      <div class="create-article__upload">
        <label
          for="uploadImage"
          class="create-article__upload-label"
          :class="{ 'create-article__upload-label_error': fileIsEmpty }"
        >
          Загрузить изображение
        </label>
        <input
          ref="image"
          type="file"
          accept="image/*"
          id="uploadImage"
          class="create-article__upload-image"
          @change="handleFileUpload"
        />
        <div v-if="fileIsEmpty" class="text-error">
          Загрузите изображение!
        </div>
      </div>

      <img class="create-article__preview" :src="previewSrc" />

      <base-button class="create-article__button" @click="tryToSendForm">
        Сохранить
      </base-button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import { mapActions, mapGetters, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { dateFormatWithMonth } from "@/utils/config";
import { translitText } from "@/utils/helpers";
import validateFormMixin from "@/mixins/validateForm";
import QuillEditor from "../common/QuillEditor.vue";

export default {
  mixins: [validateFormMixin],

  components: {
    QuillEditor
  },

  data() {
    return {
      form: {
        title: "",
        shortDescription: "",
        description: "",
        image: null,
        imageUrl: "",
        section: ""
      },
      editMode: false,
      fileIsUpload: false
    };
  },

  computed: {
    ...mapState("articles", ["sections"]),
    ...mapGetters("userData", ["isAdmin"]),
    fileIsEmpty() {
      const { $invalid, $dirty } = this.$v.form.image;
      return $invalid && $dirty;
    },

    articleId() {
      return this.$route.params.id;
    },

    dataForSending() {
      return {
        title: this.form.title,
        shortDescription: this.form.shortDescription,
        description: this.form.description,
        createdDate: format(new Date(), dateFormatWithMonth, { locale: ru }),
        imageUrl: this.form.imageUrl,
        section: this.form.section,
        translitTitle: this.translitTitle
      };
    },

    isNewSection() {
      return this.sections.every(
        section => section.title !== this.form.section.title
      );
    },

    previewSrc() {
      const { image, imageUrl } = this.form;
      return image || imageUrl;
    },

    alertText() {
      return this.editMode ? `обновлена` : `создана`;
    },

    translitTitle() {
      return translitText(this.form.title);
    }
  },

  mounted() {
    this.fetchArticleData();

    if (!this.isAdmin) {
      this.$router.replace({ name: "knowledge-base" });
    }
  },

  methods: {
    ...mapActions("common", ["setLoading"]),
    ...mapActions("articles", ["addArticle", "loadSections"]),
    createSection(newTag) {
      const tag = {
        title: newTag
      };
      this.form.section = tag;
    },

    uploadImage() {
      const file = this.$refs.image.files[0];

      const firebaseImages = firebase.storage().ref("articlesImages");
      const imageName = `${+new Date()}-${file.name}`;

      const task = firebaseImages.child(imageName).put(file);

      return task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          this.form.imageUrl = url;
        })
        .catch(console.error);
    },

    handleFileUpload(event) {
      const input = event.target;

      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.form.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
        this.fileIsUpload = true;
      }
    },

    async addSection() {
      return await firebase
        .database()
        .ref("sections")
        .push(this.form.section);
    },

    editArticle() {
      const actions = [];

      if (this.fileIsUpload) {
        actions.push(this.uploadImage());
      }

      if (this.isNewSection) {
        actions.push(this.addSection());
      }

      return Promise.all(actions).then(() => {
        const task = this.editMode
          ? this.updateArticle()
          : this.addArticle(this.dataForSending);

        task.then(() => {
          alert(`Статья успешно ${this.alertText}`);
          this.goToKnowledgeBasePage();
        });
      });
    },

    async updateArticle() {
      await firebase
        .database()
        .ref(`articles/${this.articleId}`)
        .update({
          title: this.form.title,
          shortDescription: this.form.shortDescription,
          description: this.form.description,
          imageUrl: this.form.imageUrl,
          section: this.form.section
        });
    },

    async getArticleById() {
      await firebase
        .database()
        .ref(`articles/${this.articleId}`)
        .once("value")
        .then(snapshot => {
          Object.assign(this.form, snapshot.val());
          this.form.image = snapshot.val().imageUrl;
          this.editMode = true;
        });
    },

    tryToSendForm() {
      this.validateForm().then(() => {
        this.setLoading(true);

        return this.editArticle().finally(() => {
          this.setLoading(false);
        });
      });
    },

    goToKnowledgeBasePage() {
      this.$router.push({ name: "knowledge-base" });
    },

    fetchArticleData() {
      const actions = [this.loadSections()];

      this.setLoading(true);
      if (this.articleId) {
        actions.push(this.getArticleById());
      }

      Promise.all(actions)
        .then(() => {})
        .finally(() => {
          this.setLoading(false);
        });
    },

    updateDescription(html) {
      this.form.description = html;
    }
  },

  validations: {
    form: {
      title: {
        required
      },
      shortDescription: {
        required
      },
      description: {
        required
      },
      image: {
        required
      },
      section: {
        required
      }
    }
  }
};
</script>

<style lang="scss">
.create-article {
  max-width: 1200px;
  margin: 100px auto 50px;
  @media screen and (max-width: 768px) {
    margin: 70px auto;
  }

  &__title {
    margin-bottom: 60px;
    @include fontRubik(32px, $white-color2);

    @media screen and (max-width: 768px) {
      font-size: 26px;
    }
  }

  &__form-input {
    margin-bottom: 60px;
  }

  &__select-box {
    margin-bottom: 60px;
    max-width: 1000px;
    width: 100%;
  }

  &__upload {
    line-height: 35px;
    margin-bottom: 20px;
  }

  &__upload-image {
    display: block;
    margin-bottom: 30px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 600px) {
      margin: 0 15px;
    }
  }

  &__form-input {
    max-width: 1000px;
    width: 100%;

    & > textarea {
      height: 150px !important;
    }
  }

  &__preview {
    width: 100%;
    max-width: 540px;
    margin-bottom: 30px;
  }

  &__upload {
    user-select: none;

    & > input {
      display: none;
    }
  }

  &__upload-label {
    border-radius: 5px;
    border: 1px solid $white-color1;
    padding: 7px 15px;
    @include fontRubik(16px, $white-color1);
    cursor: pointer;

    &_error {
      border-color: $red-color1;
    }
  }

  &__button {
    margin-bottom: 50px;
  }

  .text-error {
    @include fontRubik(12px, $red-color1, 300);
    text-align: center;
  }

  &__editor {
    position: relative;
  }
}
</style>

<style lang="scss" scoped>
.quill-editor {
  border-radius: 5px;
  max-width: 1000px;
  margin: 0 0 60px;

  ::v-deep {
    .ql-toolbar {
      border: none;
      border-bottom: 1px solid $gray-color4;
    }

    .ql-editor {
      max-height: calc(100vh - 190px);
    }

    .ql-container {
      border: none;
    }
  }
}

.quill-editor-label {
  @include fontSans(15px, $white-color1, bold);
  line-height: 20px;
  letter-spacing: -0.4px;
  position: absolute;
  left: 0px;
  top: -35px;
}
</style>
