<template>
  <DrawerHeader>
    <p class="text-lg font-semibold">
      {{ headerName }}
    </p>
    <div class="flex gap-3">
      <Button label="Cancel" variant="text" severity="secondary" size="small" @click="emit('cancel')" />
      <Button label="Save" severity="primary" size="small" type="submit" form="myForm" />
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
        <Select name="department" :options="departmentOptions" option-label="name" placeholder="Select a Department" fluid />
        <Message v-if="$form.department?.invalid" severity="error" size="small" variant="simple">
          {{ $form.department.error?.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <label for="dataSubjectTypes">Data Subject Types</label>
        <MultiSelect
          name="dataSubjectTypes" :options="dataSubjectTypeOptions" option-label="name" placeholder="Select Data Subject Types"
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

defineProps(['headerName'])
const emit = defineEmits(['cancel', 'save'])
const formData = reactive({
  title: '',
  description: '',
  department: null,
  dataSubjectTypes: [],
})
const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  department: z.object({
    name: z.string(),
    code: z.number(),
  }),
  dataSubjectTypes: z.array(z.object({
    name: z.string(),
    code: z.number(),
  })).optional(),
})
const resolver = zodResolver(schema)

const departmentOptions = ref([
  { name: 'HR', code: 1 },
  { name: 'Finance', code: 2 },
  { name: 'IT', code: 3 },
])
const dataSubjectTypeOptions = ref([
  { name: 'Personal Data', code: 1 },
  { name: 'Sensitive Data', code: 2 },
  { name: 'Public Data', code: 3 },
])

function handleSave(event: any) {
  if (event.valid) {
    console.log('Form data:', event.values)
  }
  else {
    console.error('Form validation failed:', event.errors)
  }
}
</script>
