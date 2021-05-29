<template>
  <div :class="$style.contacts">
    <div :class="$style.contactsWrapper">
      <div :class="$style.title">Контактная информация</div>
      <div :class="$style.subTitle">Служба поддержки</div>
      <p :class="$style.text">
        Если у Вас есть какие-либо вопросы относящиеся к работе нашей системы,
        пишите на почту hi@wowgo.tk и мы обязательно ответим.
      </p>
      <div :class="$style.subTitle">Социальные сети</div>
      <p :class="$style.text">
        Подписывайтесь на официальные сообщества в социальных сетях.
      </p>
      <div :class="$style.subTitle">Обратите внимание</div>
      <ol :class="$style.list">
        <li :class="$style.listItem">
          Guestscan.ru - Сервис/Сайт работает исключительно в ознакомительных
          целях
        </li>
        <li :class="$style.listItem">
          Нельзя отказывать человку в заселении, ссылаясь на guestscan.ru.
          Прямой отказ потребителю в заключении публичного договора, считается
          неправомерным действием.
        </li>
        <li :class="$style.listItem">
          Запросы на получение информации в отношении физического лица допустимо
          исполнять только при наличии у Вас письменного согласия на обработку
          его персональных данных. Выполняя поиск, Вы подтверждаете наличие
          такого согласия.
        </li>
        <li :class="$style.listItem">
          По закону, мы обязаны удалить персональные данные человка находящегося
          на guestscan.ru в случае его обращения.
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" module>
.contacts {
  padding-bottom: 80px;
}

.contactsWrapper {
  background-color: $gray-color11;
  padding: 13px 107px 100px;
  max-width: 1024px;
  margin: 111px auto 0;
  box-shadow: 0px 12px 12px rgba(50, 50, 71, 0.08),
    0px 16px 24px rgba(50, 50, 71, 0.08);
  border-radius: 10px;
}

.title {
  @include fontVerdana(32px, $white-color2, bold);
  text-align: center;
  line-height: 1.2;
  margin-top: 24px;
  margin-bottom: 50px;
}

.subTitle {
  margin-bottom: 25px;
  @include fontVerdana(24px, $white-color2, bold);
  line-height: 22px;
}

.text {
  @include fontVerdana(16px, $white-color2);
  line-height: 22px;
  max-width: 650px;
  margin-bottom: 32px;
}

.list {
  padding-left: 23px;
}

.listItem {
  @include fontVerdana(16px, $white-color2);
  line-height: 1.5;
  max-width: 670px;
  margin-bottom: 20px;
}
</style>
