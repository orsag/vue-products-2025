<script setup lang="ts">
import { useHomeView } from '@/composables/useHomeView'
import Select from 'primevue/select'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref, watch } from 'vue'

const selectedOption = ref<string | null>(null)

const {
  categories,
  products,
  selectedCategory,
  getCategories,
  getProductsByCategory,
  deleteCategory,
  handleEditCategory,
  handleCreateCategory,
} = useHomeView()

onMounted(() => {
  getCategories()
})

watch(selectedOption, () => {
  if (selectedOption.value) {
    getProductsByCategory(selectedOption.value)
  }
})
</script>

<template>
  <main>
    <div class="menu">
      Category:
      <Select
        v-model="selectedOption"
        :options="categories"
        optionLabel="name"
        optionValue="id"
        placeholder="Category"
        checkmark
        :highlightOnSelect="false"
        class="w-full md:w-56"
      />
      <template v-if="selectedOption">
        <Button
          icon="pi pi-pencil"
          label="Edit"
          aria-label="Edit"
          size="large"
          :onClick="handleEditCategory"
        />
        <Button
          icon="pi pi-plus"
          label="Create"
          aria-label="Create"
          size="large"
          :onClick="handleCreateCategory"
        />
        <Button
          icon="pi pi-times"
          label="Delete"
          aria-label="Delete"
          size="large"
          :onClick="() => deleteCategory(selectedOption ?? '')"
        />
      </template>
    </div>
    <div v-if="products.length > 0">
      <DataTable :value="products" showGridlines tableStyle="min-width: 60rem">
        <Column field="name" header="Name"></Column>
        <Column field="price" header="Price"></Column>
        <Column field="stock" header="Stock"></Column>
        <template v-if="selectedCategory && selectedCategory.schema.length > 0">
          <Column
            v-for="attrib in selectedCategory.schema"
            :field="`attributes.${attrib.key}`"
            :header="attrib.label"
            :key="attrib.key"
          ></Column>
        </template>
      </DataTable>
    </div>
  </main>
</template>

<style lang="css" scoped>
.menu {
  display: flex;
  align-items: center;
  gap: 2em;
  margin-bottom: 1em;
}
</style>
