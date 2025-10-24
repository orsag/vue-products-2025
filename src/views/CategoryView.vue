<script setup lang="ts">
import AddAttributeForm from '@/components/AddAttributeForm.vue'
import { useCategoryView } from '@/composables/useCategoryView'
import { InputText, Button } from 'primevue'
import { computed, ref } from 'vue'

export interface FormData {
  name: string
  icon: string
  color: string
}

const {
  selectedCategory,
  operation,
  updateCategory,
  createCategory,
  handleDeleteAttribute,
  createdAttribute,
} = useCategoryView()

const header = computed(() => (operation.value === 'update' ? 'Update Category' : 'New Category'))

const formData = ref<FormData>({
  name: selectedCategory.value?.name ?? '',
  icon: selectedCategory.value?.icon ?? '',
  color: selectedCategory.value?.color ?? '',
})

const onFormSubmit = (event: SubmitEvent) => {
  if (operation.value === 'update') {
    updateCategory(formData.value)
  } else {
    createCategory(formData.value)
  }
  // createdAt
}
</script>

<template>
  <div class="centering">
    <h2>{{ header }}</h2>
    <form @submit.prevent="onFormSubmit" class="p-fluid form-container">
      <!-- rendering required -->
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model="formData.name" required class="w-full" />
      </div>
      <div class="field">
        <label for="icon">Icon</label>
        <InputText id="icon" v-model="formData.icon" required class="w-full" />
      </div>
      <div class="field">
        <label for="color">Color</label>
        <InputText id="color" v-model="formData.color" required class="w-full" />
      </div>

      <!-- rendering attributes -->
      <template
        v-if="selectedCategory && selectedCategory.schema.length > 0 && operation === 'update'"
      >
        <div v-for="attrib in selectedCategory.schema" :key="attrib.key" class="field attribute">
          <label>{{ attrib.label }}</label>
          <Button
            severity="secondary"
            label="Delete"
            :onClick="() => handleDeleteAttribute(attrib.key)"
          />
        </div>
      </template>

      <!-- add new form -->
      <AddAttributeForm @createdAttribute="createdAttribute" />

      <Button type="submit" severity="secondary" label="Submit category" />
    </form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .w-full {
    width: 100%;
  }
  .centering {
    padding: 2em 0;
    min-width: 500px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .switch {
    position: relative;
    top: 8px;
    left: 12px;
    margin-right: 2em;
  }
  .attribute {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  .form-container {
    width: 100%;
    max-width: 400px;
    margin-top: 1.5rem;
  }

  .p-fluid .field {
    margin-bottom: 1.5rem;
  }

  .p-fluid .field label {
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-color);
  }
}
</style>
