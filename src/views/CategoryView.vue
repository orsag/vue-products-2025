<script setup lang="ts">
import AddAttributeForm from '@/components/AddAttributeForm.vue'
import { useCategoryView } from '@/composables/useCategoryView'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { InputText, InputNumber, DatePicker, Select, ToggleSwitch, Message, Button } from 'primevue'

const {
  operation,
  localCategory,
  selectedCategory,
  updateCategory,
  createCategory,
  handleDeleteAttribute,
} = useCategoryView()

const handleOpertion = operation.value === 'edit' ? updateCategory : createCategory

const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
  // const newCategory: Category = {}
  console.log(event)
  // createdAt
  // handleOpertion(newCategory)
}
</script>

<template>
  <div class="centering">
    <Form
      v-if="localCategory"
      v-slot="$form"
      :initialValues="localCategory"
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      @submit="onFormSubmit"
      class="form w-full sm:w-56"
    >
      <div class="flex flex-col gap-1">
        <label>Name:</label>
        <InputText name="name" type="text" placeholder="Name" required fluid />
        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{
          $form.name.error.message
        }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <label>Icon:</label>
        <InputText name="icon" type="text" placeholder="Icon" required fluid />
        <Message v-if="$form.icon?.invalid" severity="error" size="small" variant="simple">{{
          $form.icon.error.message
        }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <label>Color:</label>
        <InputText name="color" type="text" placeholder="Color" required fluid />
        <Message v-if="$form.color?.invalid" severity="error" size="small" variant="simple">{{
          $form.color.error.message
        }}</Message>
      </div>
      <template v-if="localCategory.schema.length > 0 && operation === 'edit'">
        <div v-for="attrib in localCategory.schema" :key="attrib.key" class="editAttrib">
          <label>{{ attrib.label }}</label>
          <Button
            severity="secondary"
            label="Delete"
            :onClick="() => handleDeleteAttribute(attrib.key)"
          />
        </div>
      </template>
      <template v-if="operation === 'create'">
        <AddAttributeForm />
        <!-- <div :key="attrib.key" class="flex flex-col gap-1">
          <label>{{ attrib.label }}:</label>
          <InputNumber v-if="attrib.type === 'number'" :required="attrib.required" fluid />
          <InputText
            v-if="attrib.type === 'text'"
            :name="`schema.${attrib.key}`"
            type="text"
            :placeholder="attrib.label"
            :required="attrib.required"
            fluid
          />
          <DatePicker v-if="attrib.type === 'date'" :name="`schema.${attrib.key}`" fluid />
          <Select
            v-if="attrib.type === 'select'"
            :name="`schema.${attrib.key}`"
            :options="attrib.options"
            :required="attrib.required"
            placeholder="Select"
            fluid
          />
          <ToggleSwitch
            v-if="attrib.type === 'boolean'"
            :name="`schema.${attrib.key}`"
            :required="attrib.required"
            class="switch"
          />
        </div> -->
      </template>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .w-full {
    width: 100%;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
  .centering {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .switch {
    position: relative;
    top: 8px;
    left: 12px;
    margin-right: 2em;
  }
  .editAttrib {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
}
</style>
