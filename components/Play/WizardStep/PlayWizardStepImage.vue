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
  <div class="md:grid md:grid-cols-2 justify-center md:w-[80%] mx-auto">
    <BaseInputFile
      id="front"
      rules="required|size:10240|ext:jpeg,jpg,png,pdf|mimes:image/jpeg,image/jpg,image/png,application/pdf"
      label="Carica il FRONTE dell’immagine"
      icon="description"
      extra-content="Obbligatorio: <br />rendere visibile nella foto l’intero scontrino"
      @update-data="updateOcrData"
    />
    <BaseInputFile
      id="rear"
      rules="size:10240|ext:jpeg,jpg,png,pdf|mimes:image/jpeg,image/jpg,image/png,application/pdf"
      label="Carica il RETRO dell’immagine"
      icon="draft"
      extra-content="Facoltativo: <br />caricare il retro solo nel caso siano riportati dati aggiuntivi"
      @update-data="updateOcrData"
    />
  </div>
</template>
