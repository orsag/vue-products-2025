<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import { InputText, Select, ToggleSwitch, Button } from 'primevue'
import Inplace from 'primevue/inplace'
import type { AttributeDefinition } from '@/types'
import { useDarkMode } from '@/composables/useDarkMode'

type CustomType = 'text' | 'number' | 'select' | 'date' | 'boolean'
const emit = defineEmits(['createdAttribute'])
const { isDarkMode } = useDarkMode()
const backgroundColor = computed(() => (isDarkMode.value ? '#3d3d3d' : '#e8e8e8'))

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

const handleSubmit = (event: SubmitEvent, closeCallback: () => void) => {
  emit('createdAttribute', { ...formData.value })
  formData.value = { ...EMPTY, options: [] }
  closeCallback()
}
</script>

<template>
  <Inplace class="addForm" :style="{ background: backgroundColor }">
    <template #display> Click to create attribute </template>

    <template #content="{ closeCallback }">
      <form @submit.prevent="handleSubmit($event, closeCallback)">
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
          <InputText
            name="key"
            type="text"
            placeholder="Key"
            v-model="formData.key"
            required
            fluid
          />
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
          <div class="field">
            <InputText name="key" type="text" placeholder="New Option" v-model="newOption" fluid />
          </div>
          <Button
            severity="secondary"
            label="Add option"
            :onClick="() => addedOption()"
            :style="{ marginBottom: '1em' }"
          ></Button>
        </div>
        <div>
          <Button type="submit" severity="secondary" label="Save new attribute" />
        </div>
      </form>
    </template>
  </Inplace>
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
