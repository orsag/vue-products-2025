<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { InputText, Select, ToggleSwitch, Button } from 'primevue'
import type { AttributeDefinition } from '@/types'
type CustomType = 'text' | 'number' | 'select' | 'date' | 'boolean'
const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
const isOpened = ref(false)

const emit = defineEmits(['createdAttribute'])

const EMPTY = {
  key: '',
  label: '',
  type: 'text' as CustomType,
  required: false,
  options: [],
  defaultValue: '',
}

const newOption = ref('')
const options = ref([
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Select', value: 'select' },
  { label: 'Date', value: 'date' },
  { label: 'Boolean', value: 'boolean' },
])

const formData = ref<AttributeDefinition>({ ...EMPTY, options: [] })

const addedOption = () => {
  formData.value.options?.push(newOption.value)
  newOption.value = ''
}

const handleSubmit = () => {
  emit('createdAttribute', { ...formData.value })
  formData.value = { ...EMPTY, options: [] }
  isOpened.value = false
}
</script>

<template>
  <div class="addForm" :style="{ background: isDarkMode ? '#3d3d3d' : '#e8e8e8' }">
    <Button
      v-show="isOpened === false"
      severity="secondary"
      label="Add attribute"
      :onClick="() => (isOpened = !isOpened)"
    />
    <form @submit.prevent="handleSubmit" v-show="isOpened">
      <div class="field">
        <Select
          v-model="formData.type"
          name="label"
          :options="options"
          optionLabel="label"
          optionValue="value"
          required
          placeholder="Select type"
        />
      </div>

      <div class="field">
        <InputText name="key" type="text" placeholder="Key" v-model="formData.key" required fluid />
      </div>

      <div class="field">
        <InputText
          name="label"
          type="text"
          placeholder="Label"
          v-model="formData.label"
          required
          fluid
        />
      </div>

      <div class="field">
        <label>Required:</label>
        <ToggleSwitch name="required" label="Required" v-model="formData.required" fluid />
      </div>

      <div class="field">
        <InputText
          name="defaultValue"
          label="Default"
          placeholder="Default"
          v-model="formData.defaultValue"
          fluid
        />
      </div>

      <div v-if="formData.type === 'select'">
        <label>Options: {{ formData.options }}</label>
        <InputText name="key" type="text" placeholder="New Option" v-model="newOption" fluid />
        <Button severity="secondary" label="Add option" :onClick="() => addedOption()" />
      </div>
      <div>
        <Button type="submit" severity="secondary" label="Save new attribute" />
      </div>
    </form>
  </div>
</template>

<style lang="css" scoped>
.addForm {
  margin: 1em 0;
  padding: 10px;
  width: 100%;
}
.field {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.field label {
  margin-right: 1em;
}
</style>
