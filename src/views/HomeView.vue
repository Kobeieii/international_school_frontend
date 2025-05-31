<template>
  <BreadcrumbCustom :home="home" :items="items" class="mb-3" />
  <div class="grid grid-cols-4 gap3 items-center">
    <div class="col-span-4 lg:col-span-1">
      <p class="text-2xl font-semibold">
        Data Mapping
      </p>
    </div>
    <div class="col-span-4 lg:col-span-3 mt-3 lg:mt-0">
      <div class="flex lg:justify-end gap-2">
        <Button label="Filter" icon="pi pi-filter" class="bg-white text-gray-800 border-zinc-300" size="small" @click="handleFilter" />
        <Button label="Export" icon="pi pi-upload" class="bg-white text-gray-800 border-zinc-300" size="small" />
        <Button label="Import" icon="pi pi-download" class="bg-white text-gray-800 border-zinc-300" size="small" />
        <Button label="New Data" icon="pi pi-plus" size="small" @click="handleAddData" />
      </div>
    </div>
  </div>
  <div class="mt-3">
    <Tabs :value="initTab">
      <TabList style="--p-tabs-tablist-background: transparent" dark:style="--p-tabs-tablist-background: transparent">
        <Tab value="data-mapping">
          <i class="pi pi-sitemap mr-2" />
          <span>Data Mapping</span>
        </Tab>
        <Tab value="collection-sources">
          <i class="pi pi-folder-open mr-2" />
          <span>Collection Sources</span>
        </Tab>
      </TabList>
      <TabPanels class="px-0" style="--p-tabs-tabpanel-background: transparent" dark:style="--p-tabs-tabpanel-background: transparent">
        <TabPanel value="data-mapping">
          <DataMapping @action="handleAction" />
        </TabPanel>
        <TabPanel value="collection-sources">
          <Test id="collection-sources" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>

  <Drawer v-model:visible="visibleDrawer" :show-close-icon="false" :position="sidebarPosition" class="!h-[42rem] md:!h-full !w-full md:!w-80 lg:!w-[28rem]">
    <template #container="{ closeCallback }">
      <FormData
        v-if="['New Data', 'Edit Data'].includes(drawerHeader)"
        :header-name="drawerHeader"
        @cancel="closeCallback"
        @save="closeCallback"
      />
      <FilterData v-else-if="drawerHeader === 'Filter Data'" />
    </template>
  </Drawer>
  <DataMappingDeleteDialog v-model:visible="visibleDialog" />
</template>

<script setup>
import { useDataMappingStore } from '@/stores/dataMapping'

const dataMappingStore = useDataMappingStore()
const initTab = ref('data-mapping')
const visibleDrawer = ref(false)
const visibleDialog = ref(false)
const drawerHeader = ref('')
const home = ref({
  icon: 'pi pi-home',
  route: '/',
})
const items = ref([
  { label: 'Current Page' },
])

function handleAction(params) {
  if (params.action === 'edit') {
    drawerHeader.value = 'Edit Data'
    visibleDrawer.value = true
  }
  else if (params.action === 'delete') {
    visibleDialog.value = true
  }
}
function handleAddData() {
  drawerHeader.value = 'New Data'
  visibleDrawer.value = true
}
function handleFilter() {
  drawerHeader.value = 'Filter Data'
  visibleDrawer.value = true
}

const width = ref(window.innerWidth)
function updateWidth() {
  width.value = window.innerWidth
}
onMounted(() => {
  window.addEventListener('resize', updateWidth)
  dataMappingStore.getTitles()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})
const sidebarPosition = computed(() => (width.value < 768 ? 'bottom' : 'right'))
</script>
