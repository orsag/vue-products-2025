<script setup lang="ts">
import { DETAILS } from '@/router/routes'
import type { PaymentDetails } from '@/types'
import { Card, InputText, DatePicker } from 'primevue'

const formData = defineModel<PaymentDetails>('formData', { default: { ...DETAILS } })
</script>

<template>
  <Card>
    <template #title>Payment details</template>
    <template #content>
      <div class="verticalForm">
        <div class="field">
          <label for="language">Language</label>
          <InputText size="small" id="language" v-model="formData.language" />
        </div>
        <div class="field">
          <label for="noteAboveItems">Note Above Items</label>
          <InputText size="small" id="noteAboveItems" v-model="formData.noteAboveItems" />
        </div>
        <div class="field">
          <label for="noteBelowItems">Note Below Items</label>
          <InputText size="small" id="noteBelowItems" v-model="formData.noteBelowItems" />
        </div>
        <div class="field">
          <label for="issuedBy">Issued by</label>
          <InputText size="small" id="issuedBy" v-model="formData.issuedBy" />
        </div>
        <div class="field">
          <label for="internalNote">Internal note</label>
          <InputText size="small" id="internalNote" v-model="formData.internalNote" />
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
