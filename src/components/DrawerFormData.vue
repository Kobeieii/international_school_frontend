<template>
  <Form v-slot="$form" :initial-values="initialValues" :resolver="resolver" class="flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-1">
      <label for="title">Title</label>
      <InputText id="title" name="title" type="text" fluid />
      <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
        {{ $form.title.error?.message }}
      </Message>
    </div>
    <div class="flex flex-col gap-1">
      <label for="description">Description</label>
      <Textarea id="description" name="description" autoResize rows="5" cols="30" />
      <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">
        {{ $form.description.error?.message }}
      </Message>
    </div>
    <div class="flex flex-col gap-1">
      <label for="department">Department</label>
      <Select name="department" :options="departmentOptions" optionLabel="name" placeholder="Select a Department" fluid />
      <Message v-if="$form.department?.invalid" severity="error" size="small" variant="simple">
        {{ $form.department.error?.message }}
      </Message>
    </div>
    <div class="flex flex-col gap-1">
      <label for="dataSubjectTypes">Data Subject Types</label>
      <MultiSelect name="dataSubjectTypes" display="chip" :options="dataSubjectTypeOptions" optionLabel="name" filter placeholder="Select Data Subject Types"
            :maxSelectedLabels="3" />
      <Message v-if="$form.dataSubjectTypes?.invalid" severity="error" size="small" variant="simple">
        {{ $form.dataSubjectTypes.error?.message }}
      </Message>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

const initialValues = ref({
  title: '',
  description: '',
  departments: 1,
  dataSubjectTypes: [],
})
const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  departments: z.number().min(1),
  dataSubjectTypes: z.array(z.number()).optional(),
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
</script>
