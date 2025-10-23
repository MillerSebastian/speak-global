<template>
  <div class="glass-card border-b border-white/10">
    <div class="max-w-7xl mx-auto flex">
      <button
        @click="$emit('changeTab', 'global')"
        :class="[
          'flex-1 py-4 px-6 flex items-center justify-center gap-2 font-semibold transition-all',
          activeTab === 'global'
            ? 'text-white border-b-2 border-blue-400'
            : 'text-white/60 hover:text-white/80'
        ]"
      >
        <Globe class="w-5 h-5" />
        <span>Global Chat</span>
      </button>

      <button
        @click="$emit('changeTab', 'my-messages')"
        :class="[
          'flex-1 py-4 px-6 flex items-center justify-center gap-2 font-semibold transition-all',
          activeTab === 'my-messages'
            ? 'text-white border-b-2 border-blue-400'
            : 'text-white/60 hover:text-white/80'
        ]"
      >
        <User class="w-5 h-5" />
        <span>My Messages</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Globe, User } from 'lucide-vue-next';

defineProps<{
  activeTab: 'global' | 'my-messages';
}>();

defineEmits<{
  changeTab: [tab: 'global' | 'my-messages'];
}>();
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}
</style>
