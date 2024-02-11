<template>
  <div>
    <Account v-if="user" />
    <Auth v-else />
  </div>
</template>

<script lang="ts" setup>
// const user = useSupabaseUser()
const user = true
</script>

<style>

</style>
