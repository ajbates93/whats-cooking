<template>
  <form class="flex justify-center items-center text-gray-600" @submit.prevent="handleLogin">
    <div class="max-w-screen-lg">
      <h1 class="text-primary mb-5">Log In</h1>
      <div class="flex flex-col gap-3">
        <p>Sign in via magic link with your email below</p>
        <div>
          <input 
            v-model="email" 
            class="py-1 px-2 border rounded"
            type="email" 
            placeholder="Your email" />
        </div>
        <div>
          <input 
            type="submit" 
            class="py-1 px-2 border rounded"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading">
        </div>
      </div>
    </div> 
  </form>
</template>

<script lang="ts" setup>
const { signIn, loading } = useAuth()

const email = ref('')
const handleLogin = async () => signIn(email.value)
</script>

<style>

</style>

