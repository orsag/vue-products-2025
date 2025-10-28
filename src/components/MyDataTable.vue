<script setup lang="ts">
import DataTable from 'primevue/datatable'
import { Column, ToggleSwitch, InputText } from 'primevue'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

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
</style>
