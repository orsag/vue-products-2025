<script setup lang="ts">
import { BASIC } from '@/router/routes'
import type { BasicForm } from '@/types'
import { Card, InputText, DatePicker } from 'primevue'
import { watch } from 'vue'

const formData = defineModel<BasicForm>('formData', { default: { ...BASIC } })
</script>

<template>
  <Card>
    <template #title>Payment of this invoice</template>
    <template #content>
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
          <label for="reference">Reference (variable symbol)</label>
          <InputText size="small" id="reference" v-model="formData.reference" />
        </div>
        <div class="field">
          <label for="service">Service (constant symbol)</label>
          <InputText size="small" id="service" v-model="formData.service" />
        </div>
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
    </template>
  </Card>
</template>

<style lang="css" scoped>
.verticalForm {
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-right: 2em;
}
.field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5em;
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
</style>
