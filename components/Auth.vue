<template>
  <form class="flex justify-center items-center" @submit.prevent="handleLogin">
    <div class="max-w-screen-lg">
      <h1>Log In</h1>
      <p>Sign in via magic link with your email below</p>
      <div>
        <input 
          v-model="email" 
          type="email" 
          placeholder="Your email" 
          class="inputField" />
      </div>
      <div>
        <input 
          type="submit" 
          class=""
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading">
      </div>
    </div> 
  </form>
</template>

<script lang="ts" setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
</script>

<style>

</style>

