<script lang="ts" setup>
import type { IDragonConfig } from '~/types/types'
import { useTimeStore } from '~/store/time-store'
import 'viewerjs/dist/viewer.css'

const { WIZARD_HAS_OCR, TIME_FORMAT }: IDragonConfig = decrypt(dragonConfig)
const receipt = useReceipt()
const timeStore = useTimeStore()

const to = ref<Date>(calcToDate())
const from = ref<Date>(calcFromDate())
// NOTE: Since timeStore updates every second let's use watch instead to update the datepicker component only when receipt.value.date changes
watch(() => receipt.value.date, () => {
  // Disable all dates up to the start date validity of the receipt
  to.value = calcToDate()
  // Disable all dates from to the end date validity of the receipt
  from.value = calcFromDate()
})

const currencyOptions = {
  currency: 'EUR',
  currencyDisplay: 'hidden',
  useGrouping: false,
}

</script>

<template>
  <div class="flex gap-4 md:w-[50vw] mx-auto flex-col md:(flex-row)">
    <div class="flex-1 px-10">
      <div class="mt-2 relative w-full text-left md:(grid grid-cols-2 gap-x-10 gap-y-5)">
        <BaseInputField
          :key="receipt.number_shallow"
          :disabled="(WIZARD_HAS_OCR && receipt.number_shallow)"
          :initial-value="receipt.number_shallow"
          helper-text=""
          label="N° documento d'acquisto"
          name="number"
          placeholder="XXXXXXXXX"
          rules="required|integer|is_not:0|min:1|max:10"
        />

        <BaseDatePicker
          id="date"
          :key="receipt.date_obj.date"
          name="date"
          :disabled="(WIZARD_HAS_OCR && receipt.date_obj && !!receipt.date_obj.formatted_date)"
          :initial-value="receipt.date_obj.date && receipt.date_obj.date.toDate()"
          :lower-limit="to"
          :upper-limit="from"
          label="Data di emissione"
          starting-view="month"
        />
        <BaseDatePicker
          id="time"
          :key="receipt.time"
          name="time"
          :disabled="WIZARD_HAS_OCR && !!receipt.time && !!receipt.date_obj.raw_date"
          :initial-value="receipt.time && receipt.date_obj.raw_date && receipt.date_obj.raw_date.toDate()"
          :input-format="TIME_FORMAT"
          :placeholder="`es. ${timeStore.now.format('HH:MM')}`"
          helper-text=""
          label="Orario di emissione"
          minimum-view="time"
          starting-view="time"
        />
        <BaseInputCurrency
          id="amount"
          :key="receipt.amount"
          :disabled="WIZARD_HAS_OCR && !!receipt.amount"
          :initial-value="receipt.amount"
          :options="currencyOptions"
          label="Importo totale speso"
          name="amount"
          placeholder="125.50"
          rules="required"
        />
        <!-- TODO: implement this <div><ProductInsertVueSelect @check="productSelected" /></div>-->
      </div>
    </div>
  </div>
</template>
