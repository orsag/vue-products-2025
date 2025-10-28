<script setup lang="ts">
import { useProductView } from '@/composables/useProductView'
import type { FormData } from '@/composables/useProductView'
import type { AttributeDefinition } from '@/types'
import { InputText, Button, InputNumber, Select, ToggleSwitch, DatePicker } from 'primevue'
import { ref } from 'vue'

const { selectedCategory, createProduct, cancelCreation, TypeMap } = useProductView()

const attributes = selectedCategory.value?.schema.reduce(
  (accumulator: Record<string, any>, currentItem: AttributeDefinition) => {
    const key = currentItem.key
    const type = currentItem.type
    accumulator[key] = TypeMap.get(type) ?? ''
    return accumulator
  },
  {},
)

const formData = ref<FormData>({
  name: '',
  price: 0,
  stock: 0,
  attributes: attributes ?? {},
})

const onFormSubmit = () => {
  createProduct(formData.value)
}
</script>

<template>
  <div class="centering">
    <h2>Create Product</h2>
    <form @submit.prevent="onFormSubmit" class="form-container">
      <!-- rendering required -->
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model="formData.name" required class="w-full" />
      </div>
      <div class="field">
        <label for="icon">Price</label>
        <InputNumber id="icon" v-model="formData.price" required class="w-full" />
      </div>
      <div class="field">
        <label for="color">Stock</label>
        <InputNumber id="color" v-model="formData.stock" required class="w-full" />
      </div>

      <!-- rendering attributes -->
      <template v-if="selectedCategory && selectedCategory.schema.length > 0">
        <div v-for="attrib in selectedCategory.schema" :key="attrib.key" class="field attribute">
          <label :for="attrib.key">{{ attrib.label }}</label>
          <InputText
            v-if="attrib.type === 'text'"
            :id="attrib.key"
            v-model="formData.attributes[attrib.key]"
            :required="attrib.required"
            class="w-full"
          />
          <InputNumber
            v-if="attrib.type === 'number'"
            :id="attrib.key"
            v-model="formData.attributes[attrib.key]"
            :required="attrib.required"
            class="w-full"
          />
          <ToggleSwitch
            v-if="attrib.type === 'boolean'"
            :name="attrib.key"
            v-model="formData.attributes[attrib.key]"
            :required="attrib.required"
          />
          <Select
            v-if="attrib.type === 'select'"
            v-model="formData.attributes[attrib.key]"
            :required="attrib.required"
            :name="attrib.key"
            :options="attrib.options"
            placeholder="Options"
          ></Select>
          <DatePicker
            v-if="attrib.type === 'date'"
            v-model="formData.attributes[attrib.key]"
            :required="attrib.required"
            :name="attrib.key"
          />
        </div>
      </template>

      <div class="buttons">
        <Button type="submit" severity="secondary" label="Submit product"></Button>
        <Button severity="warn" label="Cancel" :onClick="cancelCreation"></Button>
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
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>
