<script setup lang="ts">
import { ref } from 'vue'
import { InputText, Select, ToggleSwitch, Button } from 'primevue'

const selected = ref<'text' | 'number' | 'select' | 'date' | 'boolean' | null>(null)
const newOption = ref('')
const options = ref([
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Select', value: 'select' },
  { label: 'Date', value: 'date' },
  { label: 'Boolean', value: 'boolean' },
])
const addedOptions = ref<string[]>([])
const addedOption = () => {
  addedOptions.value.push(newOption.value)
  newOption.value = ''
}
const handleSubmit = (event) => {}
</script>

<template>
  <Form @submit="handleSubmit">
    <Select v-model="selected" name="label" :options="options" required placeholder="Select type" />
    <div v-if="selected">
      <InputText name="key" type="text" placeholder="Key" required fluid />
      <InputText name="label" type="text" placeholder="Label" required fluid />
      <ToggleSwitch name="required" label="Required" fluid />
      <InputText name="defaultValue" label="Default" fluid />
      <template v-if="selected === 'select'">
        <label>{{ addedOptions }}</label>
        <InputText name="key" type="text" placeholder="Option" v-model="newOption" fluid />
        <Button severity="secondary" label="Add option" :onClick="() => addedOption()" />
      </template>
    </div>
  </Form>
</template>
