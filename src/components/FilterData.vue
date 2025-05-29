<template>
  <DrawerHeader>
    <div class="flex items-center gap-2">
      <i class="pi pi-filter text-lg" />
      <p class="text-lg font-semibold">
        Filter
      </p>
    </div>
    <div class="flex gap-3 ml-auto">
      <Button label="Reset" variant="text" severity="secondary" size="small" />
      <Button label="Apply Filter" severity="primary" size="small" />
    </div>
  </DrawerHeader>
  <DrawerBody>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-search" />
      </InputGroupAddon>
      <FloatLabel>
        <InputText id="search" />
        <label for="search">Search</label>
      </FloatLabel>
    </InputGroup>

    <div class="flex flex-col gap-8 my-6">
      <div class="flex flex-col gap-3">
        <p class="mb-2">Department</p>
        <div v-for="department in departments" :key="department" class="flex items-center gap-3">
          <RadioButton v-model="selectDepartment" :input-id="department" :value="department" />
          <label :for="department">{{ department }}</label>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <p class="mb-2">Data Subject Types</p>
        <div v-for="subject in dataSubjects" :key="subject" class="flex items-center gap-3">
          <Checkbox v-model="selectDataSubjects" :input-id="subject" :value="subject" />
          <label :for="subject">{{ subject }}</label>
        </div>
      </div>
    </div>
  </DrawerBody>
</template>

<script setup lang="ts">
const departments = ['Human Resources', 'IT/IS', 'Admission', 'Marketing']
const dataSubjects = ['Employee', 'Faculty Staff', 'Students']

const selectDepartment = ref('')
const selectDataSubjects = ref([])

</script>
