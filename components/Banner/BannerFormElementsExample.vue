<script lang="ts" setup>
import type { IRadioGroup } from '~/types/types'

const gender: IRadioGroup[] = [
  {
    label: 'M',
    value: 'M',
    id: 'M',
  },
  {
    label: 'F',
    value: 'F',
    id: 'F',
  },
  {
    label: 'Preferisco non rispondere',
    value: 'unset',
    id: 'unset',
  },
]
// eslint-disable-next-line no-console
const onSubmit = (values: Record<string, any>) => console.log(values)
</script>
<template>
  <div class="relative min-h-[65vh] bg-gray-lightest py-20">
    <Form
      v-slot="{ values }"
      @submit="onSubmit"
      @invalid-submit="handleInvalidSubmit"
    >
      <BaseInputRadioGroup
        id="genero"
        :values="gender"
        is-required
        label="Sono:"
        name="genero"
      />
      <BaseCheckbox
        :rules="{ required: true }"
        :value="1"
        error-msg="Indicare l'accettazione dei termini e condizioni"
        name="agreement1_player"
      >
        <template #label>
          <span>
            Dichiaro di aver letto e di accettare
            <a
              class="underline"
              href="/regolamento.pdf"
              target="_blank"
              v-text="'Termini e Condizioni'"
            />
            e di accettare tutte le indicazioni riportate sullo stesso.
          </span>
        </template>
      </BaseCheckbox>
      <BaseButton label="check console" type="submit" />
      <pre>{{ values }}</pre>
    </Form>
  </div>
</template>
