<script lang="ts" setup>
import type { ILoginForm } from '~/store/user-profile'
import { useUserProfile } from '~/store/user-profile'
import { useTimeStore } from '~/store/time-store'

const userProfile = useUserProfile()
const timeStore = useTimeStore()

const onSubmit = (values: ILoginForm) => userProfile.login(values)
const handleUnconfirmed = (username_player: string) => useNotConfirmedUser(username_player)

</script>

<template>
  <div>
    <Form
      v-slot="{ values, isSubmitting }"
      @submit="onSubmit"
      @invalid-submit="handleInvalidSubmit"
    >
      <div class="md:w-1/2 lg:w-1/3 mx-auto text-center">
        <div class="px-15 flex flex-col gap-5">
          <BaseInputField
            label="Email"
            name="username_player"
            rules="required|email|temporaryEmail|plusIssueEmail|max:56"
            type="email"
          />
          <BaseInputField
            label="Password"
            name="password_player"
            rules="required|passwordCheck|min:8|max:56"
            type="password"
          />
        </div>
        <div v-if="userProfile.userNotConfirmed" class="mt-6 mb-3">
          <h5 class="text-center">
            <button
              class="flex items-center justify-center content-center gap-2 mx-auto mt-3"
              @click="handleUnconfirmed(values.username_player)"
            >
              <b class="text-h4 underline">Account non confermato!</b>
              <BaseMsIcon icon="info" variant="empty" />
            </button>
          </h5>
        </div>
        <BaseButton :disabled="isSubmitting" class="mt-15" label="accedi" type="submit" />
        <NuxtLink class="block text-h4 underline mt-6" to="/password-dimenticata">
          <b> Hai dimenticato la password? </b>
        </NuxtLink>
        <div
          v-if="!timeStore.ifEnd"
          class="mb-3 mt-4 text-center"
        >
          <div class="text-h4 uppercase font-bold">
            nuovo utente?
            <NuxtLink class="underline capitalize font-inherit mt-3" to="/registration">
              Registrati
            </NuxtLink>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>
