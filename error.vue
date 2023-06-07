<script lang="ts" setup>

interface Props {
  error: Object
}

const props = defineProps<Props>()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>{{ props.error }}</div>
  <button @click="handleError">
    Clear errors
  </button>
</template>
