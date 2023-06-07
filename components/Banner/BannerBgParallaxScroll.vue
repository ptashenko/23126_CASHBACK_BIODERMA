<script lang="ts" setup>
const { y } = useWindowScroll()
const bgPositionY = computed(() => (`-${(y.value / 25)}%`))

</script>
<template>
  <div
    id="banner-hero-parallax"
    class="relative overflow-hidden min-h-[65vh]"
  >
    <div class="bg transform absolute left-0 top-0 bg-cover w-full min-h-screen" />
    <h2 class="center-the-unknown text-hero" v-text="'Lorem ipsum dolor sit amet'" />
  </div>
</template>

<style scoped>
.bg {
  background-image: url("assets/img/hero-bg-01.jpg");
  transform: translateY(v-bind(bgPositionY));
}

</style>
