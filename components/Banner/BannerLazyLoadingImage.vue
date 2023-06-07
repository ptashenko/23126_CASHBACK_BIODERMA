<script lang="ts" setup>
import imageSm from '~/assets/img/lazy/gwen-weustink-I3C1sSXj1i8-unsplash@sm.jpg'
import imageLg from '~/assets/img/lazy/gwen-weustink-I3C1sSXj1i8-unsplash@lg.jpg'
import imageWebpSm from '~/assets/img/lazy/gwen-weustink-I3C1sSXj1i8-unsplash@sm.webp'
import imageWebpLg from '~/assets/img/lazy/gwen-weustink-I3C1sSXj1i8-unsplash@lg.webp'

</script>
<template>
  <div
    id="banner-lazy-image"
    class="flex gap-8"
  >
    <div>
      <h2 class="p-4" v-text="'This is an example of how to use the BaseLazyLoadingImage'" />
      <p>Pass an small image an a large image, .webp are prefer type of files for performance.</p>
    </div>
    <BaseLazyLoadingImage
      :source="imageLg"
      :srcset="imageLg"
      :thumbnail="imageSm"
    />
    <BaseLazyLoadingImage
      :source="imageWebpLg"
      :srcset="imageWebpLg"
      :thumbnail="imageWebpSm"
    />
  </div>
</template>
