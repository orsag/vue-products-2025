<script setup lang="ts">
import { DETAILS } from '@/router/routes'
import type { PaymentDetails } from '@/types'
import { Button, Card, InputText, DatePicker } from 'primevue'
import { ref } from 'vue'

const isExpanded = ref(true)
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
const formData = defineModel<PaymentDetails>('formData', { default: { ...DETAILS } })
</script>

<template>
  <Card :class="$style.customCard">
    <template #title>
      <div class="card-title">
        <span>Payment details</span>
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
.content-wrapper {
  display: flex;
  justify-content: space-between;
}
.verticalForm {
  width: 440px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
