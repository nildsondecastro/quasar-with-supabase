<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Form Product
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input 
          label="Name"
          v-model="form.name"
          :rules="[val => (val && val.length > 0) || 'O nome é obrigatório']"
        />

        <q-editor 
          v-model="form.description" 
          min-height="5rem" 
        />

        <q-input 
          label="Amount"
          v-model="form.amount"
          :rules="[val => !!val || 'Amount é obrigatório']"
          type="number"
        />

        <q-input 
          label="Price"
          v-model="form.price"
          :rules="[val => !!val || 'O Price é obrigatório']"
          prefix="R$"
        />

        <q-select 
          v-model="form.category_id"
          :options="optionsCategory"
          label="Category"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :rules="[val => !!val || 'A categoria é obrigatória']"
        />

        <q-btn 
          :label="isUpdate ? 'Atualizar' : 'Save'"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />

        <q-btn 
          label="Cancel"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'product' }"
        />

      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageFormProduct',
  setup() {

    const table = 'product'//lembrar que cadastrei no supabase como product
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let product = {}
    const optionsCategory = ref([])
    const form = ref({
      name: '',
      description: '',
      amount: 0,
      price: 0,
      category_id: ''
    })

    onMounted(() => {
      handleListCategories()
      if (isUpdate.value) {
        handleGetProduct(isUpdate.value)
      }
    })

    const handleListCategories = async () => {
      optionsCategory.value = await list('Category')
    }

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Produto Atualizado')
        } else {
          await post(table, form.value)
          notifySuccess('Produto Cadastrado')
        }
        router.push({ name: 'product'})
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetProduct = async (id) =>{
      try {
        product = await getById(table, id)
        form.value = product
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handleSubmit,
      form,
      isUpdate,
      optionsCategory
    }
  },
})
</script>
