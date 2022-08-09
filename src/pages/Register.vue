<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="Name"
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'O nome é requerido']"
        />

        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'O email é requerido']"
          type="email"
        />

        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'A senha é requerida e maior que 5 números']"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn 
            label="Register"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />

          <q-btn 
            label="Back"
            color="dark"
            class="full-width"
            outline
            flat
            :to="{ name: 'login' }"
          />
        </div>
        
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, handleError, ref } from 'vue'
import useAuthUser from "src/composables/UseAuthUser"
import useNotify from "src/composables/UseNotify"
import { useRouter } from "vue-router"

export default defineComponent({
  name: 'pageRegister',

  setup () {
    const router = useRouter()
    
    const { register } = useAuthUser()

    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        notifySuccess()
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email}
        })
      } catch (error) {
        notifyError(error.message)
        //alert(error.message)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
