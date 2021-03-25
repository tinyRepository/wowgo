<template>
  <div class="create-article">
    <form novalidate @submit.stop.prevent class="create-article__form">
      <h1 class="create-article__title">Создание статьи</h1>

      <input-el
        class="create-article__form-input"
        type="text"
        name="title"
        v-model="$v.form.title.$model"
        :validationObj="$v.form.title"
        inputId="title"
        whiteLabel
        placeholder="Введите заголовок"
        label="Заголовок"
      />

      <input-el
        class="create-article__form-input"
        type="text"
        name="shortDescription"
        v-model="$v.form.shortDescription.$model"
        :validationObj="$v.form.shortDescription"
        inputId="shortDescription"
        whiteLabel
        placeholder="Введите краткое описание"
        label="Краткое описание"
      />

      <select-box
        whiteLabel
        class="create-article__select-box"
        label="Выбирете тип статьи"
        v-model="$v.form.section.$model"
        :validationObj="$v.form.section"
        selectFirstByDefault
        :options="sections"
        trackBy="title"
        optionLabel="title"
        taggable
        searchable
        @tag="createSection"
      >
      </select-box>

      <textarea-el
        class="create-article__form-input"
        type="text"
        name="description"
        v-model="$v.form.description.$model"
        :validationObj="$v.form.description"
        inputId="description"
        whiteLabel
        placeholder="Введите описание"
        label="Описание"
      />

      <div class="create-article__upload">
        <label
          for="uploadImage"
          class="create-article__upload-label"
          :class="{ 'create-article__upload-label_error': fileIsEmpty }"
        >
          Загрузить изображение
        </label>
        <input
          type="file"
          accept="image/*"
          ref="image"
          id="uploadImage"
          class="create-article__upload-image"
          @change="handleFileUpload"
        />
        <div v-if="fileIsEmpty" class="text-error">
          Загрузите изображение!
        </div>
      </div>

      <img
        class="create-article__preview"
        v-if="form.image"
        :src="form.image"
      />

      <button-el class="create-article__button" @click="tryToSendForm">
        Сохранить
      </button-el>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { mapActions, mapGetters, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { dateFormatWithMonth } from "@/utils/config";
import validateFormMixin from "@/mixins/validateForm";

export default {
  mixins: [validateFormMixin],
  mounted() {
    this.setLoading(true);
    this.loadSections()
      .then(() => {})
      .finally(() => {
        this.setLoading(false);
      });

    if (!this.isAdmin) {
      this.$router.replace({ name: "knowledge-base" });
    }
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
      }
    };
  },
  computed: {
    ...mapState("articles", ["sections"]),
    ...mapGetters("userData", ["isAdmin"]),
    fileIsEmpty() {
      return this.$v.form.image.$invalid && this.$v.form.image.$dirty;
    },
    dataForSending() {
      return {
        title: this.form.title,
        shortDescription: this.form.shortDescription,
        description: this.form.description,
        createdDate: format(new Date(), dateFormatWithMonth, { locale: ru }),
        imageUrl: this.form.imageUrl,
        section: this.form.section
      };
    },
    isNewSection() {
      return this.sections.every(s => s.title !== this.form.section.title);
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
          return this.addArticle(this.dataForSending);
        })
        .catch(console.error);
    },
    handleFileUpload(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.form.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    async addSection() {
      return await firebase
        .database()
        .ref("sections")
        .push(this.form.section);
    },
    async createArticle() {
      const actions = [this.uploadImage()];

      if (this.isNewSection) {
        actions.push(this.addSection());
      }
      await Promise.all(actions).then(() => {
        alert("Статья успешно создана");
        this.$router.push({ name: "knowledge-base" });
      });
    },
    tryToSendForm() {
      this.validateForm().then(() => {
        this.setLoading(true);

        this.createArticle().finally(() => {
          this.setLoading(false);
        });
      });
    }
  }
};
</script>

<style lang="scss">
.create-article {
  max-width: 1200px;
  margin: 100px auto 50px;

  &__title {
    margin-bottom: 60px;
    @include fontRubik(32px, $white-color2);
  }

  &__form-input {
    margin-bottom: 60px;
  }

  &__select-box {
    margin-bottom: 60px;
    max-width: 500px;
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
    max-width: 500px;
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
}
</style>
