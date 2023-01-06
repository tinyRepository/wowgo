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
        v-if="isMobile"
        :list-data="formattedListData"
        :search-text="searchText"
        class="black-list__accordion"
      />
    </div>

    <div
      v-if="!isMobile"
      class="black-list__table"
      :class="{
        'black-list__table_without-border': !formattedListData.length,
        'admin-table': isAdmin
      }"
    >
      <vue-virtual-table
        v-if="formattedListData.length"
        :config="tableConfig"
        :minWidth="isAdmin ? 1715 : 1420"
        :itemHeight="62"
        alignItems="center"
        justifyContent="start"
        :data="formattedListData"
        :hoverHighlight="false"
      >
        <template slot-scope="item" slot="name">
          {{ item.row | formatName }}
        </template>

        <template slot-scope="item" slot="reasonForAdding">
          <expanded-text :text="item.row.reasonForAdding" />
        </template>

        <template slot-scope="item" slot="management">
          <div class="remove-item" @click="removeUser(item.row.id)" />
        </template>
      </vue-virtual-table>

      <div v-else class="stub-text">
        Ничего не найдено...
      </div>
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
import AccordionEl from "./AccordionEl";
import ExpandedText from "./ExpandedText";
import VueVirtualTable from "vue-virtual-table";
import { mapState, mapActions, mapGetters } from "vuex";
import SuccessScreen from "Common/SuccessScreen";
const PopUp = () => import("Common/PopUp");

export default {
  components: {
    AccordionEl,
    ExpandedText,
    PopUp,
    SuccessScreen,
    VueVirtualTable
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
      searchText: "",
      isMobile: false
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
    },

    tableConfig() {
      return [
        { prop: "_index", name: "№", width: 50 },
        {
          prop: "_action",
          name: "ФИО",
          actionName: "name",
          width: 160
        },
        { prop: "dateOfBirth", name: "Дата рождения", width: 160 },
        { prop: "placeOfBirth", name: "Город рождения" },
        { prop: "categoriesOfViolations", name: "Нарушение", width: 130 },
        { prop: "nameOfHotel", name: "Гостиница", width: 150 },
        { prop: "phone", name: "Телефон гостиницы", isHidden: !this.isAdmin },
        { prop: "address", name: "Местоположение" },
        {
          prop: "_action",
          name: "Комментарий",
          actionName: "reasonForAdding"
        },
        { prop: "dateAdded", name: "Дата добавления", width: 160 },
        {
          prop: "_action",
          name: "Управление",
          actionName: "management",
          width: 120,
          isHidden: !this.isAdmin
        }
      ];
    }
  },

  watch: {
    searchText() {
      if (this.formattedListData.length) {
        this.$nextTick(() => {
          const scroller = document.querySelector(".scroller");
          scroller.scrollTop = 0;
        });
      }
    },

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
    this.checkWindowSize();
    window.addEventListener("resize", this.checkWindowSize);
    this.showSpinnerForRequest(this.loadBlackList());
  },

  methods: {
    ...mapActions("blackList", ["loadBlackList", "deleteUserFromBlackList"]),
    ...mapActions("common", ["showSpinnerForRequest"]),

    removeUser(id) {
      if (this.isAdmin) {
        const removeItem = confirm("Вы уверены, что хотите удалить гостя?");

        if (removeItem) {
          this.showSpinnerForRequest(this.deleteUserFromBlackList(id));
        }
      }
    },

    checkWindowSize() {
      if (window.innerWidth < 768) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }
  },

  destroyed() {
    window.removeEventListener("resize", this.checkWindowSize);
  }
};
</script>

<style lang="scss" scoped>
$tableHeadHeight: "40px";

.black-list {
  margin: 110px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - (#{$header-height} + #{$tableHeadHeight}));

  &__search {
    margin-bottom: 40px;
  }

  @media screen and (max-width: 768px) {
    margin: auto;
    transition: calc($transition / 2) transform;
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

      ::v-deep {
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
      margin-bottom: 50px;
    }
  }

  &__table {
    max-width: 1758px;
    border-radius: 10px;
    width: 100%;
    overflow-x: auto;
    margin-bottom: 30px;
    border: 1px solid $gray-color13;

    &.admin-table {
      max-width: 1758px;
    }

    @media screen and (max-width: 768px) {
      margin: 0;
      border: none;
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
    bottom: 34px;

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
  overflow: hidden;
  @include fontRubik(25px, $white-color1, 300);

  @media screen and (max-width: 768px) {
    display: none;
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

<style lang="scss">
.scroller {
  &::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $gray-color14;
    border-radius: 30px;
  }

  .items {
    will-change: margin-top;
  }

  .item-cell {
    border-bottom-color: $gray-color7 !important;

    .item-cell-inner {
      @include fontRubik(14px, $white-color1, 300);
    }

    &:not(:first-child) {
      .item-cell-inner {
        overflow: auto !important;
        word-break: break-word !important;
        text-align: left !important;
        height: auto !important;
        justify-content: start !important;
      }
    }
  }

  .item-line {
    transition: height calc($transition / 2);
    &:nth-child(odd) {
      background-color: $black-color2 !important;
    }
    &:nth-child(even) {
      background-color: $black-color5 !important;
    }
  }
}

.t-container {
  height: calc(100vh - 295px) !important;
}

.main-scroll {
  border: none !important;
}

.t-header {
  background-color: $gray-color5;
  border-bottom-color: $gray-color7 !important;
}

.header-line {
  height: 62px !important;
}

.header-cell {
  &:not(:first-child) {
    justify-content: start !important;
  }
}

.header-cell-inner {
  @include fontRubik(16px, $white-color4, 300);
}
</style>
