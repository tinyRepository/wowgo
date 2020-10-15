<template>
  <div class="black-list">
    <input
      type="text"
      placeholder="Поиск по списку"
      class="black-list__search"
    />
    <div class="black-list__table">
      <table v-if="listData">
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th>Город рождения</th>
            <th>Нарушение</th>
            <th>Дата добавления в список</th>
            <th class="without-bg">Название гостиницы</th>
            <th class="without-bg">Местоположение</th>
            <th class="without-bg">Телефон гостиницы</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listData" :key="index">
            <td class="accent-cell">{{ index + 1 }}</td>
            <td class="accent-cell">
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
      <button class="black-list__button" @click="openAddPopup"></button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { format } from "date-fns";
import { dateFormat } from "@/utils/config";
import { mapState } from "vuex";

export default {
  data: () => ({
    listData: null
  }),
  computed: {
    ...mapState("userData", ["user", "userInfo"]),
    dataForSending() {
      return {
        name: "Иван",
        surname: "Петров",
        middleName: "Хренова",
        placeOfBirth: "Красноярск",
        dateOfBirth: "13/01/2020", // TODO add format date
        categoriesOfViolations: "Воровство",
        nameOfHotel: this.userInfo.nameOfObject,
        phone: this.userInfo.phone,
        address: this.userInfo.address,
        dateAdded: format(new Date(), dateFormat)
      };
    }
  },
  created() {
    this.loadBlackList();
    // var user = firebase.auth().currentUser;
    // console.log(user);
  },
  filters: {
    formatName(item) {
      return `${item.surname} ${item.name} ${item.middleName}`;
    }
  },
  methods: {
    loadBlackList() {
      return firebase
        .database()
        .ref("black-list")
        .once("value")
        .then(snapshot => {
          this.listData = Object.values(snapshot.val());
        });
    },
    openAddPopup() {
      firebase
        .database()
        .ref("black-list")
        .push(this.dataForSending)
        .then(() => {
          this.loadBlackList();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.black-list {
  margin-top: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - #{$header-height});
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
      }
      &.without-bg {
        background: transparent;
        border: none;
      }
    }
  }
  &__button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    outline: none;
    margin-top: 30px;
    border: none;
    cursor: pointer;
    background: $brown-color1 url("~@/assets/svg/plus.svg");
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
