<script lang="ts" setup>
import type { ILoginFormTester } from '~/store/user-tester'
import { useUserTester } from '~/store/user-tester'

useHead({ title: 'Pagina di login Staging' })

const userTester = useUserTester()

const onSubmit = (values: ILoginFormTester) => userTester.login(values)
</script>

<template>
  <div class="mt-20 min-h-80vh">
    <h1 class="text-center" v-text="'Accedi (area Test)'" />
    <Form
      v-slot="{ isSubmitting }"
      @submit="onSubmit"
      @invalid-submit="handleInvalidSubmit"
    >
      <div class="md:w-1/2 lg:w-1/3 mx-auto text-center">
        <BaseInputField
          name="username"
          label="User"
          rules="required"
          autocomplete="username"
        />
        <BaseInputField
          name="password"
          label="Password"
          type="password"
          rules="required"
          autocomplete="current-password"
        />
        <BaseButton class="mt-8" label="entra" type="submit" :disabled="isSubmitting" />
      </div>
    </Form>
  </div>
</template>
