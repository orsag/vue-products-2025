<script setup lang="ts">
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'

const isLoading = ref(false)
const contentToPrint = ref<HTMLElement | null>(null)
const title = ref('Sample-PDF')

// Function to preload images before generating the PDF
const preloadImages = (element: HTMLElement): Promise<void[]> => {
  const promises: Promise<void>[] = []
  element.querySelectorAll('img').forEach((img: HTMLImageElement) => {
    if (!img.complete || img.naturalWidth === 0) {
      promises.push(
        new Promise<void>((resolve) => {
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = `${img.src}?${new Date().getTime()}` // Force reload to avoid caching issues
        }),
      )
    }
  })
  return Promise.all(promises)
}

// The function that exports the content as a PDF
const downloadPdf = async () => {
  isLoading.value = true
  const element = contentToPrint.value

  const options = {
    filename: `${title.value}.pdf`,
    image: { type: 'jpeg', quality: 100 },
    html2canvas: {
      scale: 1.5,
      useCORS: true,
      logging: true,
      dpi: 192,
      allowTaint: true,
      letterRendering: true,
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
  }

  const elements = element?.querySelectorAll('.page')

  if (!elements || elements.length === 0) {
    isLoading.value = false
    return
  }

  await preloadImages(element!)

  let worker = html2pdf().set(options).from(elements[0])

  if (elements.length > 1) {
    debugger
    worker = worker.toPdf()

    for (let i = 1; i < elements.length; i++) {
      worker = worker
        .get('pdf')
        .then((pdf) => {
          pdf.addPage()
        })
        .from(elements[i])
        .toCanvas()
        .toPdf()
    }
  }

  worker.save().then(() => {
    isLoading.value = false
  })
}
</script>

<template>
  <div>
    <!-- Content to be exported to PDF -->
    <div ref="contentToPrint">
      <!-- Each page will be wrapped in a div with the class 'page' -->
      <div class="page" style="width: 210mm; height: 297mm">
        <!-- Your page content -->
        <h2 class="text-white">PDF Page 1</h2>
        <div class="section-area">
          <p>This is the first page of the PDF document.</p>
        </div>
      </div>
    </div>

    <!-- Button to download the PDF -->
    <button @click="downloadPdf">Download PDF</button>

    <!-- Loading indicator -->
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<style scoped>
.page {
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  color: black;
  border: 2em red solid;
}
/* .page-break {
  page-break-before: always;
} */

.section-area {
  margin-bottom: 20px;
}
</style>
