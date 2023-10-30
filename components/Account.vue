<template>
  <div class="px-5">
    <h1 class="flex items-center"><span class="text-gray-600">Account</span><Icon class="text-primary ml-5" name="carbon:home"></Icon></h1>  
    <div class="my-5">
      <div class="text-xl text-gray-600">Edit profile details, add family members to your Household, link your social accounts.</div>
    </div>
    <h2 class="text-gray-600 flex items-center"><span>Your profile</span><Icon class="ml-5 text-primary" name="carbon:user"></Icon></h2>
    <form @submit.prevent="handleUpdateProfileSubmit" 
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
      <template v-if="household">
        <div class="text-xl text-gray-600 pb-5">Household name: <span class="underline ml-2">{{ household.name }}</span></div>
        <div class="text-md bg-gray-400 py-1 px-2 rounded text-white inline-flex items-center"><Icon class="mr-2" size="1.25rem" name="carbon:information"></Icon> Add, edit or remove members of your household.</div>
      </template>
      <template v-else>
        <LayoutActionButton @click="createHousehold('Bates-Lavelle')" class="bg-primary">Create Household</LayoutActionButton> 
      </template>
    </div>
  </div>

</template>

<script lang="ts" setup>

const { user, updateProfile, fetchProfile, loading } = useAuth()
const { createHousehold, fetchHouseholdForAdmin, loading: householdLoading } = useHousehold()

const username = ref('')
const avatar_path = ref('')

const { data: profile } = await fetchProfile()
const { data: household } = await fetchHouseholdForAdmin()

if (profile) {
  username.value = profile.username
  avatar_path.value = profile.avatar_url
}

const handleUpdateProfileSubmit = () => updateProfile(username.value, avatar_path.value);
</script>

<style>

</style>

