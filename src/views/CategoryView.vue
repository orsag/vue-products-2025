<script setup lang="ts">
import AddAttributeForm from '@/components/AddAttributeForm.vue'
import { useCategoryView } from '@/composables/useCategoryView'
import type { FormData } from '@/composables/useCategoryView'
import { InputText, Button } from 'primevue'
import { computed, ref } from 'vue'
const EMPTY = ''

const {
  selectedCategory,
  operation,
  updateCategory,
  createCategory,
  handleDeleteAttribute,
  createdAttribute,
  cancelEditing,
} = useCategoryView()

const header = computed(() => (operation.value === 'update' ? 'Update Category' : 'New Category'))
const UPDATE = computed(() => operation.value === 'update')
const CREATE = computed(() => operation.value === 'create')

const formData = ref<FormData>({
  id: UPDATE.value ? (selectedCategory.value?.id ?? EMPTY) : EMPTY,
  name: UPDATE.value ? (selectedCategory.value?.name ?? EMPTY) : EMPTY,
  icon: UPDATE.value ? (selectedCategory.value?.icon ?? EMPTY) : EMPTY,
  color: UPDATE.value ? (selectedCategory.value?.color ?? EMPTY) : EMPTY,
})

const onFormSubmit = () => {
  if (UPDATE.value) {
    updateCategory(formData.value)
  } else {
    createCategory(formData.value)
  }
}
</script>

<template>
  <div class="centering">
    <h2>{{ header }}</h2>
    <form @submit.prevent="onFormSubmit" class="form-container">
      <div v-if="CREATE" class="field">
        <label for="id">Id:</label>
        <InputText id="id" v-model="formData.id" required class="w-full" />
      </div>

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
      <template v-if="selectedCategory && selectedCategory.schema.length > 0 && UPDATE">
        <div v-for="attrib in selectedCategory.schema" :key="attrib.key" class="field attribute">
          <label>{{ attrib.label }}</label>
          <Button
            severity="secondary"
            label="Delete"
            @click="() => handleDeleteAttribute(attrib.key)"
          ></Button>
        </div>
      </template>

      <AddAttributeForm @createdAttribute="createdAttribute" />

      <div class="buttons">
        <Button type="submit" severity="secondary" label="Submit category"></Button>
        <Button severity="warn" label="Cancel" @click="cancelEditing"></Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.w-full {
  width: 100%;
}
.centering {
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

.field {
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  width: 100%;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
}
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
