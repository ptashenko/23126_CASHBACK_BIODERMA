<script lang="ts" setup>
const ocrDataEncrypted = useOcrDataEncrypted()
const ocrDataNonEncrypted = useOcrDataNonEncrypted()

const updateOcrData = ({ id = '', url1 = '', url1_jwt = '' }) => {
  ocrDataEncrypted.value = {
    ...ocrDataEncrypted.value,
    [id]: url1_jwt,
  }

  ocrDataNonEncrypted.value = {
    ...ocrDataNonEncrypted.value,
    [id]: url1,
  }
}

</script>

<template>
  <div class="md:grid md:grid-cols-2 justify-center md:w-[100%] mx-auto">
    <h2
      class="mt-4 font-bold uppercase col-span-2 pb-5vh"
      v-text="'Carica foto documento  d’identità'"
    />
    <BaseInputFile
      id="front"
      rules="required|size:10240|ext:jpeg,jpg,png,pdf|mimes:image/jpeg,image/jpg,image/png,application/pdf"
      label="Carica il FRONTE dell’immagine"
      icon="description"
      @update-data="updateOcrData"
    />
    <BaseInputFile
      id="rear"
      rules="size:10240|ext:jpeg,jpg,png,pdf|mimes:image/jpeg,image/jpg,image/png,application/pdf"
      label="Carica il RETRO dell’immagine"
      icon="draft"
      @update-data="updateOcrData"
    />
  </div>
</template>
