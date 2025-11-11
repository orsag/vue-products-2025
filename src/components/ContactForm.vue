<script setup lang="ts">
import { EMPTY } from '@/router/routes'
import type { ContactForm } from '@/types'
import { Card, InputText, ToggleSwitch } from 'primevue'

defineProps<{
  label: string
}>()

const formData = defineModel<ContactForm>('formData', { default: () => ({ ...EMPTY }) })
</script>

<template>
  <Card>
    <template #title>Payment of this invoice</template>
    <template #content>
      <div class="verticalForm">
        <h2>{{ label }}</h2>
        <div class="field">
          <label for="name">Company</label>
          <InputText size="small" id="company" v-model="formData.company" />
        </div>
        <div class="field">
          <label InputText="icon">Person</label>
          <InputText size="small" id="person" v-model="formData.person" />
        </div>
        <div class="field">
          <label for="street">Street</label>
          <InputText size="small" id="street" v-model="formData.street" />
        </div>
        <div class="field">
          <label for="city">City</label>
          <InputText size="small" id="city" v-model="formData.city" />
        </div>
        <div class="field">
          <label for="ZIP">ZIP</label>
          <InputText size="small" id="ZIP" v-model="formData.ZIP" />
        </div>
        <div class="field">
          <label for="country">Country</label>
          <InputText size="small" id="country" v-model="formData.country" />
        </div>
        <div class="field">
          <label for="companyID">Company ID</label>
          <InputText size="small" id="companyID" v-model="formData.companyID" placeholder="ICO" />
        </div>
        <div class="field">
          <label for="taxNumber">Tax number</label>
          <InputText size="small" id="taxNumber" v-model="formData.taxNumber" placeholder="DIC" />
        </div>
        <div class="field">
          <label for="vatID">Vat ID</label>
          <InputText size="small" id="vatID" v-model="formData.vatID" placeholder="IC DPH" />
        </div>
        <div class="field">
          <label for="vatPayer">Vat Payer</label>
          <ToggleSwitch size="small" id="vatPayer" v-model="formData.vatPayer" />
        </div>
        <div class="field">
          <label for="details">Details</label>
          <InputText size="small" id="details" v-model="formData.details" />
        </div>
        <div class="field">
          <label for="phone">Phone</label>
          <InputText size="small" id="phone" v-model="formData.phone" />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <InputText size="small" id="email" v-model="formData.email" />
        </div>
        <div class="field">
          <label for="web">Web</label>
          <InputText size="small" id="web" v-model="formData.web" />
        </div>
        <div class="field">
          <label for="iban">IBAN</label>
          <InputText size="small" id="iban" v-model="formData.iban" />
        </div>
        <div class="field">
          <label for="bank">Bank</label>
          <InputText size="small" id="bank" v-model="formData.bank" />
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
