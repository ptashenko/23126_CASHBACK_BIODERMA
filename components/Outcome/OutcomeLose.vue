<template>
  <div class="md:py-20 pb-10">
    <h1 class="uppercase text-primary text-h3 md:text-h1" v-text="'QUESTA VOLTA NON HAI VINTO, PECCATO!'" />
    <div class="divider relative w-[80%] md:w-[20%] bg-primary h-2px my-5 mx-auto" />
    <p class="font-bold text-xl md:text-5xl uppercase">
      Continua ad Acquistare<br>per provare a vincere!
    </p>
    <div class="relative">
      <img src="~/assets/img/weekend.png" class="w-[70%] md:w-[20%] mx-auto mt-10">
      <img src="~/assets/img/line-right.png" class="absolute right-[-25vw] md:right-[-5vw] top-7vw md:top-0 w-[60%] -z-1">
    </div>
    <div class="border-2px border-primary rounded-1rem w-fit mx-auto p-5 pt-15 relative -z-1 top-[-50px]">
      <h3 class="font-bold text-2xl md:text-4xl m-0 leading-none">
        OGNI SETTIMANA
      </h3>
      <p class="text-2xl md:text-4xl m-0 leading-none">
        UN WEEKEND PER 2
      </p>
    </div>
    <h3 class="font-bold text-2xl md:text-4xl">
      OGNI GIORNO
    </h3>
    <p class="text-2xl md:text-4xl">
      <b>10 KIT -</b> TELO MARE E ZAINO
    </p>
    <div class="relative">
      <img src="~/assets/img/telo.png" class="mx-auto w-[70%] md:w-[20%]">
      <img src="~/assets/img/line-left.png" class="absolute w-[70%] md:w-[50%] top-0 md:top-[-12vw] left-[-15vw] md:left-[-5vw] -z-1">
    </div>
  </div>
</template>

<style scoped>
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 5px;
  width: 15%;
  background: #183d7f;
}

</style>
