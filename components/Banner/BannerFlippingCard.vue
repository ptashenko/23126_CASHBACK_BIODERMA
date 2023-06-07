<template>
  <div
    id="banner-flipping-card"
    class="relative overflow-hidden min-h-[65vh]"
  >
    <h2 class="text-hero" v-text="'Lorem ipsum dolor sit amet'" />
    <div class="grid grid-cols-2 gap-4 w-3/4 mx-auto">
      <CardFlipping>
        <template #card-front>
          <div class="center-the-unknown">
            this is a card front content
          </div>
        </template>
        <template #card-back>
          <div class="center-the-unknown text-white">
            this is a card back content, it accept any html
          </div>
        </template>
      </CardFlipping>
      <CardFlipping />
    </div>
  </div>
</template>
