<template>
  <div :class="$style.tooltip">
    <span
      :class="[$style.icon, $style.bold]"
      @click="$emit('formatText', '<strong>', '</strong>')"
    ></span>
    <span
      :class="[$style.icon, $style.italic]"
      @click="$emit('formatText', '<i>', '</i>')"
    ></span>
    <span
      :class="[$style.icon, $style.highText]"
      @click="$emit('formatText', `<h3 class='formatted'>`, '</h3>')"
    ></span>
    <span
      :class="[$style.icon, $style.smallText]"
      @click="$emit('formatText', '<small>', '</small>')"
    ></span>
    <span
      :class="[$style.icon, $style.quote]"
      @click="$emit('formatText', '<blockquote>', '</blockquote>')"
    ></span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
};
</script>

<style lang="scss" module>
.tooltip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 220px;
  height: 44px;
  background-color: $black-color4;
  border-radius: 6px;
  padding: 9px 12px;
}

.icon {
  width: 26px;
  height: 26px;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
  background: url("~@/assets/img/icons_2x.png") no-repeat;
  background-size: 50px;
  background-position-x: -14px;
  border-radius: 3px;
  padding: 2px;

  &:hover {
    background-color: $gray-color12;
  }
}

.bold {
  background-position-y: -10px;
}

.italic {
  background-position-y: -90px;
}

.link {
  background-position-y: -170px;
}

.highText {
  background-position-y: -250px;
}

.smallText {
  background-position-y: -330px;
}

.quote {
  background-position-y: -411px;
}
</style>
