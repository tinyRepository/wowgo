<template>
  <div class="black-list">
    <Popup v-if="showPopup" @close="showPopup = false" />
    <input
      type="text"
      v-model="searchText"
      placeholder="Поиск по ФИО"
      class="black-list__search"
    />
    <div class="black-list__table">
      <table v-if="formattedListData.length">
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th>Город рождения</th>
            <th>Нарушение</th>
            <th>Дата добавления в список</th>
            <th class="without-bg">Название гостиницы</th>
            <th class="without-bg">Адрес</th>
            <th class="without-bg">Телефон гостиницы</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in formattedListData" :key="index">
            <td class="accent-cell">{{ index + 1 }}</td>
            <td
              class="accent-cell accent-cell_with-tooltip"
              v-tooltip="{
                placement: 'bottom-right',
                classes: ['cell-tooltip'],
                content: item.reasonForAdding
              }"
            >
              {{ item | formatName }}
            </td>
            <td>{{ item.dateOfBirth }}</td>
            <td>{{ item.placeOfBirth }}</td>
            <td>{{ item.categoriesOfViolations }}</td>
            <td>{{ item.dateAdded }}</td>
            <td class="without-bg">{{ item.nameOfHotel }}</td>
            <td class="without-bg">{{ item.address }}</td>
            <td class="without-bg">{{ item.phone }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="stub-text">Ничего не найдено...</div>
      <button class="black-list__button" @click="showPopup = true"></button>
    </div>
  </div>
</template>

<script>
import Popup from "Common/PopUp";
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    showPopup: false,
    searchText: ""
  }),
  components: {
    Popup
  },
  computed: {
    ...mapState("blackList", ["listData"]),
    formattedListData() {
      const filterdList = this.listData.filter(item => {
        return item.fullName
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      });
      return this.searchText ? filterdList : this.listData;
    }
  },
  created() {
    this.loadBlackList();
  },
  filters: {
    formatName(item) {
      return `${item.surname} ${item.name} ${item.middleName}`;
    }
  },
  methods: {
    ...mapActions("blackList", ["loadBlackList"])
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
  @media screen and (max-width: 768px) {
    margin: 240px auto 110px;
  }
  &__table {
    max-width: 1670px;
    width: 100%;
    overflow-x: auto;
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    th {
      @include fontRubik(16px, $gray-color1, 500);
      line-height: 16px;
      padding: 15px 19px;
      background: $gray-color5;
      border: 1px solid $gray-color5;
      &.without-bg {
        background: transparent;
        border: none;
      }
    }
    tr {
      border-bottom: 2px solid $gray-color7;
    }
    td {
      background: $gray-color6;
      text-align: left;
      padding: 14px 24px;
      @include fontRubik(14px, $white-color1, 300);
      line-height: 16px;
      &.accent-cell {
        background: $gray-color5;
        &_with-tooltip {
          cursor: pointer;
        }
      }
      &.without-bg {
        background: transparent;
        border: none;
      }
    }
  }
  &__button {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    outline: none;
    margin-top: 30px;
    z-index: 100;
    border: none;
    cursor: pointer;
    background: $brown-color1 url("~@/assets/svg/plus.svg") no-repeat center;
    position: fixed;
    bottom: 30px;
  }
  &__search {
    border-radius: 10px;
    @include fontRubik(14px, $white-color1);
    line-height: 18px;
    border: none;
    -moz-appearance: textfield;
    outline: none;
    padding: 16px 50px 16px 20px;
    max-width: 325px;
    width: 100%;
    margin-bottom: 83px;
    background: $gray-color1 url("~@/assets/svg/search.svg") right 10px center
      no-repeat;
    &::placeholder {
      color: $white-color1;
    }
  }
}
.stub-text {
  text-align: center;
  @include fontRubik(25px, $white-color1);
}
</style>
