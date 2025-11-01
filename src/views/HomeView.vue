<script setup lang="ts">
import Menu from '../components/Menu.vue'
import { useHomeView } from '@/composables/useHomeView'
import { onMounted, ref } from 'vue'
import MyDataTable from '@/components/MyDataTable.vue'

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
  deleteProduct,
  editProduct,
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
      <MyDataTable :deleteProduct="deleteProduct" :editProduct="editProduct" />
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
