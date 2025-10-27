<script setup lang="ts">
import Select from 'primevue/select'
import Button from 'primevue/button'
import type { Category } from '@/types'

const model = defineModel<string>({ default: null })

const props = defineProps<{
  categories: Category[]
  handleCreateCategory: (payload: PointerEvent) => void
  handleEditCategory: (payload: PointerEvent) => void
  deleteCategory: (option: string) => void
  handleAddProduct: (payload: PointerEvent) => void
}>()

const _deleteCategory = () => {
  props.deleteCategory(model.value ?? '')
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
    />
    <Button
      icon="pi pi-plus"
      label="Create"
      aria-label="Create"
      size="large"
      :onClick="handleCreateCategory"
    />
    <template v-if="model">
      <Button
        icon="pi pi-pencil"
        label="Edit"
        aria-label="Edit"
        size="large"
        :onClick="handleEditCategory"
      />
      <Button
        icon="pi pi-times"
        label="Delete"
        aria-label="Delete"
        size="large"
        :onClick="_deleteCategory"
      />
      <Button
        icon="pi pi-star"
        label="Add Product"
        aria-label="Add Product"
        size="large"
        severity="info"
        :onClick="handleAddProduct"
      />
    </template>
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
</style>
