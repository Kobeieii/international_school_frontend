<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

const passwordComponent = ref()
const initialValues = ref({
  email: '',
  password: '',
})
const resolver = ref(zodResolver(
  z.object({
    email: z.string()
      .email({ message: 'Invalid email address.' })
      .min(1, { message: 'Email is required.' }),
    password: z.string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
  }),
))
function focusPassword() {
  nextTick(() => {
    const input = passwordComponent.value?.$el?.querySelector('input')
    input?.focus()
  })
}
</script>

<template>
  <div class="h-svh flex justify-center items-center">
    <Card class="min-w-sm md:min-w-md p-2">
      <template #header>
        <div class="pl-[20px] pt-[20px]">
          <img alt="user header" src="../assets/logo.svg">
        </div>
      </template>
      <template #title>
        <p class="text-2xl mb-5">
          Sign in
        </p>
      </template>
      <template #content>
        <Form v-slot="$form" :initial-values="initialValues" :resolver="resolver" class="flex flex-col gap-6 w-full" @submit="onFormSubmit">
          <div class="flex flex-col gap-1">
            <label for="email">Email</label>
            <InputText id="email" name="email" type="text" fluid />
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
              {{ $form.email.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="password" @click="focusPassword">Password</label>
            <Password ref="passwordComponent" name="password" :feedback="false" toggle-mask fluid />
            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
              {{ $form.password.error?.message }}
            </Message>
          </div>
          <Button type="submit" severity="primary" label="Submit" />
        </Form>
      </template>
    </Card>
  </div>
</template>
