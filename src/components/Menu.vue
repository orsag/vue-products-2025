<script setup lang="ts">
import Select from 'primevue/select'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import type { Category } from '@/types'
import { ref } from 'vue'
import { ROUTENAMES } from '@/router/routes'
import { useRouter } from 'vue-router'

const model = defineModel<string>({ default: null })
const visible = ref(false)
const router = useRouter()

const props = defineProps<{
  categories: Category[]
  handleCreateCategory: (payload: PointerEvent) => void
  handleEditCategory: (payload: PointerEvent) => void
  deleteCategory: (option: string) => void
  handleAddProduct: (payload: PointerEvent) => void
}>()

const openDialog = () => {
  visible.value = true
}

const _deleteCategory = () => {
  props.deleteCategory(model.value ?? '')
  visible.value = false
}

const goFaktura = () => {
  router.push({ name: ROUTENAMES.FAKTURA })
}
</script>

<template>
  <div class="menu">
    Category:
    <Select
      v-model="model"
      :options="categories"
      optionLabel="name"
      optionValue="id"
      placeholder="Category"
      checkmark
      :highlightOnSelect="false"
      class="select"
    ></Select>
    <Button
      icon="pi pi-plus"
      label="Create"
      aria-label="Create"
      size="large"
      @click="handleCreateCategory"
    ></Button>
    <Button
      icon="pi pi-plus"
      label="Faktura"
      aria-label="Faktura"
      size="large"
      @click="goFaktura"
    ></Button>
    <template v-if="model">
      <Button
        icon="pi pi-pencil"
        label="Edit"
        aria-label="Edit"
        size="large"
        @click="handleEditCategory"
      ></Button>
      <Button
        icon="pi pi-times"
        label="Delete"
        aria-label="Delete"
        size="large"
        @click="openDialog"
      ></Button>
      <Button
        icon="pi pi-star"
        label="Add Product"
        aria-label="Add Product"
        size="large"
        severity="info"
        @click="handleAddProduct"
      ></Button>
    </template>
    <Dialog v-model:visible="visible" modal header="Delete" :style="{ width: '25rem' }">
      <span class="mb-8">Are you sure you want to delete this category? </span>
      <div class="gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="_deleteCategory"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style lang="css">
.menu {
  display: flex;
  align-items: center;
  gap: 2em;
  margin-bottom: 1em;
  width: 100%;
  min-width: 500px;
}
.select {
  width: 200px;
}
.mb-8 {
  display: block;
  margin-bottom: 2em;
}
.gap-2 {
  display: flex;
  justify-content: flex-end;
  gap: 2em;
}
</style>
