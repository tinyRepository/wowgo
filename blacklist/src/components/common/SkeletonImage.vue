<template>
  <div
    class="skeleton-wrapper"
    :class="{ 'skeleton-wrapper_loaded': isLoaded }"
  >
    <img :src="src" class="skeleton-image" @load="isLoaded = true" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isLoaded: false
    };
  }
};
</script>

<style lang="scss">
.skeleton-image {
  position: absolute;
  left: 0;
  top: 0;
}

.skeleton-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.6) 20%,
      rgba(#fff, 0.9) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 3s infinite;
    content: "";
  }

  &_loaded {
    & > img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    &::after {
      display: none;
    }
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
