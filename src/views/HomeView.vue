<script setup lang="ts">
import Menu from '../components/Menu.vue'
import { useHomeView } from '@/composables/useHomeView'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref } from 'vue'

const {
  categories,
  products,
  selectedCategory,
  getCategories,
  getProductsByCategory,
  deleteCategory,
  handleEditCategory,
  handleCreateCategory,
  handleAddProduct,
} = useHomeView()

const selectedOption = ref<string | undefined>()

onMounted(() => {
  getCategories()
  if (selectedCategory?.value?.id) {
    selectedOption.value = selectedCategory.value?.id
    getProductsByCategory(selectedCategory.value?.id)
  }
})

const updateSelectedOption = (model: string) => {
  if (model) {
    getProductsByCategory(model)
  }
}
</script>

<template>
  <main>
    <Menu
      v-model="selectedOption"
      :categories="categories"
      :deleteCategory="deleteCategory"
      :handleEditCategory="handleEditCategory"
      :handleCreateCategory="handleCreateCategory"
      :handleAddProduct="handleAddProduct"
      @update:modelValue="($event) => updateSelectedOption($event)"
    />
    <div v-if="products.length > 0">
      <DataTable
        :value="products"
        showGridlines
        sortMode="multiple"
        removableSort
        tableStyle="min-width: 60rem"
      >
        <Column field="name" header="Name" sortable></Column>
        <Column field="price" header="Price" sortable></Column>
        <Column field="stock" header="Stock" sortable></Column>
        <template v-if="selectedCategory && selectedCategory.schema.length > 0">
          <Column
            v-for="attrib in selectedCategory.schema"
            :field="`attributes.${attrib.key}`"
            :header="attrib.label"
            :key="attrib.key"
            sortable
          ></Column>
        </template>
      </DataTable>
    </div>
    <div v-else-if="selectedOption === null">
      <h3>No category selected</h3>
    </div>
    <div v-else>
      <h3>No products in this category</h3>
    </div>
  </main>
</template>

<style lang="css" scoped>
main {
  display: flex;
  flex-direction: column;
}
</style>
