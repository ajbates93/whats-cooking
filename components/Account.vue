<template>
  <div class="px-5">
    <h1 class="flex items-center"><span class="text-gray-600">Account</span><Icon class="text-primary ml-5" name="carbon:home"></Icon></h1>  
    <div class="my-5">
      <div class="text-xl text-gray-600">Edit profile details, add family members to your Household, link your social accounts.</div>
    </div>
    <h2 class="text-gray-600 flex items-center"><span>Your profile</span><Icon class="ml-5 text-primary" name="carbon:user"></Icon></h2>
    <form @submit.prevent="updateProfile" 
      class="dark:bg-[#333] flex flex-col gap-3 py-5 dark:text-white text-gray-600">
      <div>
        <label class="w-[100px] inline-block pr-5 font-bold" for="email">Email</label>
        <input id="email" type="text" :value="user.email" class="py-1 px-2 border rounded" disabled />
      </div>
      <div>
        <label class="w-[100px] inline-block pr-5 font-bold" for="username">Username</label>
        <input id="username" type="text" v-model="username" class="py-1 px-2 border rounded" />
      </div>
      <div>
        <LayoutActionButton class="inline-block bg-primary">
          <input
            type="submit"
            :value="loading ? 'Loading ...' : 'Update'"
            :disabled="loading" />
        </LayoutActionButton> 
      </div>
    </form>
    <h2 class="text-gray-600 flex items-center"><span>Your Household</span><Icon class="ml-5 text-primary" name="carbon:home"></Icon></h2>
    <div class="my-5">
      <div class="text-xl text-gray-600">Add, edit or remove members of your household.</div>
      
    </div>
  </div>

</template>

<script lang="ts" setup>

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(true)
const username = ref('')
const avatar_path = ref('')

loading.value = true

const { data } = await supabase
  .from('profiles')
  .select(`username, avatar_url`)
  .eq('id', user.value?.id)
  .single();

if (data) {
  username.value = data.username
  avatar_path.value = data.avatar_url
}

loading.value = false

const updateProfile = async () => {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: username.value,
      avatar_url: avatar_path.value,
      updated_at: new Date()
    }

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal'
    })
    if (error) throw error
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}

const signOut = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
</script>

<style>

</style>

