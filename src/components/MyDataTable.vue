<script setup lang="ts">
import DataTable from 'primevue/datatable'
import { Column, ToggleSwitch, InputText, Button } from 'primevue'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import type { Product } from '@/types.ts'

defineProps<{
  deleteProduct: (data: Product) => void
  editProduct: (data: Product) => void
}>()

const mainStore = useMainStore()
const { selectedCategory, products, filters } = storeToRefs(mainStore)
const { updateFilters } = mainStore

const isFiltering = ref(false)

watch(
  selectedCategory,
  () => {
    updateFilters()
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <DataTable
    :value="products"
    v-model:filters="filters"
    showGridlines
    sortMode="multiple"
    removableSort
    tableStyle="min-width: 60rem"
    :filterDisplay="isFiltering ? 'row' : undefined"
  >
    <Column field="name" header="Name" sortable>
      <template #body="{ data }">
        {{ data.name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          size="small"
          @input="filterCallback()"
          placeholder="Search by name"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column field="price" header="Price" sortable>
      <template #body="{ data }">
        {{ data.price }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          size="small"
          @input="filterCallback()"
          placeholder="Search by price"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column field="stock" header="Stock" sortable>
      <template #body="{ data }">
        {{ data.stock }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          size="small"
          @input="filterCallback()"
          placeholder="Search by stock"
          class="p-column-filter"
        />
      </template>
    </Column>
    <template v-if="selectedCategory && selectedCategory.schema.length > 0">
      <Column
        v-for="attrib in selectedCategory.schema"
        :field="`attributes.${attrib.key}`"
        :header="attrib.label"
        :key="attrib.key"
        sortable
      >
        <template #body="{ data }">
          {{ data.attributes[attrib.key] }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            size="small"
            @input="filterCallback()"
            placeholder="Search"
            class="p-column-filter"
          />
        </template>
      </Column>
    </template>
    <Column style="width: auto">
      <template #body="slotProps">
        <div class="buttons">
          <Button
            type="button"
            size="small"
            icon="pi pi-pencil"
            rounded
            severity="success"
            @click="editProduct(slotProps.data)"
          />
          <Button
            type="button"
            size="small"
            icon="pi pi-trash"
            rounded
            severity="danger"
            @click="deleteProduct(slotProps.data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <div class="field">
    <label>Show filters:</label>
    <ToggleSwitch name="filtering" v-model="isFiltering" />
  </div>
</template>

<style lang="css" scoped>
.field {
  display: flex;
  align-items: center;
  margin-top: 1em;
}
.field label {
  margin-right: 1em;
}
.buttons {
  display: flex;
  align-items: center;
  gap: 1em;
}
</style>
