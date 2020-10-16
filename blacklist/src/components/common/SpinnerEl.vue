<template>
  <transition name="fade">
    <div class="spinner">
      <breeding-rhombus-spinner
        :animation-duration="2000"
        :size="65"
        color="#B68861"
      />
    </div>
  </transition>
</template>

<script>
import { BreedingRhombusSpinner } from "epic-spinners";

export default {
  components: {
    BreedingRhombusSpinner
  }
};
</script>

<style lang="scss" scoped>
.spinner {
  display: flex;
}
</style>
