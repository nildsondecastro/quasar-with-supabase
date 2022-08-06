<template>
  <q-page padding>
    <p class="texte-h6">
      <q-form class="row justify-center" @submit.prevent="handleLogin">
        <p class="col-12 text-h5 text-center">Login</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

          <q-input
            label="Email"
            v-model="form.email"
          />

          <q-input
            label="Password"
            v-model="form.password"
          />

          <div class="full-width q-pt-md">
            <q-btn 
              label="Login"
              color="primary"
              class="full-width"
              outline
              rounded
              type="submit"
            />
          </div>

          <div class="full-width q-gutter-y-sm">
            <q-btn 
              label="Register"
              color="primary"
              class="full-width"
              flat
              to="/register"
              size="sm"
            />

            <q-btn 
              label="Forgot Password"
              color="primary"
              class="full-width"
              flat
              :to="{ name: 'forgot-password'}"
              size="sm"
            />
          </div>
          
        </div>
      </q-form>
    </p>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'pageLogin',

  setup () {
    const router = useRouter()

    const { login } = useAuthUser()

    const form = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        router.push({ name: 'me'})
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
