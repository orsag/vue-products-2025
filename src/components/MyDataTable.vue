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
const isActionsVisible = ref(true)
const isSmallSize = ref(false)

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
    :size="isSmallSize ? 'small' : 'default'"
  >
    <Column field="name" header="Name" sortable>
      <template #body="{ data }">
        <span :style="{ fontWeight: 'bold' }">{{ data.name }}</span>
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
    <Column style="width: auto" :hidden="!isActionsVisible">
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
    <template #footer>
      <div class="footer">
        <div class="field">
          <label>Filters:</label>
          <ToggleSwitch name="filtering" v-model="isFiltering" />
          <label>Actions:</label>
          <ToggleSwitch name="actions" v-model="isActionsVisible" />
          <label>Compact:</label>
          <ToggleSwitch name="compact" v-model="isSmallSize" />
        </div>
        <span>Total {{ products ? products.length : 0 }} products.</span>
      </div>
       </template>
  </DataTable>

</template>

<style lang="css" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.field {
  display: flex;
  align-items: center;
}
.field label {
  margin-right: 1em;
}
.field label:not(:first-child) {
  margin-left: 1em;
}
.buttons {
  display: flex;
  align-items: center;
  gap: 1em;
}
</style>
