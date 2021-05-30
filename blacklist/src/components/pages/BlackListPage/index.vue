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
    <div
      class="black-list__table"
      :class="{ 'black-list__table_without-border': !formattedListData.length }"
    >
      <table v-if="formattedListData.length">
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th class="place-of-birth">Город рождения</th>
            <th class="categories-of-violations">Нарушение</th>
            <th>Гостиница</th>
            <th v-if="isAdmin">Телефон гостиницы</th>
            <th>Местоположение</th>
            <th class="comment-cell">Комментарий</th>
            <th>Дата добавления</th>
            <th v-if="isAdmin">Управление</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in formattedListData" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td class="accent-cell_with-tooltip">
              {{ item | formatName }}
            </td>
            <td>{{ item.dateOfBirth }}</td>
            <td class="place-of-birth">{{ item.placeOfBirth }}</td>
            <td class="categories-of-violations">
              {{ item.categoriesOfViolations }}
            </td>
            <td class="without-bg">{{ item.nameOfHotel }}</td>
            <td v-if="isAdmin" class="without-bg phone-cell">
              {{ item.phone }}
            </td>
            <td class="without-bg">{{ item.address }}</td>
            <td class="without-bg comment-cell" :title="item.reasonForAdding">
              <expanded-text :text="item.reasonForAdding" />
            </td>
            <td>{{ item.dateAdded }}</td>
            <td v-if="isAdmin">
              <div class="remove-item" @click="removeUser(item.id)" />
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
const PopUp = () => import("Common/PopUp");

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
    margin-bottom: 40px;
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
    max-width: 1758px;
    border-radius: 10px;
    width: 100%;
    overflow-x: auto;
    margin-bottom: 50px;
    border: 1px solid $gray-color13;

    @media screen and (max-width: 768px) {
      margin: 0;
      border: none;

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
      padding: 23px 15px;
      white-space: pre;
      min-height: 62px;
      background: $gray-color5;
      border-bottom: 1px solid $gray-color7;

      &.without-bg {
        max-width: 400px;
        background: transparent;
        border: none;
      }
    }

    tr {
      position: relative;
      height: 62px;

      &:not(:last-child) {
        border-bottom: 1px solid $gray-color7;
      }

      &:nth-child(even) {
        background: $black-color5;
      }
    }

    td {
      text-align: left;
      padding: 6px 15px;
      @include fontRubik(14px, $white-color1, 300);
      line-height: 16px;
      min-height: 62px;

      &:first-child {
        text-align: center;
      }

      &.without-bg {
        max-width: 400px;
        border: none;
        cursor: default;
      }
    }

    &_without-border {
      border-color: transparent;
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

    @media screen and (min-width: 1870px) {
      margin-left: -50px;
    }

    @media screen and (max-width: 768px) {
      left: 20px;
      bottom: 0;
    }
  }
}

.stub-text {
  text-align: center;
  @include fontRubik(25px, $white-color1, 300);
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
  max-width: 300px !important;

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
  width: 21px;
  height: 21px;
  cursor: pointer;
  background-size: contain;
  margin: auto;
  background: url("~@/assets/svg/trash.svg") no-repeat center;

  @media screen and (max-width: 768px) {
    display: none !important;
  }
}
</style>
