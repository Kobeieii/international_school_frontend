<template>
  <div class="flex justify-between items-center w-full">
    <div>
      <p class="text-lg font-semibold">
        New Data
      </p>
    </div>
    <div class="flex gap-3">
      <Button label="Cancel" variant="text" severity="secondary" size="small" @click="emit('cancel')" />
      <Button label="Save" severity="primary" size="small" @click="emit('save')" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['cancel', 'save'])
</script>
