<script setup lang="ts">
import { BASIC } from '@/router/routes'
import type { BasicForm } from '@/types'
import { Button, Card, InputText, DatePicker } from 'primevue'
import { ref } from 'vue'

const isExpanded = ref(true)
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
const formData = defineModel<BasicForm>('formData', { default: { ...BASIC } })
</script>

<template>
  <Card :class="$style.customCard">
    <template #title>
      <div class="card-title">
        <span>Basics</span>
        <Button
          size="small"
          icon="pi pi-arrow-up"
          :class="{ 'rotate-icon': !isExpanded }"
          @click="toggleExpand"
        />
      </div>
    </template>
    <template #content>
      <div :class="['content-wrapper', { expanded: isExpanded }]">
        <div class="verticalForm">
          <div class="field">
            <label for="invoiceNumber">Invoice number</label>
            <InputText size="small" id="company" v-model="formData.invoiceNumber" />
          </div>
          <div class="field">
            <label for="invoiceType">Invoice Type</label>
            <InputText
              size="small"
              id="invoiceType"
              v-model="formData.invoiceType"
              :disabled="true"
            />
          </div>
          <div class="field">
            <label for="reference">Reference <small>(variable symbol)</small></label>
            <InputText size="small" id="reference" v-model="formData.reference" />
          </div>
          <div class="field">
            <label for="service">Service <small>(constant symbol)</small></label>
            <InputText size="small" id="service" v-model="formData.service" />
          </div>
        </div>
        <div class="verticalForm">
          <div class="field">
            <label for="dateOfIssue">Date of issue</label>
            <InputText size="small" id="dateOfIssue" v-model="formData.dateOfIssue" />
          </div>
          <div class="field">
            <label for="dateOfDelivery">Date of delivery</label>
            <InputText size="small" id="dateOfDelivery" v-model="formData.dateOfDelivery" />
          </div>
          <div class="field">
            <label for="dueDate">Due date</label>
            <InputText size="small" id="company" v-model="formData.dueDate" />
          </div>
          <div class="field">
            <label for="orderNumber">Order number</label>
            <InputText size="small" id="orderNumber" v-model="formData.orderNumber" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="css" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
}
.verticalForm {
  width: 440px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.content-wrapper {
  display: flex;
  justify-content: space-between;
}

.h3 {
  align-self: center;
  margin: 0 auto;
}

.field > input {
  width: 250px;
}

.field label {
  margin-right: 1rem;
  font-weight: 600;
}
:deep(.p-button.rotate-icon .p-button-icon.pi) {
  transform: rotate(180deg);
}
:deep(.p-button .p-button-icon.pi) {
  transition: transform 0.3s ease;
}
</style>

<style module>
.customCard {
  border: 1px solid #ddd;
  box-shadow: 0 0 7px -1px #d6d6d6;
  top: -20px;
  border-radius: 5px 5px 5px 5px;
  margin-bottom: 2em;
  font-style: normal;
}
</style>
