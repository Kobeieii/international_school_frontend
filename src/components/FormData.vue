<template>
  <DrawerHeader>
    <p class="text-lg font-semibold">
      {{ headerName }}
    </p>
    <div class="flex gap-3">
      <Button label="Cancel" variant="text" severity="secondary" size="small" @click="emit('close')" />
      <Button label="Save" severity="primary" size="small" type="submit" form="myForm" :loading="isLoading.saveForm" />
    </div>
  </DrawerHeader>
  <DrawerBody>
    <Form
      id="myForm"
      v-slot="$form"
      :initial-values="formData"
      :resolver="resolver"
      class="flex flex-col gap-6"
      @submit="handleSave"
    >
      <InputText id="id" name="id" type="hidden" />
      <div class="flex flex-col gap-1">
        <label for="title">Title</label>
        <InputText id="title" name="title" type="text" fluid />
        <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
          {{ $form.title.error?.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <label for="description">Description</label>
        <Textarea id="description" name="description" auto-resize rows="5" cols="30" />
        <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">
          {{ $form.description.error?.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <label for="department">Department</label>
        <Select name="department" :options="departments" option-label="name" placeholder="Select a Department" fluid />
        <Message v-if="$form.department?.invalid" severity="error" size="small" variant="simple">
          {{ $form.department.error?.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <label for="dataSubjectTypes">Data Subject Types</label>
        <MultiSelect
          name="dataSubjectTypes" :options="dataSubjectTypes" option-label="name" placeholder="Select Data Subject Types"
          :max-selected-labels="3"
        />
        <Message v-if="$form.dataSubjectTypes?.invalid" severity="error" size="small" variant="simple">
          {{ $form.dataSubjectTypes.error?.message }}
        </Message>
      </div>
    </Form>
  </DrawerBody>
</template>

<script setup lang="ts">
import Form from '@primevue/forms/form'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useDataMappingStore } from '@/stores/dataMapping'

defineProps(['headerName'])
const emit = defineEmits(['close'])
const dataMappingStore = useDataMappingStore()
const { dataSubjectTypes, departments, formData, isLoading } = storeToRefs(dataMappingStore)

const schema = z.object({
  id: z.number().optional().nullable(),
  title: z.string().min(1),
  description: z.string().optional(),
  department: z.object({
    id: z.number(),
    name: z.string(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    deleted_at: z.string().nullable().optional(),
  }),
  dataSubjectTypes: z.array(z.object({
    id: z.number(),
    name: z.string(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    deleted_at: z.string().nullable().optional(),
  })).optional(),
})
const resolver = zodResolver(schema)

async function handleSave(event: any) {
  if (event.valid) {
    await dataMappingStore.saveFormData(event.values)
    await dataMappingStore.getTitles()
    emit('close')
  }
  else {
    console.error('Form validation failed:', event.errors)
  }
}
</script>
