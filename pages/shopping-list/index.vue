<script setup lang="ts">
import { useStore } from '@/store'
import { useClipboard, usePermission } from '@vueuse/core'

const source = ref('')
const { copy, copied, isSupported } = useClipboard({source})
const store = useStore()

const handleCopyToClipboardClick = () => {
  source.value = store.shoppingList.join(",").replaceAll(",", "\n")
  copy(source.value)
}

</script>
<template>
  <div class="px-10">
    <div class="flex justify-between items-center mb-6">
      <div class="text-3xl font-bold text-primary dark:text-primary-dark">Shopping List</div>
      <LayoutActionButton @click="handleCopyToClipboardClick" v-if="isSupported" 
        class="flex items-center !bg-blue-500 hover:!bg-blue-600">
        <span v-if="!copied" class="mr-3">Copy to Clipboard</span>
        <span v-else class="mr-3">Copied!</span>
        <Icon name="carbon:copy"></Icon>
      </LayoutActionButton>
    </div>
    <div>
      <div v-for="item, idx in store.shoppingList"
        class="py-2 px-2 border border-b-none dark:bg-[#333] dark:text-gray-300 dark:border-[#666]">{{ item }}</div>
    </div>
  </div>
</template>
