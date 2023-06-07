<script lang="ts" setup>
// To use a lottie animation just import the JSON file and use it on the LottieAnimation component
// For more info go to https://github.com/garbit/lottie-web-vue#readme
import { LottieAnimation } from 'lottie-web-vue'
import WatermelonJSON from 'assets/animation/watermelon.json'

const anim = ref(null)

</script>
<template>
  <div class="w-3/4 mx-auto">
    <LottieAnimation
      ref="anim"
      :animation-data="WatermelonJSON"
      :auto-play="true"
      :loop="true"
      :speed="1"
    />
  </div>
</template>
