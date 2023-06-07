<script lang="ts" setup>
import { useField } from 'vee-validate'
import type { IDragonConfig } from '~/types/types'

const { CONF_KEY, PROJECT_KEY }: IDragonConfig = decrypt(dragonConfig)
const loading = useLoading()

interface Props {
  id: string
  label: string
  icon: string
  rules: string
  extraContent?: InnerHTML
}

const props = defineProps<Props>()
const emit = defineEmits<{(e: 'updateData', data: any): void }>()

const {
  errorMessage,
  handleChange,
  validate,
  // setValue,
} = useField(props.id, props.rules, {
  type: 'file',
})

// const provider = ref(null)
const config = useRuntimeConfig()
const inputFile = ref<HTMLInputElement | null>(null)
const isPdf = ref(false)
const filePreview = ref({
  blob: '',
  thumb: '',
  alt: '',
})
const resetThumb = () => {
  filePreview.value = {
    blob: '',
    thumb: '',
    alt: '',
  }
}

const handleFileChange = async ($event: Event) => {
  handleChange($event)
  const { valid } = await validate()
  const target = $event.target as HTMLInputElement

  if (valid) {
    await uploadFile($event)
  } else {
    resetThumb()
    emit('updateData', { id: target.id })
  }

  // TODO: handle error somehow
}

const createThumb = (file: File) => {
  // Creates a blob field
  // 创建 blob 字段
  const URL = (window.URL || window.webkitURL)
  // Destructure the data we need
  const { type, name } = file

  if (type === 'application/pdf') {
    filePreview.value.alt = name
    isPdf.value = true
    return
  }

  if (URL) {
    filePreview.value.blob = URL.createObjectURL(file)
  }
  // Thumbnails
  // 缩略图
  if (filePreview.value.blob && file.type.substr(0, 6) === 'image/') {
    filePreview.value.thumb = filePreview.value.blob
    filePreview.value.alt = name
  }
}

const uploadFile = async ($event: Event) => {
  loading.value = true
  // Reset the thumb if exists
  resetThumb()

  // add loader here?
  // inputFile is the ref holding the input file element
  if (!inputFile.value?.files?.length) {
    return
  }

  // Create the thumbs if the browser support it
  if (window.URL || window.webkitURL) {
    await createThumb(inputFile.value.files[0])
  }

  // Prepare the data to send
  const data = new FormData()

  data.append('file', inputFile.value.files[0])
  data.append('key', encrypt(JSON.stringify({
    p: 'a',
    HBGRF: CONF_KEY,
    vector_HBGRF: PROJECT_KEY,
  })))

  // Display the values
  // Call the uploadImage service
  // const response = await service.uploadImage(data)
  await $fetch('uploadImage', {
    baseURL: config.public.apiBase,
    headers: {
      Authorization: `Bearer ${Authorization}`,
    },
    method: 'POST',
    body: data,
    // options.body = JSON.stringify({ data: options.body && encrypt(JSON.stringify(options.body)) })
  }).then((response) => {
    // Decrypt the received data and destructure the data we need
    const target = $event.target as HTMLInputElement
    const {
      message: {
        url1,
        url1_jwt,
      },
    } = decrypt(response as string)
    // Emit the changes to the parent component
    emit('updateData', { id: target.id, url1, url1_jwt })
  })
    .catch(() => {
      SweetAlertFeedback.fire({
        text: 'Errore caricamento',
        icon: 'error',
      })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div>
    <div
      class="relative w-full w-[80%] h-[220px] mx-auto border-primary border-dashed border-4 rounded-lg"
    >
      <div class="center-the-unknown">
        <img
          v-if="filePreview.thumb"
          :alt="filePreview.alt || 'anteprima dell\'immagine'"
          :src="filePreview.thumb"
          class="w-[200px] h-[180px] object-contain"
        >
        <BaseMsIcon v-else :icon="isPdf ? 'picture_as_pdf' : icon" class="!text-[7em]" />
      </div>
      <input
        :id="id"
        ref="inputFile"
        :name="id"
        class="opacity-0 w-full w-full h-full rounded-[1.5em] cursor-pointer"
        type="file"
        v-bind="$attrs"
        @change="handleFileChange"
      >
      <label
        :for="id"
        class="
        transform absolute bottom-0 left-[50%] translate-y-1/2 -translate-x-1/2 truncate
         bg-primary text-white py-1 px-5 rounded-0.5rem text-lg
        "
      >{{ label }}</label>
    </div>
    <span v-if="errorMessage" class="block text-sm text-error mt-6" v-text="errorMessage" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="text-primary font-bold mt-6 md:px-25" v-html="extraContent" />
  </div>
</template>
