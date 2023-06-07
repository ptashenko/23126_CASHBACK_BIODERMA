<script lang="ts" setup>
import * as pdfJsLib from 'pdfjs-dist/legacy/build/pdf'
// import * as PdfJsWorker from 'pdfjs-dist/legacy/build/pdf.worker'
import { api as viewerApi } from 'v-viewer'
import type { IPlay } from '~/types/interfaces'
import { useUserProfile } from '~/store/user-profile'

interface Props {
  practiceCodePlay: IPlay['practice_code_play']
}

const props = defineProps<Props>()

const userProfile = useUserProfile()
const viewerOptions = Object.freeze({ fullscreen: true, inline: false })
const viewerImages = ref({ pdf: [], images: [] })

// The workerSrc property shall be specified.
pdfJsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/build/pdf.worker.js'
// FixMe: this is not working, for some reason it only works with the cdn version
// pdfJsLib.GlobalWorkerOptions.workerSrc = PdfJsWorker

const getPdfUrl = async (url: any): Promise<string> => {
  const canvas = document.createElement('canvas')
  const unavailableImage = 'https://via.placeholder.com/300.png?text=Imagine+non+disponibile'
  let resolvedUrl = ''
  // Asynchronous download of PDF
  const loadingTask = pdfJsLib.getDocument(url)

  resolvedUrl = await loadingTask.promise
    .then(
      async function (pdf: { getPage: (arg0: number)=> Promise<any>; }) {
        // Fetch the first page
        const pageNumber = 1
        await pdf.getPage(pageNumber).then(async function (page) {
          const scale = 1.5
          const viewport = page.getViewport({ scale })

          // Prepare canvas using PDF page dimensions
          const context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width

          // Render PDF page into canvas context
          const renderContext = {
            canvasContext: context,
            viewport,
          }
          const renderTask = page.render(renderContext)
          // Return the url if everything goes well
          resolvedUrl = await renderTask.promise.then(() => canvas.toDataURL('image/jpeg', 1.0)) || unavailableImage
        })

        return resolvedUrl
      },
      function (reason: any) {
        // PDF loading error
        callLog({ str: 'Error PDF reason: ', data: reason, isCall: 'resp' })
        resolvedUrl = unavailableImage
        return resolvedUrl
      })

  return resolvedUrl
}

const previewImages = async () => {
  // Since the images expire we need to refresh the data by calling the API
  const { valid, data } = await useFetchCall(
    'myAttempt',
    {
      body: { player_token_player: userProfile.userData.player_token_player },
    })

  if (valid) {
    // get the proper images from selected play
    const selectedPlay = data.message.find(el => el.practice_code_play === props.practiceCodePlay)

    // set all the possible images into an array and remove the falsy ones
    const imagesUrls = [
      selectedPlay.front_identity_doc_url_player_jwt,
      selectedPlay.rear_identity_doc_url_player_jwt,
      selectedPlay.url1_manage_play_jwt,
      selectedPlay.url1_play_jwt,
      selectedPlay.url2_manage_play_jwt,
      selectedPlay.url2_play_jwt,
      selectedPlay.url3_manage_play_jwt,
      selectedPlay.url3_play_jwt,
      selectedPlay.url4_manage_play_jwt,
      selectedPlay.url4_play_jwt,
      selectedPlay.url5_manage_play_jwt,
      selectedPlay.url5_play_jwt,
      selectedPlay.url6_manage_play_jwt,
      selectedPlay.url6_play_jwt,
    ].filter(Boolean)

    // Reset viewer images
    viewerImages.value = { images: [], pdf: [] }
    // Check for PDF's images
    for (const el of imagesUrls) {
      if (el.includes('.pdf')) {
        // Note: this is for testing that it works, we have an issue with CORS from google storage
        // const pdfUrl = await getPdfUrl('https://storage.googleapis.com/all-project-public-images/22164/REG%20CONC%20VIVI%20OGNI%20MOMENTO%20-%20x%20sito.pdf')
        // const pdfUrl = await getPdfUrl('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf')
        const pdfUrl = await getPdfUrl(el)
        callLog({ str: 'Returned String ', data: pdfUrl })
        viewerImages.value.pdf = [...viewerImages.value.pdf, pdfUrl]
      } else {
        viewerImages.value.images = [...viewerImages.value.images, el]
      }
    }

    // Launch the viewer with the processed images urls
    viewerApi({
      images: [...viewerImages.value.images, ...viewerImages.value.pdf],
      options: viewerOptions,
    })
  }
}

</script>

<template>
  <div>
    <BaseButton label="visualizza scontrino" shape="rounded" size="sm" @click="previewImages" />
  </div>
</template>
