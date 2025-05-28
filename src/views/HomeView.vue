<template>
  <BreadcrumbCustom :home="home" :items="items" class="mb-2" />
  <div class="grid grid-cols-4 gap3 items-center">
    <div>
      <p class="text-2xl font-semibold">
        Data Mapping
      </p>
    </div>
    <div class="col-span-3">
      <div class="flex justify-end gap-2">
        <Button label="Filter" icon="pi pi-filter" class="bg-white text-gray-800 border-zinc-300" size="small" />
        <Button label="Export" icon="pi pi-upload" class="bg-white text-gray-800 border-zinc-300" size="small" />
        <Button label="Import" icon="pi pi-download" class="bg-white text-gray-800 border-zinc-300" size="small" />
        <Button label="New Data" icon="pi pi-plus" size="small" @click="visibleDrawer = true" />
      </div>
    </div>
  </div>
  <div class="mt-3">
    <Tabs value="0">
      <TabList style="--p-tabs-tablist-background: transparent" dark:style="--p-tabs-tablist-background: transparent">
        <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">
          <i :class="tab.icon" class="mr-2" />
          {{ tab.title }}
        </Tab>
      </TabList>
      <TabPanels class="px-0" style="--p-tabs-tabpanel-background: transparent" dark:style="--p-tabs-tabpanel-background: transparent">
        <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
          <component :is="tab.component" :id="tab.value"/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>

  <DrawerSlot v-model:visible="visibleDrawer" :show-close-icon="false" position="right" class="!w-full md:!w-80 lg:!w-[30rem]">
    <template #header>
      <DrawerHeaderData @cancel="() => visibleDrawer = false" @save="() => visibleDrawer = false" />
    </template>
    <DrawerFormData class="mt-4"/>
  </DrawerSlot>
</template>

<script setup>
import DataMapping from '@/components/DataMapping.vue'
import Test from '@/components/Test.vue'

const visibleDrawer = ref(false)
const home = ref({
  icon: 'pi pi-home',
  route: '/',
})
const items = ref([
  { label: 'Current Page' },
])

const tabs = ref([
  { title: 'Data Mapping', value: '0', component: markRaw(DataMapping), icon: 'pi pi-sitemap' },
  { title: 'Collection Sources', value: '1', component: markRaw(Test), icon: 'pi pi-folder-open' },
])
</script>
