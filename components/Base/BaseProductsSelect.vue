<script lang="ts" setup>

interface Props {
  items: array,
  label: string,
}
const props = defineProps<Props>()
const emit = defineEmits<{(e: 'handleProducts', data: any): void}>()

const inputs = ref([
  {
    id: 1,
    open: false,
    name_product: '',
    quantity_product: 1,
  },
])

const products = () => {
  return inputs.value.map((item) => {
    return {
      name_product: item.name_product,
      quantity_product: Number(item.quantity_product),
    }
  })
}

const listOpen = computed(() => {
  return inputs.value.some(item => item.open)
})

const openListItems = (input) => {
  const isListOpen = inputs.value.some(item => item.open)
  if (isListOpen) {
    inputs.value.forEach(item => (item.open = false))
  } else {
    input.open = !input.open
  }
}

const closeList = (e) => {
  if (e.target === e.currentTarget) {
    inputs.value.forEach(item => (item.open = false))
  }
}

const checkProduct = (inputName, e) => {
  const selectedProduct = e.target.textContent.trim()
  inputName.name_product = selectedProduct
  inputName.open = false
  emit('handleProducts', products())
}

const addInput = () => {
  const newProduct = {
    id: inputs.value[inputs.value.length - 1].id + 1,
    open: false,
    name_product: '',
    quantity_product: 1,
  }
  inputs.value = [...inputs.value, newProduct]
}

const deleteInput = (id) => {
  const filteredArray = inputs.value.filter(item => item.id !== id)
  inputs.value = filteredArray
  emit('handleProducts', products())
}

</script>

<template>
  <div class="pt-2.5vh px-10">
    <div v-if="listOpen" class="absolute top-0 left-0 right-0 bottom-0" @click="closeList" />
    <div v-for="(input, idx) of inputs" :key="idx" class="relative flex gap-5 flex-col justify-between mb-7vh md:(flex-row mb-2vh items-end)">
      <div class="w-[90%] basis-[60%] flex flex-col justify-between md:w-full">
        <label v-if="idx === 0" class="text-body text-sm font-bold text-left">
          {{ props.label }}
        </label>
        <div class="relative">
          <div
            name="name_product"
            class="border border-body min-h-40px md:min-h-50px max-h-40px md:max-h-50px bg-white rounded-10px flex items-center p-2 font-sans text-1vw md:text-3.5vw"
            :class="[input.name_product ? 'justify-start' : 'justify-end']"
            @click.prevent="openListItems(input)"
          >
            <p :title="input.name_product" class="truncate  text-3.5vw md:text-1vw">
              {{ input.name_product }}
            </p>
            <span v-if="!input.name_product" class="font-icon text-5vw transition duration-500 md:text-2vw" :class="{'transform rotate-180': input.open}">expand_more</span>
          </div>
          <ul
            v-if="props.items && input.open"
            class="absolute z-89 top-[100%] left-0 bg-[#fff] w-full px-0.5vw py-0.5vw max-h-90vw overflow-y-scroll md:(max-h-15vw overflow-y-scroll)"
          >
            <li
              v-for="(item, indx) of props.items"
              :key="indx"
              :value="item"
              class="w-full cursor-pointer text-left font-sans text-3.5vw bg-yellow py-0.1vw leading-none  md:(text-0.9vw leading-tight) hover:(bg-[#002d70] text-[#fff])"
              @click="checkProduct(input, $event)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div class="relative w-[90%] basis-[30%] flex flex-col justify-between md:w-full">
        <label v-if="idx === 0" class="text-body text-sm font-bold text-left">Qt.*</label>
        <input
          v-model="input.quantity_product"
          type="number"
          name="quantity_product"
          :disabled="!input.name_product"
          class="
            border border-body
            min-h-40px md:min-h-50px max-h-40px
            md:max-h-50px bg-[#fff] p-2vw w-full rounded-10px font-sans text-3.5vw
            disabled:(bg-[#fff] text-[#d2d2d2]) focus:(outline-none) md:(text-1vw p-0.5vw)
          "
          @blur="$emit('handleProducts', products())"
        >
        <span
          v-if="idx !== 0"
          class="
            absolute h-5vw w-5vw bg-[#000] text-[#fff] font-sans cursor-pointer
            flex items-center justify-center transition transform rounded-[50%]
            text-3.5vw top-[50%] translate-y-[-50%] left-[105%] md:(text-1vw w-1.4vw h-1.4vw
            left-[102%] top-[50%]) hover:scale-115
          "
          @click="deleteInput(input.id)"
        >
          x
        </span>
      </div>
    </div>
    <p
      class="
        font-sansBold block w-fit  mt-5 border-2px border-solid
        mx-auto px-5 py-2 md:(text-1rem ml-auto mr-0) cursor-pointer
        rounded-5xl bg-primary border-white text-white
      "
      @click="addInput"
    >
      + AGGIUNGI PRODOTTO
    </p>
  </div>
</template>
