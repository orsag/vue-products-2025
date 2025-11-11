<script setup lang="ts">
import { DETAILS } from '@/router/routes'
import type { PaymentDetails } from '@/types'
import { Card, InputText, DatePicker } from 'primevue'

const formData = defineModel<PaymentDetails>('formData', { default: { ...DETAILS } })
</script>

<template>
  <Card :class="$style.customCard">
    <template #title>Payment details</template>
    <template #content>
      <div class="wrapper">
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
        </div>
        <div class="verticalForm">
          <div class="field">
            <label for="issuedBy">Issued by</label>
            <InputText size="small" id="issuedBy" v-model="formData.issuedBy" />
          </div>
          <div class="field">
            <label for="internalNote">Internal note</label>
            <InputText size="small" id="internalNote" v-model="formData.internalNote" />
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
.field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.3em;
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
