<template>
  <div
    class="black-list"
    :class="{
      'black-list_pinned': searchText,
      'black-list_default': showPopup || showSuccessPopup
    }"
  >
    <pop-up
      v-if="showPopup"
      @close="showPopup = false"
      @showSuccessPopup="showSuccessPopup = true"
    />
    <success-screen v-if="showSuccessPopup" @close="showSuccessPopup = false" />
    <div class="mobile-description">
      <div class="mobile-description__quote">get out of here</div>
      <h1 class="mobile-description__title">GUEST SCAN</h1>
    </div>
    <div class="search-wrapper">
      <search-el
        v-model="searchText"
        placeholder="Поиск по ФИО"
        class="black-list__search"
      />

      <accordion-el
        :list-data="formattedListData"
        :search-text="searchText"
        class="black-list__accordion"
      />
    </div>
    <div class="black-list__table">
      <table v-if="formattedListData.length">
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th class="place-of-birth">Город рождения</th>
            <th class="categories-of-violations">Нарушение</th>
            <th>Дата добавления в список</th>
            <th class="without-bg">Название гостиницы</th>
            <th class="without-bg">Местоположение</th>
            <th class="without-bg comment-cell">Комментарий</th>
            <th class="without-bg" v-if="isAdmin">Телефон гостиницы</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in formattedListData" :key="item.id">
            <td class="accent-cell">{{ index + 1 }}</td>
            <td class="accent-cell accent-cell_with-tooltip">
              {{ item | formatName }}
            </td>
            <td>{{ item.dateOfBirth }}</td>
            <td class="place-of-birth">{{ item.placeOfBirth }}</td>
            <td class="categories-of-violations">
              {{ item.categoriesOfViolations }}
            </td>
            <td>{{ item.dateAdded }}</td>
            <td class="without-bg">{{ item.nameOfHotel }}</td>
            <td class="without-bg">{{ item.address }}</td>
            <td class="without-bg comment-cell" :title="item.reasonForAdding">
              <expanded-text :text="item.reasonForAdding" />
            </td>
            <td
              v-if="isAdmin"
              class="without-bg phone-cell"
              @click="removeUser(item.id)"
            >
              {{ item.phone }}
              <div class="remove-item" />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="stub-text">Ничего не найдено...</div>
      <button
        v-if="checkUser"
        aria-label="Add user to list"
        class="black-list__button"
        @click="showPopup = true"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ExpandedText from "./ExpandedText";
import SuccessScreen from "Common/SuccessScreen";
import AccordionEl from "./AccordionEl";
import PopUp from "Common/PopUp";

export default {
  components: {
    PopUp,
    AccordionEl,
    ExpandedText,
    SuccessScreen
  },

  filters: {
    formatName(item) {
      return `${item.surname} ${item.name} ${item.middleName}`;
    }
  },

  data() {
    return {
      showPopup: false,
      showSuccessPopup: false,
      searchText: ""
    };
  },

  computed: {
    ...mapState("blackList", ["listData"]),
    ...mapGetters("userData", ["isAdmin", "checkUser"]),
    formattedListData() {
      const filterdList = this.listData.filter(item => {
        return item.fullName
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      });
      return this.searchText ? filterdList : this.listData;
    }
  },

  watch: {
    showPopup(val) {
      const html = document.querySelector("html");
      if (val) {
        html.classList.add("stop");
      } else {
        html.classList.remove("stop");
      }
    }
  },

  created() {
    this.loadBlackList();
  },

  methods: {
    ...mapActions("blackList", ["loadBlackList", "deleteUserFromBlackList"]),

    removeUser(id) {
      if (this.isAdmin) {
        const removeItem = confirm("Вы уверены, что хотите удалить гостя?");

        if (removeItem) {
          this.deleteUserFromBlackList(id);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.black-list {
  margin: 110px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - #{$header-height});

  &__search {
    margin-bottom: 83px;
  }

  &__accordion {
    display: none;
  }

  @media screen and (max-width: 768px) {
    margin: auto;
    transition: $transition/2 transform;
    transform: translate3d(0, calc(50vh - 190px), 0);
    min-height: calc(100vh - calc(50vh - 130px));

    &_pinned {
      transform: translate3d(0, 0, 0);
    }

    &_default {
      transition: none;
      transform: none;
    }

    &__search {
      max-width: 740px !important;
      margin: 5px 19px 26px;
      padding: 0 19px;
      width: 100%;

      /deep/ {
        input {
          max-width: inherit;
          background-size: 20px;
          background-position: right 6px top 10px;
          font-size: 12px;
          padding: 11px 35px 11px 10px;
        }

        .search-clear {
          right: 30px;
        }
      }
    }

    &__accordion {
      display: flex;
      margin-bottom: 50px;
    }
  }

  &__table {
    max-width: 1670px;
    width: 100%;
    overflow-x: auto;

    @media screen and (max-width: 768px) {
      & > table {
        display: none;
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    th {
      @include fontRubik(16px, $white-color4, 300);
      line-height: 16px;
      padding: 14px;
      background: $gray-color5;
      border: 1px solid $gray-color5;
      &.without-bg {
        max-width: 400px;
        background: transparent;
        border: none;
      }
    }

    tr {
      border-bottom: 2px solid $gray-color7;
      position: relative;
    }

    td {
      background: $gray-color6;
      text-align: left;
      padding: 14px;
      @include fontRubik(14px, $white-color1, 300);
      line-height: 16px;

      &.accent-cell {
        background: $gray-color5;
      }

      &.without-bg {
        max-width: 400px;
        background: transparent;
        border: none;
        cursor: default;
      }
    }
  }

  &__button {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    outline: none;
    margin-top: 30px;
    z-index: 99;
    border: none;
    cursor: pointer;
    background: $brown-color1 url("~@/assets/svg/plus.svg") no-repeat center;
    position: fixed;
    bottom: 30px;

    @media screen and (max-width: 768px) {
      left: 20px;
      bottom: 0;
    }
  }
}

.stub-text {
  text-align: center;
  @include fontRubik(25px, $white-color1);
  @media screen and (max-width: 768px) {
    display: none;
  }
}

.phone-cell {
  position: relative;
  white-space: nowrap;

  &:hover {
    & > .remove-item {
      display: block;
    }
  }
}

.place-of-birth {
  max-width: 200px;
}

.categories-of-violations {
  max-width: 180px;
}

.comment-cell {
  @media screen and (max-width: 768px) {
    padding: 14px 10px 14px 0px !important;
  }
}

.mobile-description {
  text-align: center;
  margin-top: 111px;

  @media screen and (min-width: 769px) {
    display: none;
  }

  &__quote {
    @include fontRubik(12px, $brown-color1);
    line-height: 9px;
    letter-spacing: 0.7px;
  }

  &__title {
    @include fontRubik(30px, $white-color2, 500);
    line-height: 36px;
    letter-spacing: 0.7px;
    margin-bottom: 3px;
    margin-top: 0;
  }
}

.search-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.remove-item {
  position: absolute;
  right: 10px;
  top: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-size: contain;
  background: url("~@/assets/svg/trash.svg") no-repeat center;
  display: none;

  @media screen and (max-width: 768px) {
    display: none !important;
  }
}
</style>
